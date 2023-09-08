"use client";

import { useState, useEffect } from "react";

export default function LastUpdatedInfo({
	refresher,
}: {
	refresher: () => void;
}) {
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
		refresher();
	}
	return (
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
	);
}
