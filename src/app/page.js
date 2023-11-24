"use client";
import { useState, useEffect } from "react";
import { pToEmoji } from "../lib/ar/switch";
import encoding from "../lib/ar/encoding";
import Unit from "@/components/Unit";
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	PDFDownloadLink,
  Font,
  Image
} from "@react-pdf/renderer";
import "./style.css";

Font.registerEmojiSource({
	format: "png",
	url: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/",
});

const styles = StyleSheet.create({
	page: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#E4E4E4",
		color: "#000000",
    width: "100%",
  },
  image: {
    width:"20px"
  }
});

export default function Home() {
	const [prompt, setPrompt] = useState("");

	return (
		<main className="flex min-h-screen flex-col items-center justify-start gap-8 p-6">
			<Template />
		</main>
	);
}
function Template() {
	const Doc = () => (
		<Document>
			<Page size="A4" style={styles.page}>
        <View >
				{page.units.map((unit, index) => {
					return (
            <Image
                key="unit.content"
								style={styles.image}
                src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f004.png"
                alt="hi"
							/>
              );
            })}
            </View>
			</Page>
		</Document>
	);
	const Download = () => (
		<PDFDownloadLink document={<Doc />} fileName="generated.pdf">
			{({ blob, url, loading, error }) =>
				loading ? "Loading document..." : "Download PDF"
			}
		</PDFDownloadLink>
	);

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
	useEffect(() => {
		focusOnEdit();
	});
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
			<Download />
		</>
	);
}
