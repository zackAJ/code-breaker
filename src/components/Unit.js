import { useState } from "react";
export default function Unit(props) {
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
          dir="rtl"
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
