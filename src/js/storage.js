class storage {
    static save (key, value) {
        localStorage.setItem(key, value);
    }

    static load (key) {
        let val = localStorage.getItem(key);
        return val ? val : '';
    }
}

module.exports = storage;
