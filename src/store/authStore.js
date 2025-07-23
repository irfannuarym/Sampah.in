import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  setLogin: (userData) => set({
    isLoggedIn: true,
    user: userData,
  }),
  logout: () => {
    localStorage.removeItem('loggedInUser');
    set({ isLoggedIn: false, user: null });
  },
}));