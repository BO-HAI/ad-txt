/**
 * Created by bohai on 18/8/9.
 */
require('normalize.css');
require('../sass/screen.scss');
const binding = require('./bind.js');
const host = 'http://localhost:8080/api';
const classify = require('./admin_classify');

$(document).ready(function () {

    $('.classify-0').on('click', function () {
        let $that = $(this);
        let id = $that.data('id');

        $that.addClass('active');

        $that.parent().siblings().find('.classify-0').removeClass('active');

        $('.' + id + '-block').show().siblings('.block').hide();

    });

    $('.classify-0[data-id="classify"]').click();

    classify(host, binding);
});