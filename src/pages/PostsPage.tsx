import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router"

import useUserStore from "@/store/userStore";
import usePostStore from "@/store/postStore";
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/elements/PostCard";
import { QueryEffect } from "@/components/elements/QueryEffect";

import { useUserPostsQuery } from "../api";

export const PostsPage = () => {
    const { user } = useUserStore();
    const { isLoading, error } = useUserPostsQuery();
    const { posts, removeDeletedPost } = usePostStore()
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-3 items-start">
            <Button onClick={() => navigate('/')} variant="ghost" size="sm"><ArrowLeft /> Back to Users</Button>
            <h2 className="text-3xl font-medium">{user?.name}</h2>
            <p className="text-sm mb-4 flex items-center gap-2">
                {user?.email} <span className="text-2xl">•</span> {posts?.length ?? 0} Post{posts?.length !== 1 ? 's' : ''}
            </p>
            <QueryEffect isLoading={isLoading} error={error as Record<string, string>}>
                <div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 gap-y-8 max-h-[calc(100dvh-188px)] overflow-y-auto"
                >
                    { posts?.map((post) => (<PostCard 
                        id={post.id} 
                        key={post.id} 
                        title={post.title}
                        content={post.body}
                        onDeleteClick={() => removeDeletedPost(post.id)} 
                    />
                    ))}
                </div>
            </QueryEffect>
        </div>
    )
}