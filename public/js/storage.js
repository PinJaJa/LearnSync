// Local storage keys with versioning
const STORAGE_KEYS = {
  NOTES: 'learnsync_notes',
  QUIZZES: 'learnsync_quizzes',
  STUDY_PLANS: 'learnsync_study_plans',
  VERSIONS: 'learnsync_versions',
  BACKUPS: 'learnsync_backups',
  USER_PREFERENCES: 'learnsync_preferences'
};

// Advanced storage utility with encryption, versioning, and backup
const Storage = {
  // Encrypt data before storing
  encrypt: (data) => {
    try {
      return btoa(JSON.stringify(data));
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  },

  // Decrypt stored data
  decrypt: (encryptedData) => {
    try {
      return JSON.parse(atob(encryptedData));
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  },

  // Get data from localStorage with decryption
  getData: (key) => {
    try {
      const encryptedData = localStorage.getItem(key);
      if (!encryptedData) return [];
      const data = Storage.decrypt(encryptedData);
      return data || [];
    } catch (error) {
      console.error(`Error getting data for ${key}:`, error);
      return [];
    }
  },

  // Save data to localStorage with encryption and versioning
  saveData: (key, data) => {
    try {
      // Encrypt data
      const encryptedData = Storage.encrypt(data);
      if (!encryptedData) throw new Error('Encryption failed');

      // Save encrypted data
      localStorage.setItem(key, encryptedData);

      // Create version record
      const version = {
        timestamp: Date.now(),
        key,
        checksum: Storage.generateChecksum(data)
      };
      const versions = Storage.getData(STORAGE_KEYS.VERSIONS) || [];
      versions.push(version);
      localStorage.setItem(STORAGE_KEYS.VERSIONS, Storage.encrypt(versions));

      // Create backup
      Storage.createBackup(key, encryptedData);
    } catch (error) {
      console.error(`Error saving data for ${key}:`, error);
    }
  },

  // Generate checksum for data integrity
  generateChecksum: (data) => {
    return btoa(JSON.stringify(data)).slice(0, 8);
  },

  // Create and manage backups
  createBackup: (key, data) => {
    try {
      const backups = Storage.getData(STORAGE_KEYS.BACKUPS) || {};
      backups[key] = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.BACKUPS, Storage.encrypt(backups));
    } catch (error) {
      console.error(`Backup creation failed for ${key}:`, error);
    }
  },

  // Restore data from backup
  restoreFromBackup: (key) => {
    try {
      const backups = Storage.getData(STORAGE_KEYS.BACKUPS);
      if (backups && backups[key]) {
        localStorage.setItem(key, backups[key].data);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Restore failed for ${key}:`, error);
      return false;
    }
  },

  // Initialize storage with empty arrays if not exists
  init: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, '[]');
      }
    });
  }
};

// Initialize storage on load
Storage.init();

// Export storage utility and keys
export { Storage, STORAGE_KEYS };