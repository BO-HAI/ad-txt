module.exports = function (data) {
    let v = true
    data.title.forEach((item) => {
        let len = item.txt.value.length;
        let max = item.txt.maxLen;
        let min = item.txt.minLen;
        if (len > max || len < min) {
            v = false;
        }
    })
    return v;
}
