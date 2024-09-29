import localforage from 'localforage';

const storeData = async (key, data) => {
  try {
    await localforage.setItem(key, data);
  } catch (err) {
    console.error('Error storing data:', err);
  }
};

const retrieveData = async (key) => {
  try {
    const value = await localforage.getItem(key);
    return value;
  } catch (err) {
    console.error('Error retrieving data:', err);
    return null;
  }
};

const removeData = async (key) => {
  try {
    await localforage.removeItem(key);
  } catch (err) {
    console.error('Error removing data:', err);
  }
};

export { storeData, retrieveData, removeData };
