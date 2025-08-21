export default function objToFormData(obj) {
	const formData = new FormData();
	Object.entries(obj).forEach((item) => formData.append(...item));
	return formData;
}
