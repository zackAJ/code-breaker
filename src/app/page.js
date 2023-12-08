"use client";
import { useState } from "react";
import "@/app/style.css";

export default function Home() {
	const [prompt, setPrompt] = useState("");

	return (
		<div className="gradient-border p-8">
			<img src="/logo.svg" alt="logo" />
		</div>
	);
}
