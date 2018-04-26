
const title_tpl = require('./template/title.option.handlebars');

class FileNameSelect {
    constructor () {
        // this.$element = $('#fileNames');
    }

    static loadHtml (data) {
        const filename_tpl = require('./template/filename.option.handlebars');
        let $element = $('#fileNames');
        let html = filename_tpl({data});
        $element.html(html);

        return this;
    }

    static bindEvent (event, callback) {
        let $element = $('#fileNames');
        $element[event](function (event) {
            callback(this, event);
        });

        return this;
    }
}



module.exports = {
    FileNameSelect
};
