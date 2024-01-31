import React from "react";
import { toast } from "react-toastify";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useDeletePostMutation, useGetPostsQuery } from "../Features/api/postApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostList = () => {
    const {data, isLoading, isError, error} = useGetPostsQuery();
    const {currentUser} = useSelector((state) => state.auth);
    const [deletePost] = useDeletePostMutation();
    const handleDeletedUserPost = (id) => {
      deletePost(id).unwrap()
      .then(() => console.log("success"))
      .catch((err) => console.log("error Deleting post", err));
    }
  return (
    <div className="max-w-2xl m-auto py-4">
      <h2 className="text-lg p-2 mt-12 font-semibold text-gray-500 ">
        Recent Post
      </h2>

      {data?.map((post) => (
        <div className="mb-5 m-1" key={post.id}>
          <div className="p-4 shadow-lg bg-gray-50 rounded-lg w-full h-auto">
            <div className="flex flex-col">
              <div className="flex ">
                <span className="flex justify-end gap-5 text-2xl items-center bg-[#6EE7B7] rounded-full text-center text-green-900 font-bold">
                  <h2 className="flex justify-center items-center w-12 h-12">
                    {post.author.username[0].toUpperCase()}
                  </h2>
                </span>
                <div className="flex flex-col ml-1 items-start">
                  <h2 className="text-lg font-semibold text-gray-700">
                    {post.author.username}
                  </h2>
                  <div className="flex -mt-[5px]">
                    <p className="text-light text-[12px]">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-1 mt-1">
                <h2 className="text-xl font-bold ">{post.title}</h2>
                <p className="trankate">{post.content}</p>
                {post?.image ? (
                  <div className="w-full h-fit rounded mt-2">
                    <img
                    src={post?.image}
                    alt="Image"
                    className="w-full h-fit object-cover rounded-md border border-green-400"
                  />
                  </div>
                ) : (
                  <h3></h3>
                )}
                {currentUser?._id === post?.author?._id && (
                    <div className="flex items-center space-x-2 mt-2 text-center justify-end">
                      <Link to={'/update-post/'+post?._id} className="px-2 py-3 bg-green-600 hover:bg-green-700 outline-none text-white rounded-md w-24" >
                        Upadte
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete?`)) {
                            handleDeletedUserPost(post?._id)
                            // toast.success("Successfully deleted post!");
                          }
                        }}
                        className="px-2 py-3 bg-red-600 hover:bg-red-700 outline-none text-white rounded-md w-24"
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;