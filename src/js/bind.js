class binding {
    constructor () {
        // this.$element = $('#fileNames');
    }

    static loadHtml (select, data, template, fn) {
        let $element = $(select);
        let html = template({data});
        $element.html('').html(html);
        if (fn) {
            fn();
        }
        return this;
    }

    static bindEvent (select, event, fn, callback) {
        let $element = $(select);
        $element.unbind(event).on(event, function () {
            let $this = $(this);
            fn($this);
        });

        if (callback) {
            callback($element);
        }
        return this;
    }
}

module.exports = binding;
