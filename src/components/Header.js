"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zLJBpfLIRuY
 */

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Component() {
   useEffect(() => {
			const handleBeforeInstallPrompt = (event) => {
				event.preventDefault();
				// Store the event for later use
				// You can use this to trigger the installation prompt later
				// e.g., when the user clicks a button
				window.deferredPrompt = event;
			};

			window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

			return () => {
				window.removeEventListener(
					"beforeinstallprompt",
					handleBeforeInstallPrompt
				);
			};
		}, []);

		const handleAddToHomeScreen = () => {
			const { deferredPrompt } = window;

			if (deferredPrompt) {
				// Trigger the installation prompt
				deferredPrompt.prompt();

				// Wait for the user to respond to the prompt
				deferredPrompt.userChoice.then((choiceResult) => {
					if (choiceResult.outcome === "accepted") {
						console.log("User accepted the A2HS prompt");
					} else {
						console.log("User dismissed the A2HS prompt");
					}

					// Reset the deferredPrompt
					window.deferredPrompt = null;
				});
			}
		};

	return (
		<header className="flex items-center justify-between px-4 py-2  shadow">
			<div className="flex items-center">
				<a href="/">
					<img src="./logo.png" alt="logo" className="w-[50px]" />
				</a>
			</div>
			<nav className="flex items-center space-x-4">
				<button
					className={`p-2 !rounded-md gradient-border`}
					onClick={handleAddToHomeScreen}
				>
					إضافة إلى الشاشة الرئيسية
				</button>
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
