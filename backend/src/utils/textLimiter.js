export const textLimiterData = {
    Posts: { title: 250 },
    Users: { username: 20 },
    Profiles: { introduction: 300 },
    Comments: { content: 300 },
    Tags: { name: 20 },
};

export default function textLimiter(data, maxLength = 0, model) {
    let limitedData = {};
    if (model in textLimiterData) {
        // limit the values of an object basaed on textLimiterData
        const entries = Object.entries(data);
        for (let entry of entries) {
            if (entry[0] in textLimiterData[model]) {
                limitedData[entry[0]] = entry[1].substr(0, textLimiterData[model][entry[0]]);
            } else {
                limitedData[entry[0]] = entry[1];
            }
        }
    } else if (typeof data === "string") {
        limitedData = data.substr(0, maxLength);
    } else if (Array.isArray(data)) {
        limitedData = data.map((item) => item.substr(0, maxLength));
    }
    console.log({ limitedData });
    return limitedData;
}
