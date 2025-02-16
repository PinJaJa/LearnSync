// AI Core functionality for LearnSync
const AICore = {
  // Generate questions based on content
  generateQuestions: (content) => {
    // Extract key phrases from content
    const sentences = content.split('.')
      .filter(s => s.trim().length > 20)
      .slice(0, 5);
    
    return sentences.map(sentence => {
      const topic = sentence.trim();
      const mainConcept = topic.split(' ').slice(0, 3).join(' ');
      
      return {
        content: `What is described in: "${topic.substring(0, 100)}..."?`,
        answer: mainConcept,
        options: [
          mainConcept,
          `Alternative to ${mainConcept}`,
          `Opposite of ${mainConcept}`,
          "None of the above"
        ]
      };
    });
  },

  // Analyze content to suggest study plan
  analyzeLearningContent: (content) => {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    const wordCount = content.split(/\s+/).length;
    
    return {
      mainTopics: paragraphs.slice(0, 3).map(p => p.split('.')[0]),
      estimatedStudyTime: Math.max(1, Math.ceil(wordCount / 200)) + " hours",
      difficulty: wordCount > 1000 ? "Advanced" : wordCount > 500 ? "Intermediate" : "Beginner",
      suggestedSessions: Math.ceil(wordCount / 300)
    };
  },

  // Generate study tips based on content
  generateStudyTips: (content) => {
    const wordCount = content.split(/\s+/).length;
    const tips = [
      "Create a mind map of key concepts",
      "Use the Pomodoro Technique for focused study sessions",
      "Take regular breaks to maintain concentration",
      "Practice active recall through self-testing",
      "Explain concepts in your own words"
    ];

    if (wordCount > 1000) {
      tips.push(
        "Break the content into smaller, manageable chunks",
        "Schedule regular review sessions"
      );
    }

    return tips;
  }
};

export default AICore;