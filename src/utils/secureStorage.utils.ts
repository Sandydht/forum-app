import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET;

export const setSecureItem = (key: string, value: unknown) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    SECRET_KEY
  ).toString();

  localStorage.setItem(key, encrypted);
};

export const getSecureItem = (key: string) => {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decrypt error:", error);
    return null;
  }
};

export const removeSecureItem = (key: string) => {
  localStorage.removeItem(key);
};
