"use client";
import DropDown from "@components/DropDown";
import Header from "../components/Header";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import LastUpdatedInfo from "../components/LastUpdatedInfo";
export default function Reservations() {
	const sortByTimeOptions = ["This day", "This week", "This month", "This year"];
	const sortByStatusOptions = ["All", "Pending", "Accepted"];
	function sortByTime(selectedTime: string) {
		//sort table by time
	}
	function sortByStatus(selectedStatus: string) {
		//sort table by status
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
			{/* temp, this should be inside table component */}
			<LastUpdatedInfo refresher={() => {}}></LastUpdatedInfo>
			{/* temp, table subject to change, this is for display for now */}
			<Table className="h-96 w-full" headers={headers} data={data}></Table>
		</>
	);
}
