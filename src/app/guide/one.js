"use client";
import { useState } from "react";
import { pToUnicode, toEmoji } from "@/lib/ar/switch";
import encoding from "@/lib/ar/encoding";
import alphabet from "@/lib/ar/alphabet";
import "@/app/style.css";
export default function Guide() {
	const [prompt, setPrompt] = useState("");
  const index = 4;
  console.log(index);
	return (
		<main className="min-h-screen p-6  bg-white text-black">
			<img src="/logo.png" alt="logo" className="w-[100px] mt-2 mx-auto" />
			<div className="flex flex-col gap-2 items-center justify-start ">
				<div>
					<h1 className="text-3xl font-bold w-fit mx-auto text-[#186F65] px-4 -mb-5 bg-white z-10 relative">
						تشفير {index + 1}
					</h1>
					<div
						dir="rtl"
						className="flex flex-wrap justify-evenly gap-12 border border-solid border-[#186F65] rounded-xl p-2 pt-8"
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
          className="w-[62px]"
				/>
				<div className="text-[38px] font-bold">{letter}</div>
			</div>
		</>
	);
}
