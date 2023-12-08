'use client';
import { useState } from "react";
import Link from "next/link";
export default function Drop() {
  let [toggle, setToggle] = useState(false);
	return (
		<>
			<button
				id="dropdownDefaultButton"
				data-dropdown-toggle="dropdown"
				class="p-2 !rounded-md gradient-border text-center inline-flex items-center  relative"
				type="button"
				onClick={() => setToggle(!toggle)}
			>
				Dropdown button{" "}
				<svg
					class={`w-2.5 h-2.5 ms-3 transition-all ${
						toggle ? "rotate-180" : ""
					} `}
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
				<div
					id="dropdown"
					class={`z-10 p-[1px]  divide-y divide-gray-100 !rounded-md shadow !absolute top-[120%] !left-1/2 !-translate-x-1/2 
          ${toggle ? "" : "hidden"} `}
				>
					<ul class="flex flex-col gap-3">
						<li>
							<Link
								className="block p-2 !rounded-md gradient-border hover:bg-transparent"
                href="generate"
                download={true}
							>
								Download
							</Link>
						</li>
						<li>
							<a
								className="block p-2 !rounded-md gradient-border hover:bg-transparent"
								href="./guide/all.pdf"
							>
								See
							</a>
						</li>
					</ul>
				</div>
			</button>
		</>
	);
}
