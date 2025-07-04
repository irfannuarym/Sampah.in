import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  role: '',
  setLogin: (role) => set({ isLoggedIn: true, role }),
  logout: () => set({ isLoggedIn: false, role: '' }),
}));
