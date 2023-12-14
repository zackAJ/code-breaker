"use client";
import { pdfjs, Document, Page } from "react-pdf";
import { useState,useEffect } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.js",
	import.meta.url
).toString();
export default function Pages() {
  useEffect(() => {
		window.addEventListener("resize", () => setPdfWidth(getWidth()));
	});
	const [numPages, setNumPages] = useState(5);
	const [pdfWidth, setPdfWidth] = useState(300);
	function getWidth() {
		let width = document.getElementsByTagName("main")[0]?.offsetWidth;
		return Math.min(500, width - 50);
	}
	function onDocumentLoadSuccess() {
		setNumPages(numPages);

		const firstPageWidth = getWidth();

		if (firstPageWidth) {
			setPdfWidth(firstPageWidth);
		}
	}
	return (
		<div className="w-full max-w-fit h-full">
			<div dir="rtl" className="w-full flex justify-center mb-2">
				<a
					href="/files/all.pdf"
					download
					className={`p-1 !rounded-md gradient-border`}
				>
					تحميل
				</a>
			</div>
			<Document
				className="w-full"
				file="/files/all.pdf"
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page width={pdfWidth} pageNumber={1} />
			</Document>
		</div>
	);
}
