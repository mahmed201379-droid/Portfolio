const fs = require('fs');
const path = require('path');
const { estimateTokens } = require('./context-budget');

let cachedProfileContext = null;

const DATA_DIR = path.join(__dirname, '..', 'data');
const SUMMARY_PATH = path.join(DATA_DIR, 'summary.txt');
const PDF_PATH = path.join(DATA_DIR, 'Profile.pdf');
const LINKEDIN_TEXT_PATH = path.join(DATA_DIR, 'profile_linkedin.txt');

const DEV = process.env.NODE_ENV !== 'production';

function normalizeWhitespace(text) {
  if (!text) return '';
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+(?=\n)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^[ \t]+|[ \t]+$/gm, '')
    .trim();
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function readTextFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return normalizeWhitespace(raw);
  } catch (e) {
    console.error(`Failed to read ${path.basename(filePath)}: ${e.message}`);
    return null;
  }
}

function logContextSize(label, text) {
  if (!DEV) return;
  const bytes = Buffer.byteLength(text, 'utf-8');
  console.log(`  ${label}: ${formatBytes(bytes)} (~${estimateTokens(text)} tok)`);
}

async function extractPdfText(filePath) {
  try {
    const pdfBuffer = fs.readFileSync(filePath);
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(pdfBuffer);
    return normalizeWhitespace(data.text || '');
  } catch (e) {
    console.error(`Failed to parse ${path.basename(filePath)}: ${e.message}`);
    return null;
  }
}

async function loadProfileContext() {
  if (cachedProfileContext) {
    return cachedProfileContext;
  }

  let summary = '';
  let linkedin = '';

  summary = readTextFile(SUMMARY_PATH);
  if (summary === null) {
    summary = 'Profile summary not available.';
  }

  if (fs.existsSync(LINKEDIN_TEXT_PATH)) {
    const text = readTextFile(LINKEDIN_TEXT_PATH);
    linkedin = text !== null ? text : '';
    if (DEV && text !== null) {
      console.log('Context source: profile_linkedin.txt (pre-extracted)');
    }
  } else {
    const text = await extractPdfText(PDF_PATH);
    linkedin = text !== null ? text : '';
    if (DEV) {
      console.log('Context source: Profile.pdf (parsed at cold start)');
    }
  }

  cachedProfileContext = {
    name: 'Md Sayem Ahamed',
    summary,
    linkedin,
  };

  if (DEV) {
    console.log('Profile context loaded:');
    logContextSize('summary.txt', summary);
    logContextSize('linkedin', linkedin);
  }

  return cachedProfileContext;
}

function buildSystemPrompt(profile) {
  const lines = [
    `Your name is ByteBuddy, ${profile.name}'s personal AI assistant.`,
    `You are answering questions on ${profile.name}'s website, particularly questions related to ${profile.name}'s career, background, skills and experience.`,
    `Your responsibility is to represent ${profile.name} for interactions on the website as faithfully as possible.`,
    'You are given a summary of his background and LinkedIn profile which you can use to answer questions.',
    'Be professional and engaging, as if talking to a potential client or future employer.',
    "If you don't know the answer, use your record_unknown_question tool to record it.",
    'If the user wants to get in touch, ask for their email and record it using record_user_details.',
    'Use Markdown for formatting (lists, bold, code snippets) to make responses clear and readable.',
    '',
    '## Summary:',
    profile.summary,
    '',
    '## LinkedIn Profile:',
    profile.linkedin,
  ];
  return lines.join('\n');
}

module.exports = {
  loadProfileContext,
  buildSystemPrompt,
};
