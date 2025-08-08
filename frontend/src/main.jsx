import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Routes
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Forum from "./pages/Posts.jsx";
import Profile from "./pages/Profile.jsx";
import CreatePost from "./pages/CreatePost.jsx";
// components
import AuthUser from "./components/auth/AuthUser.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/home", element: <Home /> },
			{ path: "/posts", element: <Forum /> },
			{ path: "/posts/create", element: <AuthUser component={<CreatePost />} /> },
			{ path: "/profile", element: <AuthUser component={<Profile />} /> },
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
