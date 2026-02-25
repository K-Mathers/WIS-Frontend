import { createComment, reactComment } from "@/api/article";
import type { IComment } from "@/api/article/types";
import type { ICommentState } from "@/components/BlogPage/type/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCommentMutatuin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onMutate: async (newComment) => {
      const queryKey = ["comments", newComment.articleId];

      await queryClient.cancelQueries({ queryKey });

      const previousComments = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: IComment[]) => [
        newComment,
        ...(oldData || []),
      ]);

      return { previousComments, queryKey };
    },
    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(context.queryKey, context.previousComments);
      }
    },
    onSettled: (_, __, ___, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
    },
  });
};

export const useReactCommentMutation = (articleId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reactComment,

    onMutate: async ({ idComment, reactData }) => {
      const queryKey = ["comments", articleId];

      await queryClient.cancelQueries({ queryKey });

      const previousComments = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: ICommentState[]) => {
        if (!oldData) return [];

        return oldData.map((comment) => {
          if (comment.id === idComment) {
            if (comment.myReaction === "LIKE") comment.likes--;
            if (comment.myReaction === "DISLIKE") comment.dislikes--;
            if (reactData.type === "LIKE") {
              return {
                ...comment,
                likes: comment.likes + 1,
                myReaction: reactData.type,
              };
            } else {
              return {
                ...comment,
                dislikes: comment.dislikes + 1,
                myReaction: reactData.type,
              };
            }
          }
          return comment;
        });
      });

      return { previousComments, queryKey };
    },

    onSuccess: () => {
      const queryKey = ["comments", articleId];
      queryClient.invalidateQueries({ queryKey: queryKey });
    },

    onError: (_, __, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(context.queryKey, context.previousComments);
      }
    },

    onSettled: (_, __, ___, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
    },
  });
};
