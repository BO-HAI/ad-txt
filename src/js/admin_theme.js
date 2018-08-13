/**
 * Created by bohai on 18/8/10.
 */

const binding = require('./bind.js');
const theme_tpl = require('./template/admin/theme.handlebars');
let { themeApi } = require('./api.js');
module.exports = function () {
    const IDS = ['a', 'b', 'c','d', 'e', 'f','g', 'h', 'i','j', 'k', 'l','m', 'n', 'o','p', 'q', 'r','s', 't', 'u','v', 'w', 'x','y', 'z'];
    let allPromise = $.ajax({
        url: themeApi().getAll,
        type: 'GET',
        dataType: 'jsonp'
    });

    allPromise.then(function (res) {
        binding.loadHtml('.theme-list', res.data, theme_tpl);
    });

    $('.add-img-theme').on('click', function () {
        let $block = $('.img-theme-group');

        let len = $block.find('.form-group').length;

        $block.append('<div class="form-group"> <label for="id">图片主题' + IDS[len] + ': </label> <input type="text"></div>');
    });
};