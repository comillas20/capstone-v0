"use client";
import DropDown from "@components/DropDown";
import Header from "../components/Header";
import Table from "../components/Table";
import { useEffect, useState } from "react";
export default function Reservations() {
	const sortByTimeOptions = ["This day", "This week", "This month", "This year"];
	const sortByStatusOptions = ["All", "Pending", "Accepted"];
	function sortByTime(selectedTime: string) {
		//sort table by time
	}
	function sortByStatus(selectedStatus: string) {
		//sort table by status
	}
	const [lastUpdated, setLastUpdated] = useState(0);
	const updateTimeInMinutes = 15;
	useEffect(() => {
		const interval = setInterval(() => {
			setLastUpdated(prevUpdate => prevUpdate + 15);
		}, updateTimeInMinutes * 60000);
		return () => clearInterval(interval);
	}, []);
	function refreshList() {
		setLastUpdated(0);
	}
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
			<Header name="Reservations">
				<DropDown
					key={"sortByStatus"}
					defaultSelected={sortByStatusOptions[1]}
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16">
							<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
							<path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
						</svg>
					}
					handler={sortByStatus}>
					{sortByStatusOptions}
				</DropDown>
				<DropDown
					key={"sortByTime"}
					defaultSelected={sortByTimeOptions[0]}
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16">
							<path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
							<path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
						</svg>
					}
					handler={sortByTime}>
					{sortByTimeOptions}
				</DropDown>
			</Header>
			<div className="mb-6 flex justify-end gap-2">
				{/* for some dumb reason I cant pinpoint, "lastUpdated && ..." doesnt work, 
				everything is hidden apart from a single 0 when lastUpdated == 0 */}
				{lastUpdated != 0 && (
					<span className="flex items-end text-xs font-light">
						Last updated {lastUpdated} min ago
					</span>
				)}
				<button className="text-sm font-light" onClick={refreshList}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						className="animate-spins mr-1 transition-transform hover:rotate-180"
						viewBox="0 0 16 16">
						<path
							fillRule="evenodd"
							d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
						/>
						<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
					</svg>
				</button>
			</div>
			<Table className="h-96 w-full" headers={headers} data={data}></Table>
		</>
	);
}
