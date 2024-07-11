// src/utils/auth.ts
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token; // returns true if token exists, false otherwise
  };
  