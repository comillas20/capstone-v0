import Header from "../components/Header";
import Table from "../components/Table";
export default function Products() {
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
			<Header name="Products"></Header>
			<Table className="h-[69vh] w-full" data={data} headers={headers}></Table>
		</>
	);
}
