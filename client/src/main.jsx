import React from "react";
import "./index.css";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CreatePostPage from "./Pages/CreatePostPage.jsx";
import SignInPage from "./Pages/SignInPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";


import store from "./sore.js";
import Posts from "./Components/Posts.jsx";
import UpdatePost from "./Components/UpdatePost.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Posts/>
      },
      {
        path: "/update-post/:id",
        element: <UpdatePost/>
      },
      {
        path: "/login",
        element: <SignInPage/>
      },
      {
        path: "/signup",
        element: <SignUpPage/>
      },
      {
        path: "/create-post",
        element: <CreatePostPage/>
      }
    ]
  }
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
