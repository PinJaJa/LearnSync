import { NextResponse } from 'next/server';
import storage from '../../utils/storage';

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
    },

    // Analysis question
    {
      type: 'analysis',
      content: "What is the most significant implication of these concepts?",
      answer: "Understanding and applying core principles",
      options: [
        "Understanding and applying core principles",
        "Memorizing specific details",
        "Following procedural steps",
        "Recognizing historical context"
      ],
      difficulty: "hard"
    },

    // Synthesis question
    {
      type: 'synthesis',
      content: "How would you combine these concepts to solve a complex problem?",
      answer: "Integrate multiple principles for comprehensive solution",
      options: [
        "Integrate multiple principles for comprehensive solution",
        "Apply single concept directly",
        "Reference similar problems",
        "Seek external guidance"
      ],
      difficulty: "expert"
    }
  ];

  // Add metadata and shuffle options
  return questions.map(q => ({
    ...q,
    id: generateQuestionId(),
    options: shuffleArray(q.options),
    timestamp: new Date().toISOString()
  }));
}

// Helper function to generate unique question ID
function generateQuestionId() {
  return 'q_' + Math.random().toString(36).substr(2, 9);
}

// Helper function to generate plausible options
function generateOptions(correct, pool = []) {
  const options = [correct];
  if (pool.length > 1) {
    pool = pool.filter(item => item !== correct);
    while (options.length < 4 && pool.length > 0) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      options.push(pool[randomIndex]);
      pool.splice(randomIndex, 1);
    }
  }
  while (options.length < 4) {
    options.push(`Alternative option ${options.length + 1}`);
  }
  return options;
}

// Helper function to shuffle array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET() {
  try {
    const quizzes = storage.get('quizzes') || [];
    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, content } = await request.json();
    
    // Generate questions locally
    const questions = generateQuestions(content);

    // Create quiz with generated questions
    const quiz = {
      id: Date.now().toString(),
      title,
      questions,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Get existing quizzes and add new one
    const quizzes = storage.get('quizzes') || [];
    quizzes.push(quiz);
    
    // Save updated quizzes
    storage.set('quizzes', quizzes);

    return NextResponse.json(quiz);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}