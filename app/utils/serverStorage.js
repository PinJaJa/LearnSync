// Server-side storage utility
const serverStorage = {
  notes: [],
  quizzes: [],
  studyPlans: [],
  userPreferences: {},

  // Get data from in-memory storage
  getData: (key) => {
    try {
      switch (key) {
        case 'learnsync_notes':
          return serverStorage.notes;
        case 'learnsync_quizzes':
          return serverStorage.quizzes;
        case 'learnsync_study_plans':
          return serverStorage.studyPlans;
        case 'learnsync_preferences':
          return serverStorage.userPreferences;
        default:
          return [];
      }
    } catch (error) {
      console.error(`Error getting data for ${key}:`, error);
      return [];
    }
  },

  // Save data to in-memory storage
  saveData: (key, data) => {
    try {
      switch (key) {
        case 'learnsync_notes':
          serverStorage.notes = data;
          break;
        case 'learnsync_quizzes':
          serverStorage.quizzes = data;
          break;
        case 'learnsync_study_plans':
          serverStorage.studyPlans = data;
          break;
        case 'learnsync_preferences':
          serverStorage.userPreferences = data;
          break;
      }
      return true;
    } catch (error) {
      console.error(`Error saving data for ${key}:`, error);
      return false;
    }
  }
};

export default serverStorage;
export const STORAGE_KEYS = {
  NOTES: 'learnsync_notes',
  QUIZZES: 'learnsync_quizzes',
  STUDY_PLANS: 'learnsync_study_plans',
  USER_PREFERENCES: 'learnsync_preferences'
};