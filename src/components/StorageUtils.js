export const saveToLocalStorage = (key, data) => {
    console.log(`Saving to local storage: ${key}`, data)
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    console.log(`Retrieved from local storage: ${key}`, data);
    return data ? JSON.parse(data) : [];
  };
  
  export const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };