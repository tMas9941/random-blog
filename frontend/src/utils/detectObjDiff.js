export default function detectObjDiff(oldData, newData) {
    let changes = {};
    for (let item in newData) {
        if (oldData[item] !== newData[item]) changes[item] = newData[item];
    }
    return changes;
}
