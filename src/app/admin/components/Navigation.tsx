"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import FloatingActionButton from "@components/FloatingActionButton";
export default function Navigation() {
	const [isDisplayed, setDisplay] = useState(false);
	function showNav() {
		setDisplay(!isDisplayed);
	}
	const navButtonProps = [
		[
			{ icon: "#house", name: "Dashboard", href: "/admin/dashboard" },
			{
				icon: "#file-earmark-text",
				name: "Reservations",
				notification: 99,
				href: "/admin/reservations",
			},
			{ icon: "#box", name: "Products", href: "/admin/products" },
			//A reminder, customers also holds the account requests, so dont make a seperate button
			{
				icon: "#people",
				name: "Customers",
				notification: 99,
				href: "/admin/customers",
			},
			//{ icon: "#graph-up", name: "Reports", href: "/admin/reports" },
			{
				icon: "#cash-coin",
				name: "Refund Requests",
				notification: 99,
				href: "/admin/refundRequests",
			},
		],
		[
			{
				icon: "#gear-wide-connected",
				name: "Settings",
				href: "/admin/settings",
			},
			{ icon: "#door-open", name: "Sign out", href: "/" },
		],
	];
	let currentRoute = usePathname();
	return (
		<>
			<nav
				className={twMerge(
					isDisplayed ? "fixed z-50 block pb-20" : "static hidden",
					"h-screen border-r border-brand-700 border-opacity-25 bg-primaryLight pt-4 drop-shadow-lg md:static md:right-auto md:col-span-3 md:block lg:col-span-2"
				)}>
				<NavSvgs></NavSvgs>
				{navButtonProps.map((set, setIndex) =>
					set.map((navButton, navButtonIndex) => {
						return (
							<React.Fragment key={setIndex + "-" + navButtonIndex}>
								<Link
									className={twMerge(
										"group mb-0.5 mr-2.5 flex w-full cursor-pointer items-center gap-2 px-4 py-2 align-middle font-medium hover:bg-brand-700 hover:text-white",
										currentRoute.startsWith(navButton.href) &&
											navButton.name !== "Sign out"
											? "bg-brand-700 text-white"
											: ""
									)}
									href={navButton.href}
									replace>
									<svg
										className={twMerge(
											"inline h-4 w-4 justify-center align-[-0.125em] group-hover:text-inherit",
											currentRoute.startsWith(navButton.href) &&
												navButton.name !== "Sign out"
												? "text-white"
												: "text-black"
										)}>
										<use href={navButton.icon}></use>
									</svg>
									{navButton.name}
								</Link>
								{navButtonIndex === set.length - 1 &&
									setIndex < navButtonProps.length - 1 && (
										<hr className="mx-auto my-4 w-5/6 border-brand" />
									)}
							</React.Fragment>
						);
					})
				)}
			</nav>
			{/* MOBILE ONLY */}
			<FloatingActionButton className="z-50 flex md:hidden" onclick={showNav}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16">
					<path
						fillRule="evenodd"
						d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
					/>
				</svg>
			</FloatingActionButton>
		</>
	);
}

function NavSvgs() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className="hidden">
			<symbol
				id="box"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16">
				<path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
			</symbol>
			<symbol
				id="cash-coin"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16">
				<path
					fillRule="evenodd"
					d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"
				/>
				<path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z" />
				<path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z" />
				<path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z" />
			</symbol>
			<symbol
				id="file-earmark-text"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16">
				<path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
				<path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
			</symbol>
			<symbol
				id="door-open"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16">
				<path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
				<path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
			</symbol>
			<symbol
				id="gear-wide-connected"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16">
				<path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
			</symbol>
			<symbol
				id="graph-up"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16">
				<path
					fillRule="evenodd"
					d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"
				/>
			</symbol>
			<symbol
				id="house"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16">
				<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
			</symbol>
			<symbol
				id="people"
				width="16"
				height="16"
				fill="currentColor"
				viewBox="0 0 16 16">
				<path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
			</symbol>
		</svg>
	);
}
