export default async function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
}
