"use client";
import { useState, useEffect } from "react";
import { pToEmoji } from "../lib/ar/switch";
import encoding from "../lib/ar/encoding";
export default function Home() {
	const [prompt, setPrompt] = useState("");

	return (
		<main className="flex min-h-screen flex-col items-center justify-start gap-8 p-6">
			<Page />
		</main>
	);
}
function Page() {
	const [page, setPage] = useState({
		state: "inactive",
		units: [],
	});
  function createUnit() {
    if (focusOnEdit()) return;
		setPage({
			state: "editing",
			units: [
				...page.units,
				{
					encoding: 0,
					state: "editing",
					content: "",
				},
			],
		});
	}
  function edit(index) {
    if (focusOnEdit()) return;
		let newUnits = [...page.units];
		newUnits[index].state = "editing";
		setPage({
			...page,
			units: newUnits.filter((unit) => unit.content.trim() != ""),
		});
	}
	function cancel(index) {
		let newUnits = [...page.units];
		newUnits[index].state = "saved";
		setPage({
			...page,
			units: newUnits.filter((unit) => unit.content.trim() != ""),
		});
	}
	function save(index, newContent) {
		let newUnits = [...page.units];
		newUnits[index].content = newContent;
		newUnits[index].state = "saved";
		setPage({
			...page,
			units: newUnits.filter((unit) => unit.content.trim() != ""),
		});
	}
  function remove(index) {
    if (focusOnEdit()) return;
		page.units.splice(index, 1);
		setPage({ ...page, units: [...page.units] });
	}
  useEffect(() => { focusOnEdit(); });
	function focusOnEdit() {
		let editing = page.units.filter((unit) => unit.state == "editing")[0];
    if (!Boolean(editing)) return false;
		let index = page.units.indexOf(editing);
		let div = document.getElementById(index.toString());
		div?.focus();
		return Boolean(div);
  }
  
	return (
		<>
			{page.units.map((unit, index) => {
				return (
					<Unit
						key={JSON.stringify({
							...unit,
							index,
							units: JSON.stringify(page.units),
						})}
						data={{ ...unit, index: index }}
						edit={edit}
						cancel={cancel}
						save={save}
						remove={remove}
						id={index.toString()}
					/>
				);
			})}
			<button onClick={() => createUnit()}>Add</button>
		</>
	);
}

function Unit(props) {
	const [unit, setUnit] = useState({
		index: props.data.index,
		encoding: props.data.encoding,
		state: props.data.state,
		content: props.data.content,
		editContent: props.data.content,
	});

	if (unit.state == "saved") {
		return (
			<div className="flex flex-col w-full ">
				<div className="h-fit whitespace-break-spaces">{unit.content}</div>
				<div className="h-2 flex gap-4 mt-4">
					<button
						onClick={() => {
							setUnit({ ...unit, editContent: unit.content });
							props.edit(unit.index);
						}}
					>
						Edit
					</button>
					<button onClick={() => props.remove(unit.index)}>Delete</button>
				</div>
			</div>
		);
	} else {
		return (
			<div className="w-full">
				<textarea
					id={props.id}
					rows={unit.editContent.split("\n").length + 1}
					name="prompt"
					type="text"
					className="text-black w-full p-4 focus:outline-2 outline-cyan-600"
					value={unit.editContent}
					onChange={(e) => setUnit({ ...unit, editContent: e.target.value })}
				/>
				<div className="h-2 flex gap-4 mt-4">
					<button onClick={() => props.save(unit.index, unit.editContent)}>
						Save
					</button>
					<button onClick={() => setUnit({ ...unit, editContent: "" })}>
						Clear
					</button>
					<button onClick={() => props.cancel(unit.index)}>Cancel</button>
					<button
						onClick={() => setUnit({ ...unit, editContent: unit.content })}
					>
						Refresh
					</button>
				</div>
			</div>
		);
	}
}
