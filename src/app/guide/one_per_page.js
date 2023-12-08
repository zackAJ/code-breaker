"use client";
import { useState } from "react";
import { pToUnicode, toEmoji } from "@/lib/ar/switch";
import encoding from "@/lib/ar/encoding";
import alphabet from "@/lib/ar/alphabet";
import "@/app/style.css";
export default function Guide() {
	const [prompt, setPrompt] = useState("");
	const page = [0, 1, 2, 3, 4];

	return (
		<main className="min-h-screen p-6 bg-white text-black">
			{page.map((index) => {
				return (
					<>
						<Unit key={index} index={index} />
					</>
				);
			})}
		</main>
	);
}

function Avatar({ letter, encoding }) {
	return (
		<>
			<div className="flex flex-col items-center">
				<img
					key={letter}
					src={`/emojis_min/${pToUnicode(letter, encoding)}.png`}
					alt=""
					className="w-[57px]"
				/>
				<div className="text-[34px] font-bold">{letter}</div>
			</div>
		</>
	);
}

function Unit({ index }) {
	return (
		<>
			<img
				src="/logo.png"
				alt="logo"
				className={`w-[100px] mx-auto mt-2 ${index === 0 ? "" : "pt-6"}`}
			/>
			<div className="flex flex-col gap-2 items-center justify-start">
				<div>
					<h1 className="text-3xl font-bold w-fit mx-auto text-[#186F65] px-4 -mb-5 bg-white z-10 relative">
						تشفير {index + 1}
					</h1>
					<div
						dir="rtl"
						className="flex flex-wrap justify-evenly gap-x-16 gap-y-10 border border-solid border-[#186F65] rounded-xl p-2 pt-8"
					>
						{alphabet.map((letter) => {
							return (
								<>
									<Avatar
										letter={letter}
										encoding={encoding[index]}
										key={letter}
									/>
								</>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}
