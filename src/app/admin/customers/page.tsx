import Header from "../components/Header";
import Table from "../components/Table";

export default function Customers() {
	// temp data
	const headers = ["id", "firstname", "MI", "Lastname", "Status"];
	const data = [
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
		["1", "jin", "c", "com", "accepted"],
		["2", "jhin", "crit", "adc", "pending"],
	];

	return (
		<>
			<Header name="Customers"></Header>
			<div>
				<Table headers={headers} data={data} className="h-[69vh]"></Table>
			</div>
		</>
	);
}
