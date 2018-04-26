module.exports = {
    bgSelect: function (callback) {
        $('#fileNames').change(function (event) {
            callback(this, event);
        });
    }
}
