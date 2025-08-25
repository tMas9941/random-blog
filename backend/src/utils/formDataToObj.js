export default function formDataToObj(formData) {
	try {
		const newObj = JSON.stringify(formData.forEach((value, key) => (object[key] = value)));
		return newObj;
	} catch (error) {
		throw error;
	}
}
