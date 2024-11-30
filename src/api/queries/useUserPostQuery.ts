import { useEffect } from "react";

import { useParams } from "react-router";

import { Post } from "@/types";
import useUserStore from "@/store/userStore";
import usePostStore from "@/store/postStore";
import { environmentVar } from "@/lib/constant";
import { useQuery } from "@tanstack/react-query";

import { useUserQuery } from "./useUsersQuery";

export const useUserPostsQuery = () => {
  const { userId } = useParams();
  const { fetchUser } = useUserQuery(userId as string);
  const { user, setSelectedUser } = useUserStore();
  const { setPosts } = usePostStore();

  const handleFetchUser = async () => {
    const response = await fetchUser();

    if (response?.data?.user) {
      setSelectedUser(response.data.user);
    }
  };

  useEffect(() => {
    if (!user) {
      handleFetchUser();
    }
  }, [user]);

  const query = useQuery<Post[]>(
    ["userPosts", userId],
    async () => {
      try {
        const response = await fetch(
          `${environmentVar.BASE_URL}/api/users/${userId}/posts`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      } catch (error) {
        throw new Error(`Failed to fetch user posts ${JSON.stringify(error)}`);
      }
    },
    {
      onSuccess: (data) => {
        setPosts(data);
      },
    }
  );

  return query;
};
