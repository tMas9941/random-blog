export const textLimiterData = {
    Posts: { title: 250 },
    Users: { username: 20 },
    Profiles: { introduction: 300 },
    Comments: { content: 300 },
    Tags: { name: 20 },
};

export default function textLimiter(data, maxLength) {
    let limitedData;
    if (typeof data === "string") {
        limitedData = data.substr(0, maxLength);
    } else if (Array.isArray(data)) {
        limitedData = data.map((item) => item.substr(0, maxLength));
    }
    return limitedData;
}
