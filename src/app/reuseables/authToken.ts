const TOKEN_KEY = "auth_token";

export const saveToken = (token: string): void => {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(TOKEN_KEY, token);
      console.log("authToken: Saved token:", token);
    } else {
      console.warn("authToken: Window undefined during saveToken");
    }
  } catch (error) {
    console.error("authToken: Error saving token:", error);
  }
};

export const getToken = (): string | null => {
  try {
    if (typeof window !== "undefined") {
      const token = window.sessionStorage.getItem(TOKEN_KEY);
      console.log("authToken: Retrieved token:", token);
      return token ? `Bearer ${token}` : null;
    }
    console.warn("authToken: Window undefined during getToken");
    return null;
  } catch (error) {
    console.error("authToken: Error retrieving token:", error);
    return null;
  }
};

export const removeToken = (): void => {
  try {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(TOKEN_KEY);
      console.log("authToken: Token removed");
    } else {
      console.warn("authToken: Window undefined during removeToken");
    }
  } catch (error) {
    console.error("authToken: Error removing token:", error);
  }
};

export const hasToken = (): boolean => {
  try {
    if (typeof window !== "undefined") {
      const hasToken = !!window.sessionStorage.getItem(TOKEN_KEY);
      console.log("authToken: Has token:", hasToken);
      return hasToken;
    }
    console.warn("authToken: Window undefined during hasToken");
    return false;
  } catch (error) {
    console.error("authToken: Error checking token:", error);
    return false;
  }
};