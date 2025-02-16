// Client-side study planner utility for LearnSync
import ClientStorage from './clientStorage';

const StudyPlanner = {
  // Create a new study session
  createSession: (topic, duration, goals) => {
    const session = {
      id: Date.now(),
      topic,
      duration,
      goals,
      completed: false,
      startTime: null,
      endTime: null,
      progress: 0
    };

    const sessions = StudyPlanner.getSessions();
    sessions.push(session);
    ClientStorage.setItem('studySessions', sessions);

    return session;
  },

  // Get all study sessions
  getSessions: () => {
    return ClientStorage.getItem('studySessions') || [];
  },

  // Start a study session
  startSession: (sessionId) => {
    const sessions = StudyPlanner.getSessions();
    const index = sessions.findIndex(s => s.id === sessionId);
    
    if (index !== -1) {
      sessions[index].startTime = new Date().getTime();
      ClientStorage.setItem('studySessions', sessions);
      return sessions[index];
    }
    return null;
  },

  // Update session progress
  updateProgress: (sessionId, progress) => {
    const sessions = StudyPlanner.getSessions();
    const index = sessions.findIndex(s => s.id === sessionId);
    
    if (index !== -1) {
      sessions[index].progress = Math.min(100, Math.max(0, progress));
      ClientStorage.setItem('studySessions', sessions);
      return sessions[index];
    }
    return null;
  },

  // Complete a study session
  completeSession: (sessionId) => {
    const sessions = StudyPlanner.getSessions();
    const index = sessions.findIndex(s => s.id === sessionId);
    
    if (index !== -1) {
      sessions[index].completed = true;
      sessions[index].endTime = new Date().getTime();
      sessions[index].progress = 100;
      ClientStorage.setItem('studySessions', sessions);
      return sessions[index];
    }
    return null;
  },

  // Delete a study session
  deleteSession: (sessionId) => {
    const sessions = StudyPlanner.getSessions().filter(s => s.id !== sessionId);
    ClientStorage.setItem('studySessions', sessions);
    return sessions;
  },

  // Get study statistics
  getStatistics: () => {
    const sessions = StudyPlanner.getSessions();
    return {
      totalSessions: sessions.length,
      completedSessions: sessions.filter(s => s.completed).length,
      averageProgress: sessions.reduce((acc, s) => acc + s.progress, 0) / sessions.length || 0,
      totalStudyTime: sessions.reduce((acc, s) => {
        if (s.startTime && s.endTime) {
          return acc + (s.endTime - s.startTime);
        }
        return acc;
      }, 0)
    };
  }
};

export default StudyPlanner;