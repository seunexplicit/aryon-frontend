import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router"

import useUserStore from "@/store/userStore";
import usePostStore from "@/store/postStore";
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/elements/PostCard";

import { useDeletePostMutaion, useUserPostsQuery } from "../api";

export const PostsPage = () => {
    const { mutate: deletPostMutation } = useDeletePostMutaion()
    const { user } = useUserStore();
    const { isLoading, error } = useUserPostsQuery();
    const { posts } = usePostStore()
    const navigate = useNavigate()

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Record<string, string>).message}</div>;

    return (
        <div className="flex flex-col gap-3 items-start">
            <Button onClick={() => navigate('/')} variant="ghost" size="sm"><ArrowLeft /> Back to Users</Button>
            <h2 className="text-3xl font-medium">{user?.name}</h2>
            <p className="text-sm mb-4 flex items-center gap-2">
                {user?.email} <span className="text-2xl">•</span> {posts?.length ?? 0} Post{posts?.length !== 1 ? 's' : ''}
            </p>
            <div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-8 max-h-[calc(100dvh-188px)] overflow-y-auto"
            >
                { posts?.map((post) => (<PostCard 
                    id={post.id} 
                    key={post.id} 
                    title={post.title}
                    content={post.body}
                    onDeleteClick={() => deletPostMutation(post.id)} 
                />
                ))}
            </div>
        </div>
    )
}