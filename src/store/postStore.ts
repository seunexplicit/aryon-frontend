import { create } from "zustand";

import { Post } from "../types";

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  removeDeletedPost: (postId: string) => void;
}

const usePostStore = create<PostState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  removeDeletedPost: (postId: string) =>
    set((state) => ({
      posts: state?.posts?.filter(({ id }) => id !== postId),
    })),
}));

export default usePostStore;
