import React, { useRef, useState } from "react";
import {
  useAddPostMutation,
  useGetPostInfoQuery,
  useUpdatePostMutation,
} from "../Features/api/postApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePost = () => {
  const { id } = useParams();

  const { data: post } = useGetPostInfoQuery(id);
  const [addPost, { isLoading }] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();

  const imageRef = useRef(null);
  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);

  const navigate = useNavigate();

  const clearForm = () => {
    setTitle("");
    setContent("");
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    
      handleUpdatePost();
      clearForm()
  };
  const handleUpdatePost = () => {
    console.log("post", post);
    updatePost({ postId: post._id, updatedPost: { title, content } })
      .unwrap()
      .then(() =>{
        toast.success("Successfully Updated post✔");
        navigate('/')
      })
      .catch((err) => {
        console.log("error updating post", err)
        toast.success("Successfully Updated post✔");
        navigate('/')
       
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("fiel", file);
    if (file) setImage(file);
  };

  return (
    <div className="fixed top-1 h-full left-0 right-0 bg-[#E1E2E4] overflow-auto">
      <div className="mt-24 p-4 ">
        <div className="max-w-2xl m-auto p-8  bg-white shadow-lg rounded-lg">
          <div className="py-2">
            <h2 className="text-xl font-semibold text-gray-600">
              Create your post here.
            </h2>
            <hr className="mt-2 border border-gray-200 mb-4" />
            <form onSubmit={handleSumbit}>
              <div className="form-group">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter Your Title"
                  className="p-2 mt-2 text-md w-full bg-gray-100 rounded-md shadow-md outline-none focus:border border-green-800"
                />
              </div>
              <div className="form-group mt-3">
                <textarea
                  // type="text"
                  rows="8"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content"
                  className="p-2 mt-2 text-md w-full  bg-gray-100 rounded-md shadow-md outline-none focus:border border-green-800"
                ></textarea>
              </div>

              <div className="form-group">
              
                <div className="flex justify-end items-end pt-6">
                  <button
                    type="submit"
                    className="text-center px-3 w-24 py-2 rounded-lg bg-green-900 text-white focus:border-none"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
