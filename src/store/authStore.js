import { create } from 'zustand';

const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

export const useAuthStore = create((set) => ({
  isLoggedIn: !!storedUser,
  user: storedUser,
  setLogin: (userData) => {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    set({
      isLoggedIn: true,
      user: userData,
    });
  },

  logout: () => {
    localStorage.removeItem('loggedInUser');
    set({ isLoggedIn: false, user: null });
  },
}));
