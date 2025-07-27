import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Routes
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Forum from "./pages/Posts.jsx";
import Profile from "./pages/Profile.jsx";
import AddPost from "./pages/AddPost.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/home", element: <Home /> },
			{ path: "/posts", element: <Forum /> },
			{ path: "/posts/add", element: <AddPost /> },
			{ path: "/profile", element: <Profile /> },
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
