import { createClient } from '@vercel/edge-config';

const client = createClient(process.env.EDGE_CONFIG);

const edgeConfigStore = {
  async getItem(key) {
    try {
      return await client.get(key);
    } catch (error) {
      console.error(`Error getting item for key ${key}:`, error);
      return null;
    }
  },

  async setItem(key, value) {
    try {
      await client.set(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting item for key ${key}:`, error);
      return false;
    }
  },

  async createUser(userData) {
    const users = await this.getItem('users') || [];
    const newUser = { ...userData, id: Date.now().toString() };
    users.push(newUser);
    await this.setItem('users', users);
    return newUser;
  },

  async getUser(id) {
    const users = await this.getItem('users') || [];
    return users.find(user => user.id === id) || null;
  },

  async createNote(noteData) {
    const notes = await this.getItem('notes') || [];
    const newNote = { ...noteData, id: Date.now().toString() };
    notes.push(newNote);
    await this.setItem('notes', notes);
    return newNote;
  },

  async getNotes(userId) {
    const notes = await this.getItem('notes') || [];
    return notes.filter(note => note.userId === userId);
  },

  async createQuiz(quizData) {
    const quizzes = await this.getItem('quizzes') || [];
    const newQuiz = { ...quizData, id: Date.now().toString() };
    quizzes.push(newQuiz);
    await this.setItem('quizzes', quizzes);
    return newQuiz;
  },

  async getQuizzes(userId) {
    const quizzes = await this.getItem('quizzes') || [];
    return quizzes.filter(quiz => quiz.userId === userId);
  }
};

export default edgeConfigStore;