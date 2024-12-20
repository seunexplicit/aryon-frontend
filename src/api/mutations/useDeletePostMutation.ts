import usePostStore from "@/store/postStore";
import { environmentVar } from "@/lib/constant";
import { useMutation } from "@tanstack/react-query"

// Not making this network call because the data.db becomes a readonly
// file and can't be mutated after deployment. However, the intent is to make a request
// to delete the post and remote the post from the post store.
export const useDeletePostMutaion = () => {
    const { removeDeletedPost } = usePostStore();
    
    const mutation = useMutation({
        mutationFn: async (postId: string) => {
          const response = await fetch(`${environmentVar.BASE_URL}/api/users/posts/${postId}`, { method: 'DELETE' })

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        
          removeDeletedPost(postId)
          return response.json();
        },
    })

    return mutation;
}