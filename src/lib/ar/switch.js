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
	let emojis = [];
	for (let letter = 0, size = value.length; letter < size; letter++) {
		emojis = [arSwitch(value.charAt(letter), encoding),...emojis];
	}
	return emojis;
}
function arSwitch(letter, encoding) {
	switch (letter) {
		case "ا":
			return encoding[0];
		case "ب":
			return encoding[1];
		case "ت":
			return encoding[2];
		case "ث":
			return encoding[3];
		case "ج":
			return encoding[4];
		case "ح":
			return encoding[5];
		case "خ":
			return encoding[6];
		case "د":
			return encoding[7];
		case "ذ":
			return encoding[8];
		case "ر":
			return encoding[9];
		case "ز":
			return encoding[10];
		case "س":
			return encoding[11];
		case "ش":
			return encoding[12];
		case "ص":
			return encoding[13];
		case "ض":
			return encoding[14];
		case "ط":
			return encoding[15];
		case "ظ":
			return encoding[16];
		case "ع":
			return encoding[17];
		case "غ":
			return encoding[18];
		case "ف":
			return encoding[19];
		case "ق":
			return encoding[20];
		case "ك":
			return encoding[21];
		case "ل":
			return encoding[22];
		case "م":
			return encoding[23];
		case "ن":
			return encoding[24];
		case "ه":
			return encoding[25];
		case "و":
			return encoding[26];
		case "ي":
			return encoding[27];
		case "ة":
			return encoding[28];
		case "ى":
			return encoding[29];
		case "ؤ":
			return encoding[30];
		case "ء":
			return encoding[31];
		case "ئ":
			return encoding[32];
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
