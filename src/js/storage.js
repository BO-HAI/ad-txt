class storage {
    static save (key, value) {
        localStorage.setItem(key, value);
    }

    static load (key) {
        return localStorage.getItem(key);
    }
}

module.exports = storage;
