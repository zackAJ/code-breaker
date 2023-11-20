function shuffle(array){
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};
function toEmoji(unicode) {
	return String.fromCodePoint("0x" + unicode);
}
function pToEmoji(value, encoding) {
	let emojis = "";
	for (let letter = 0, size = value.length; letter < size; letter++) {
		emojis += arSwitch(value.charAt(letter), encoding);
	}
	console.log(emojis);
	return emojis;
}
function arSwitch(letter, encoding) {
	switch (letter) {
		case "ا":
			return toEmoji(encoding[0]);
		case "ب":
			return toEmoji(encoding[1]);
		case "ت":
			return toEmoji(encoding[2]);
		case "ث":
			return toEmoji(encoding[3]);
		case "ج":
			return toEmoji(encoding[4]);
		case "ح":
			return toEmoji(encoding[5]);
		case "خ":
			return toEmoji(encoding[6]);
		case "د":
			return toEmoji(encoding[7]);
		case "ذ":
			return toEmoji(encoding[8]);
		case "ر":
			return toEmoji(encoding[9]);
		case "ز":
			return toEmoji(encoding[10]);
		case "س":
			return toEmoji(encoding[11]);
		case "ش":
			return toEmoji(encoding[12]);
		case "ص":
			return toEmoji(encoding[13]);
		case "ض":
			return toEmoji(encoding[14]);
		case "ط":
			return toEmoji(encoding[15]);
		case "ظ":
			return toEmoji(encoding[16]);
		case "ع":
			return toEmoji(encoding[17]);
		case "غ":
			return toEmoji(encoding[18]);
		case "ف":
			return toEmoji(encoding[19]);
		case "ق":
			return toEmoji(encoding[20]);
		case "ك":
			return toEmoji(encoding[21]);
		case "ل":
			return toEmoji(encoding[22]);
		case "م":
			return toEmoji(encoding[23]);
		case "ن":
			return toEmoji(encoding[24]);
		case "ه":
			return toEmoji(encoding[25]);
		case "و":
			return toEmoji(encoding[26]);
		case "ي":
			return toEmoji(encoding[27]);
		case "ة":
			return toEmoji(encoding[28]);
		case "ى":
			return toEmoji(encoding[29]);
		case "ؤ":
			return toEmoji(encoding[30]);
		case "ء":
			return toEmoji(encoding[31]);
		case "ئ":
			return toEmoji(encoding[32]);
		case " ":
			return "     ";
		case "\n":
			return "\n";
		default:
			return letter;
	}
}
export default arSwitch;
export { arSwitch, toEmoji, pToEmoji };
