import { useState } from "react";
import Dropdown from "@/components/Dropdown";
export default function Unit(props) {
	const [unit, setUnit] = useState({
		index: props.data.index,
		encoding: props.data.encoding,
		state: props.data.state,
		content: props.data.content,
		editContent: props.data.content,
  });
  const options = [];
  for (let i = 0; i < 5; i++) {
    options.push({ label: `تشفير ${i+1}`, value: i });
  }
    function handleOptionChange(value) {
					props.onOptionChange(unit.index,value);
		}
	if (unit.state == "saved") {
		return (
			<div className="flex flex-col w-full ">
				<div className="flex justify-center">
					<Dropdown
						options={options}
						onOptionChange={handleOptionChange}
						value={unit.encoding}
					/>
				</div>
				<div className="h-fit whitespace-break-spaces" dir="rtl">
					{unit.content}
				</div>
				<div className="h-2 flex gap-4 mt-4 ml-auto">
					<button
						onClick={() => {
							setUnit({ ...unit, editContent: unit.content });
							props.edit(unit.index);
						}}
					>
						تعديل
					</button>
					<button onClick={() => props.remove(unit.index)}>حذف</button>
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
				<div className="h-2 flex gap-4 mt-4 justify-end">
					<button onClick={() => props.save(unit.index, unit.editContent)}>
						حفظ
					</button>
					<button onClick={() => setUnit({ ...unit, editContent: "" })}>
						مسح
					</button>
					<button onClick={() => props.cancel(unit.index)}>إلغاء</button>
					<button
						onClick={() => setUnit({ ...unit, editContent: unit.content })}
					>
						اعادة
					</button>
				</div>
			</div>
		);
	}
}
