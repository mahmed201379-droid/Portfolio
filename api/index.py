from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI, APIStatusError, APITimeoutError, RateLimitError
import json
import os
import requests
import time
from pypdf import PdfReader
from typing import List

# --- User's provided code starts here ---

load_dotenv(override=True)

def push(text):
    try:
        resp = requests.post(
            "https://api.pushover.net/1/messages.json",
            data={
                "token": os.getenv("PUSHOVER_TOKEN"),
                "user": os.getenv("PUSHOVER_USER"),
                "message": text,
            },
            timeout=10,
        )
        resp.raise_for_status()
        return True
    except Exception as e:
        print(f"Pushover notification failed: {e}")
        return False


def record_user_details(email, name="Name not provided", notes="not provided"):
    ok = push(f"Recording {name} with email {email} and notes {notes}")
    return {"recorded": "ok" if ok else "failed"}

def record_unknown_question(question):
    ok = push(f"Recording {question}")
    return {"recorded": "ok" if ok else "failed"}

record_user_details_json = {
    "name": "record_user_details",
    "description": "Use this tool to record that a user is interested in being in touch and provided an email address",
    "parameters": {
        "type": "object",
        "properties": {
            "email": { "type": "string", "description": "The email address of this user" },
            "name": { "type": "string", "description": "The user's name, if they provided it" },
            "notes": { "type": "string", "description": "Any additional information about the conversation that's worth recording to give context" }
        },
        "required": ["email"],
        "additionalProperties": False
    }
}

record_unknown_question_json = {
    "name": "record_unknown_question",
    "description": "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
    "parameters": {
        "type": "object",
        "properties": {
            "question": { "type": "string", "description": "The question that couldn't be answered" },
        },
        "required": ["question"],
        "additionalProperties": False
    }
}

tools = [{"type": "function", "function": record_user_details_json},
        {"type": "function", "function": record_unknown_question_json}]


MAX_HISTORY_TURNS = 20

class Me:
    def __init__(self):
        self.openai = OpenAI()
        self.name = "Md Sayem Ahamed"
        self.model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")

        # Construct absolute paths to data files relative to this script's location
        script_dir = os.path.dirname(os.path.abspath(__file__))
        pdf_path = os.path.join(script_dir, "data", "Profile.pdf")
        summary_path = os.path.join(script_dir, "data", "summary.txt")

        try:
            reader = PdfReader(pdf_path)
            self.linkedin = ""
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    self.linkedin += text
            with open(summary_path, "r", encoding="utf-8") as f:
                self.summary = f.read()
        except FileNotFoundError as e:
            print(f"Error: {e}. Make sure 'data/Profile.pdf' and 'data/summary.txt' exist.")
            self.linkedin = "LinkedIn profile data not found."
            self.summary = "Summary data not found."

    def handle_tool_call(self, tool_calls):
        results = []
        for tool_call in tool_calls:
            tool_name = tool_call.function.name
            arguments = json.loads(tool_call.function.arguments)
            print(f"Tool called: {tool_name}", flush=True)
            tool = globals().get(tool_name)
            result = tool(**arguments) if tool else {}
            results.append({"role": "tool","content": json.dumps(result),"tool_call_id": tool_call.id})
        return results
    
    def system_prompt(self):
        system_prompt = f"Your name is ByteBuddy, {self.name}'s personal AI assistant. You are answering questions on {self.name}'s website, particularly questions related to {self.name}'s career, background, skills and experience. Your responsibility is to represent {self.name} for interactions on the website as faithfully as possible. You are given a summary of {self.name}'s background and LinkedIn profile which you can use to answer questions. Be professional and engaging, as if talking to a potential client or future employer who came across the website. If you don't know the answer to any question, use your record_unknown_question tool to record the question that you couldn't answer, even if it's about something trivial or unrelated to career. If the user is engaging in discussion, try to steer them towards getting in touch via email; ask for their email and record it using your record_user_details tool. Use Markdown for formatting, such as lists, bold text, and code snippets, to make your responses clear and readable. "
        system_prompt += f"\n\n## Summary:\n{self.summary}\n\n## LinkedIn Profile:\n{self.linkedin}\n\n"
        system_prompt += f"With this context, please chat with the user, always staying in character as ByteBuddy, {self.name}'s personal AI assistant and format answers with Markdown (headings, lists, code) where helpful."
        return system_prompt
    
    def chat(self, message, history):
        # Prune history to last MAX_HISTORY_TURNS turns (assistant+user pairs)
        pruned = history[-(MAX_HISTORY_TURNS * 2):] if len(history) > MAX_HISTORY_TURNS * 2 else history
        messages = [{"role": "system", "content": self.system_prompt()}] + pruned + [{"role": "user", "content": message}]
        done = False
        while not done:
            response = self.openai.chat.completions.create(model=self.model, messages=messages, tools=tools)
            if response.choices[0].finish_reason=="tool_calls":
                msg = response.choices[0].message
                tool_calls = msg.tool_calls
                results = self.handle_tool_call(tool_calls)
                messages.append(msg)
                messages.extend(results)
            else:
                done = True
        return response.choices[0].message.content

# --- Rate Limiter ---
class RateLimiter:
    def __init__(self, requests_per_minute=10):
        self.requests_per_minute = requests_per_minute
        self.clients = {}

    def check(self, client_ip: str) -> bool:
        now = time.time()
        window = 60
        if client_ip not in self.clients:
            self.clients[client_ip] = []
        self.clients[client_ip] = [t for t in self.clients[client_ip] if now - t < window]
        if len(self.clients[client_ip]) >= self.requests_per_minute:
            return False
        self.clients[client_ip].append(now)
        return True

rate_limiter = RateLimiter()

# --- FastAPI Server Setup ---
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://portfolio-xdk9.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request body validation
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []

try:
    me_assistant = Me()
except Exception as e:
    print(f"Failed to initialize the 'Me' assistant: {e}")
    me_assistant = None

@app.get("/")
def root():
    return {"status": "ok"}


@app.post("/chat")
async def chat_endpoint(chat_request: ChatRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    if not rate_limiter.check(client_ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please wait before sending another message.")
    if not me_assistant:
        raise HTTPException(status_code=503, detail="Chat service is not available. Please try again later.")

    history_dicts = [message.model_dump() for message in chat_request.history]

    try:
        bot_response = me_assistant.chat(chat_request.message, history_dicts)
        return {"response": bot_response}
    except RateLimitError:
        print("OpenAI rate limit hit", flush=True)
        raise HTTPException(status_code=503, detail="AI service is temporarily overloaded. Please try again shortly.")
    except APITimeoutError:
        print("OpenAI request timed out", flush=True)
        raise HTTPException(status_code=504, detail="AI service timed out. Please try again.")
    except APIStatusError as e:
        print(f"OpenAI API error: {e}", flush=True)
        status_code = 503 if e.status_code in (429, 502, 503) else 500
        raise HTTPException(status_code=status_code, detail="AI service returned an error. Please try again later.")
    except Exception as e:
        print(f"Unexpected error during chat processing: {e}", flush=True)
        raise HTTPException(status_code=500, detail="An unexpected error occurred. Please try again.")


@app.get("/chat/greeting")
def chat_greeting():
    if not me_assistant:
        return JSONResponse({"greeting": "Hello! I'm ByteBuddy, Sayem's AI assistant. Ask me anything about skills, projects, or experience."})
    role = me_assistant.name.split()[-1] if " " in me_assistant.name else "assistant"
    return {
        "greeting": f"Hello! I'm **ByteBuddy**, {me_assistant.name}'s personal AI {role}. Ask me anything about skills, projects, or experience — I'm here to help!"
    }


