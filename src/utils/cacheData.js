// src/utils/cacheData.js
export async function getCachedData(key, fetchFunction, expirationMinutes = 60) {
  const cacheKey = key + "_data";
  const expiryKey = key + "_expiry";
  const now = Date.now();
  const expiry = localStorage.getItem(expiryKey);
  
  if (expiry && now < parseInt(expiry, 10)) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  }
  const data = await fetchFunction();
  if (data) {
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem(expiryKey, (now + expirationMinutes * 60000).toString());
  }
  return data;
}