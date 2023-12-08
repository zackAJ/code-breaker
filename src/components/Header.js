'use client';
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zLJBpfLIRuY
 */

import Link from "next/link";
import Drop from "@/components/Drop";
export default function Component() {

	return (
		<header class="flex items-center justify-between px-4 py-2  shadow">
			<div class="flex items-center">
				<a href="/">
          <img src="./logo.png" alt="logo" className="w-[50px]"/>
				</a>
			</div>
			<nav class="flex items-center space-x-4">
				<Link className={`p-2 !rounded-md gradient-border`} href="/onePage">
					الدليل 2
				</Link>
				<Link className={`p-2 !rounded-md gradient-border`} href="/all">
					الدليل 1
				</Link>
				<Link className={`p-2 !rounded-md gradient-border`} href="/generate">
					إنشاء
				</Link>
			</nav>
		</header>
	);
}
