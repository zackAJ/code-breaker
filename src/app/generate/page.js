"use client";
import { useState, useEffect } from "react";
import { pToUnicode } from "@/lib/ar/switch";
import encoding from "@/lib/ar/encoding";
import Unit from "@/components/Unit";
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	PDFDownloadLink,
	Font,
	Image,
} from "@react-pdf/renderer/lib/react-pdf.browser.es.js";

import "@/app/style.css";

Font.registerEmojiSource({
	format: "png",
	url: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/",
});

const styles = StyleSheet.create({
	page: {
		display: "flex",
		flexDirection: "column",
		color: "#000000",
		width: "100vw",
	},
	letter: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-between",
		height: "60px",
	},
	dashes: {
		opacity: "0.2",
		marginTop: "5px",
	},
	image: {
		width: "24px",
	},
	unit: {
		width: "95%",
		display: "flex",
		flexWrap: "wrap",
		flexDirection: "row-reverse",
		marginBottom: "25px",
		marginHorizontal: "auto",
		border: "1px solid #186F65",
		borderRadius: "8px",
		padding: "8px",
		paddingTop: "25px",
		zIndex: "9",
		gap: "10px",
	},
	code: {
		color: "#186F65",
		fontSize: "20px",
		borderBottomLeftRadius: "0px",
		borderBottomRightRadius: "0px",
	},
	viewCode: {
		textAlign: "center",
		marginHorizontal: "auto",
		paddingHorizontal: "10px",
		marginBottom: "-10px",
		backgroundColor: "#ffffff",
		display: "flex",
		flexDirection: "row",
		flexWrap: "nowrap",
	},
	logo: {
		marginVertical: "2.5%",
		marginHorizontal: "auto",
		width: "100px",
	},
	newLine: {
		width: "100%",
		marginBottom: "20px",
	},
});

export default function Home() {
	"use client";
	const [prompt, setPrompt] = useState("");

	return (
		<div className="flex h-full w-full flex-col items-center justify-start gap-8 ">
			<Template />
		</div>
	);
}
function Template() {
	"use client";
	const Doc = () => (
		<Document dir="rtl">
			<Page size="A4" style={styles.page}>
				<Image style={styles.logo} src="/logo.png" alt="logo" />
				{page.units.map((unit, index) => {
					return (
						<>
							<View style={styles.viewCode}>
								<Text style={styles.code}>{unit.encoding + 1}</Text>{" "}
								<Image
									style={{ width: "35px", display: "inline" }}
									src="/tachfir.png"
								/>
							</View>
							<View key={`unit_${index}`} style={styles.unit}>
								{pToUnicode(unit.content.trim(), encoding[unit.encoding]).map(
                  (image, index) => {
										if (image.length > 2) {
											return (
												<View key={`image_${index}`}>
													<Image
														style={styles.image}
														src={`/emojis_min/${image}.png`}
														alt=""
													/>
													<Text
														style={styles.dashes}
														render={({ image }) =>
															image === " " ? "                  " : "- - -"
														}
													/>
												</View>
											);
										} else if (image == "~") {
											return (
												<Text style={styles.newLine} key={`text_${index}`} />
											);
										} else {
											return <Text key={`text_${index}`}>{image}</Text>;
										}
									}
								)}
							</View>
						</>
					);
				})}
			</Page>
		</Document>
	);
	const Download = () => (
		<PDFDownloadLink
			document={<Doc />}
			fileName="رسالة.pdf"
			className="p-2 rounded-md gradient-border"
		>
			{({ blob, url, loading, error }) => (loading ? "تحميل ..." : "تحميل PDF")}
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
		newUnits[index].content = newContent.trim();
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
	function handleOptionChange(index, value) {
		if (focusOnEdit()) return;
		let newUnits = [...page.units];
		newUnits[index].encoding = value;
		setPage({
			...page,
			units: newUnits,
		});
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
						onOptionChange={handleOptionChange}
					/>
				);
			})}
			<button onClick={() => createUnit()}>رسالة جديدة</button>
			<Download />
		</>
	);
}
