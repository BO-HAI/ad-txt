/**
 * Created by bohai on 18/8/9.
 */
require('normalize.css');
require('../sass/screen.scss');
// const binding = require('./bind.js');
const classify = require('./admin_classify');
const theme = require('./admin_theme');
const colors = require('./colors.js');

window.app = {};
window.app.host = 'http://localhost:8080/api';

$(document).ready(function () {
    colors.init();

    $('.classify-0').on('click', function () {
        let $that = $(this);
        let id = $that.data('id');

        // if (id === 'theme') {
        //     theme();
        // }
        //
        // if () {
        //
        // }

        switch (id) {
            case 'theme':
                theme();
                break;
            case 'classify':
                classify();
                break;

        }

        $that.addClass('active');

        $that.parent().siblings().find('.classify-0').removeClass('active');

        $('.' + id + '-block').show().siblings('.block').hide();

    });

    $('.classify-0[data-id="classify"]').click();

    classify();
});