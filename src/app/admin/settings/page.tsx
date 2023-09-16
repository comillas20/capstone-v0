import Header from "../components/Header";
import ThemeSwitcher from "./components/ThemeSwitcher";
export default function Settings() {
	return (
		<>
			<Header name="Settings"></Header>
			<div className="rounded border border-black p-12 dark:bg-slate-500">
				<h2>General</h2>
				{/* <label>
					<input type="radio" name="theme" id="light-mode"></input>
					Light
				</label>
				<label>
					<input type="radio" name="theme" id="dark-mode"></input>
					Dark
				</label> */}
				<ThemeSwitcher></ThemeSwitcher>
			</div>
		</>
	);
}
