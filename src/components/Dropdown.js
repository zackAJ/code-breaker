import React, { useState } from "react";

const Dropdown = ({ options, onOptionChange,value }) => {
	// const [selectedCode, setSelectedCode] = useState("Code 1");
	const handleOptionChange = (e) => {
		const selectedValue = e.target.value;
		onOptionChange(selectedValue);
	};
	return (
		<div className="gradient-border">
			<select
				id="dropdown"
				value={value}
				className="text-[#186F65] bg-transparent cursor-pointer rounded-md"
				onChange={handleOptionChange}
			>
				{options.map((option, index) => (
					<option
						key={index}
						value={option.value}
						className="border  bg-black  cursor-pointer"
					>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Dropdown;
