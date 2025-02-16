import prisma from './db';

const dbStorage = {
  async createUser(userData) {
    return prisma.user.create({
      data: userData
    });
  },

  async getUser(id) {
    return prisma.user.findUnique({
      where: { id }
    });
  },

  async createNote(noteData) {
    return prisma.note.create({
      data: noteData
    });
  },

  async getNotes(userId) {
    return prisma.note.findMany({
      where: { userId }
    });
  },

  async createQuiz(quizData) {
    return prisma.quiz.create({
      data: {
        ...quizData,
        questions: {
          create: quizData.questions
        }
      },
      include: {
        questions: true
      }
    });
  },

  async getQuizzes(userId) {
    return prisma.quiz.findMany({
      where: { userId },
      include: {
        questions: true
      }
    });
  },

  async createStudyPlan(planData) {
    return prisma.studyPlan.create({
      data: planData
    });
  },

  async getStudyPlans(userId) {
    return prisma.studyPlan.findMany({
      where: { userId }
    });
  }
};

export default dbStorage;