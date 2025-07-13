import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
	return (
		<div className="bg-background text-text min-h-screen">
			<Header />
			<div className="pt-10">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
