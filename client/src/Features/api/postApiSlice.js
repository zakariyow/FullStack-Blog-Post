import { apiSlice } from "./BaseApiSlice";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "./posts",
      }),
      providesTags: ["Post"],
    }),
    getPostInfo: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}`,
      }),
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts/",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ postId, updatedPost }) => ({
        url: `/posts/${postId}`,
        method: "PUT",
        body: updatedPost,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostInfoQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
