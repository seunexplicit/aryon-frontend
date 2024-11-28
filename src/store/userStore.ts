import { create } from 'zustand';
import { User } from '../types';

interface UserState {
  user: User | null;
  currentPage: number
  setSelectedUser: (user: User) => void
  setCurrentPage: (page: number) => void
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  currentPage: 1,
  setSelectedUser: (user) => set({ user }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
}));

export default useUserStore;
