// Local storage utility for quiz data management

class Storage {
  constructor() {
    this.data = new Map();
  }

  // Store data with a key
  set(key, value) {
    this.data.set(key, value);
    return true;
  }

  // Retrieve data by key
  get(key) {
    return this.data.get(key);
  }

  // Delete data by key
  delete(key) {
    return this.data.delete(key);
  }

  // Clear all data
  clear() {
    this.data.clear();
    return true;
  }

  // Get all stored keys
  keys() {
    return Array.from(this.data.keys());
  }

  // Check if key exists
  has(key) {
    return this.data.has(key);
  }
}

// Create a singleton instance
const storage = new Storage();

export default storage;