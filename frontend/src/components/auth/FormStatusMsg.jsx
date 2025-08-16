import SvgComponent from "../misc/SvgComponent";
import Loader from "../misc/loader/Loader";

export default function FormStatusMsg({ state }) {
	return (
		state.lockForm && (
			<>
				<div className="absolute z-10 w-full h-full flex flex-col justify-center items-center">
					{state.loading ? (
						<Loader className={"round-loader scale-150"}></Loader>
					) : (
						<SvgComponent name={state.fetchStatus ? "success" : "failed"} size={100} />
					)}
					<p className={`text-xl text-center ${state.fetchStatus ? "text-success" : "text-warning"}`}>
						{state.message}
					</p>
				</div>
			</>
		)
	);
}
