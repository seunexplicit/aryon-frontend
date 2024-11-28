import { useMutation } from "@tanstack/react-query"

import usePostStore from "../../store/postStore";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useDeletePostMutaion = () => {
    const { removeDeletedPost } = usePostStore();
    
    const mutation = useMutation({
        mutationFn: async (postId: string) => {
          const response = await fetch(`${BASE_URL}/api/users/posts/${postId}`, { method: 'DELETE' })

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        
          removeDeletedPost(postId)
          return response.json();
        },
    })

    return mutation;
}