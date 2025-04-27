const STORAGE_KEY = "DATA_STORAGE_KEY";
const IS_KNOWN_USER = "IS_KNOWN_USER";
/**
 * This class serves as a proxy to integrate various persistant storage solutions
 */
export default class PersistanceAPI {
  static upsert(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  static retrieve() {
    const isKnownUser = localStorage.getItem(IS_KNOWN_USER) || false;
    if (!isKnownUser) {
      console.log("called");
      localStorage.setItem(IS_KNOWN_USER, true);
      const defaultData = [
        {
          title: "A simple note example",
          description: "A more detailed description of this note",
        },
      ];
      this.upsert(defaultData);
      return defaultData;
    }
    const data = !!localStorage.getItem(STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(STORAGE_KEY))
      : [];
    return data;
  }
}
