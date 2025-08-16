import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import useSignal from "./hooks/useSignal";
import { darkModeSignal } from "./global/userData";

function App() {
	const darkMode = useSignal(darkModeSignal, "App");

	return (
		<div
			className={` ${
				darkMode
					? "bg-n-background text-n-text fill-n-text stroke-n-text"
					: "bg-background text-text fill-text stroke-text"
			} min-h-screen `}
		>
			<Header />
			<div className="py-20 max-w-[1280px] mx-auto [&_h1]:text-4xl [&_h1]:font-semibold ">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
