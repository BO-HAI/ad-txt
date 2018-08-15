/**
 * Created by bohai on 18/8/14.
 */
const binding = require('./bind.js');
const img_tpl = require('./template/admin/image.handlebars');
const title_tpl = require('./template/admin/image.title.handlebars');
let { classifyApi } = require('./api.js');
module.exports = function () {

    $('.add-image').unbind('click').on('click', function () {
        let key = parseInt(Math.random() * 1000000);
        binding.appendHtml('.px-block-group', {key}, img_tpl);
    });

    $(document).on('click', '.add-image-title', function () {
        let id = $(this).data('id');
        let key = parseInt(Math.random() * 1000000);
        binding.appendHtml('#' + id, {key}, title_tpl);
    });

    $(document).on('click', '.del-image', function () {
        let id = $(this).data('id');
        $('#' + id).remove();
    });

    $(document).on('click', '.txt-block-del', function () {
        let id = $(this).data('id');
        $('#' + id).remove();
    });
};