import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

// Routes
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Forum from "./pages/Posts.jsx";
import Profile from "./pages/Profile.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Settings from "./pages/Settings.jsx";

// Router Profile
import ProfilePosts from "./components/profile/ProfilePosts.jsx";
import ProfileUpvotes from "./components/profile/ProfileUpvotes.jsx";
import ProfileComments from "./components/profile/ProfileComments.jsx";

// components
import AuthUser from "./components/auth/AuthUser.jsx";
import PostPage from "./pages/PostPage.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/home", index: true, element: <Home /> },
			{ path: "/posts", element: <Forum /> },
			{ path: "/posts/:id", element: <PostPage /> },
			{ path: "/posts/create", element: <AuthUser component={<CreatePost />} /> },
			{
				path: "/profile",
				element: <AuthUser component={<Profile />} />,
				children: [
					{ path: "/profile/posts", element: <ProfilePosts /> },
					{ path: "/profile/upvotes", element: <ProfileUpvotes /> },
					{ path: "/profile/comments", element: <ProfileComments /> },
				],
			},
			{
				path: "/settings",
				element: <AuthUser component={<Settings />} />,
			},
			{ path: "/", element: <Navigate to={`/home`} /> },
		],
	},

	{
		path: "*",
		element: <h1>Page not found!</h1>,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
