// In-memory storage implementation for serverless environment
const storage = {
  _store: new Map(),

  get(key) {
    return this._store.get(key);
  },

  set(key, value) {
    this._store.set(key, value);
    return value;
  },

  delete(key) {
    return this._store.delete(key);
  },

  clear() {
    this._store.clear();
  }
};

export default storage;