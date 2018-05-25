class binding {
    constructor () {
        // this.$element = $('#fileNames');
    }

    static loadHtml (select, data, template) {
        let $element = $(select);
        let html = template({data});
        $element.html('').html(html);

        return this;
    }

    static bindEvent (select , event, callback) {
        let $element = $(select);
        $element.on(event, function () {
            let $this = $(this);
            callback($this);
        });

        return this;
    }
}

module.exports = binding;
