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

    static alert (type, txt, auto) {
        let $alert = $('.alert');
        $alert.addClass('alert-' + type);
        $alert.find('h1').text(txt);
        $alert.addClass('show');

        setTimeout(function () {
            $alert.removeClass('show');
        }, 3000);
    }
}

module.exports = binding;
