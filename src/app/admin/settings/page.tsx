import Header from "../components/Header";
import prismadb from "../../../../lib/prismadb";

// async function dataTest() {
// 	const d = await prismadb.user.create({
// 		data: {
// 			firstName: "Jino Joy",
// 			middleName: "C.",
// 			lastName: "Comillas",
// 			password: "emiya",
// 			role: "ADMIN",
// 		},
// 	});
// 	console.log(d);
// }
export default function Settings() {
	return (
		<>
			<Header name="Settings"></Header>
			<div className="rounded border border-black p-12 dark:bg-slate-500">
				<h2>General</h2>
				<label>
					<input type="radio" name="theme" id="light-mode"></input>
					Light
				</label>
				<label>
					<input type="radio" name="theme" id="dark-mode"></input>
					Dark
				</label>
			</div>
		</>
	);
}
