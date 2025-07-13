import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Routes
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Forum from "./pages/Forum.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "/home", element: <Home /> },
			{ path: "/forum", element: <Forum /> },
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
