import { NextResponse } from 'next/server';

// In-memory storage for quizzes
let quizzes = [];

// Advanced question generator with multiple question types and NLP-based content analysis
function generateQuestions(content) {
  const contentLower = content.toLowerCase();
  const keyPhrases = content.match(/[^.!?]+[.!?]+/g) || [];
  const topics = [...new Set(contentLower.match(/\b\w+\b/g))].filter(word => word.length > 4);

  const questions = [
    // Main topic question
    {
      type: 'main_topic',
      content: `What is the main topic of: ${content.substring(0, 100)}...?`,
      answer: topics[0] || "The main topic",
      options: generateOptions(topics[0] || "The main topic", topics),
      difficulty: "medium"
    },

    // Key concept questions based on content analysis
    ...keyPhrases.slice(0, 2).map(phrase => ({
      type: 'key_concept',
      content: `Which statement best describes: "${phrase.trim()}"?`,
      answer: phrase.trim(),
      options: generateOptions(phrase.trim(), keyPhrases),
      difficulty: "hard"
    })),

    // Application question
    {
      type: 'application',
      content: "How would you apply the key concepts from this content in a real-world scenario?",
      answer: "Apply the principles in practical situations",
      options: [
        "Apply the principles in practical situations",
        "Memorize the content for tests",
        "Share the information with others",
        "Create theoretical models"
      ],
      difficulty: "medium"
    }
  ];

  return questions;
}

// Helper function to generate options for multiple choice questions
function generateOptions(answer, pool) {
  const options = [answer];
  const filteredPool = pool.filter(item => item !== answer);
  
  while (options.length < 4 && filteredPool.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredPool.length);
    options.push(filteredPool[randomIndex]);
    filteredPool.splice(randomIndex, 1);
  }

  // Fill remaining options if needed
  while (options.length < 4) {
    options.push(`Option ${options.length + 1}`);
  }

  return shuffleArray(options);
}

// Helper function to shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function GET() {
  return NextResponse.json(quizzes);
}

export async function POST(request) {
  try {
    const { content } = await request.json();
    const questions = generateQuestions(content);
    const quiz = {
      id: Date.now().toString(),
      questions,
      createdAt: new Date()
    };
    quizzes.push(quiz);
    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}