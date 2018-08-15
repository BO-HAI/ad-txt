/**
 * Created by bohai on 18/8/10.
 */

const binding = require('./bind.js');
const theme_tpl = require('./template/admin/theme.handlebars');
let { themeApi, themeGetAll, themePostOne, themeUpdateById, themeDeleteById } = require('./api.js');
module.exports = function () {
    const IDS = ['a', 'b', 'c','d', 'e', 'f','g', 'h', 'i','j', 'k', 'l','m', 'n', 'o','p', 'q', 'r','s', 't', 'u','v', 'w', 'x','y', 'z'];

    function getAllTheme () {
        let allPromise = themeGetAll();

        allPromise.then(function (res) {
            binding.loadHtml('.theme-list', res.data, theme_tpl);
        });
    }

    getAllTheme();

    // 添加一个图片主题表单元素
    $('.add-img-theme').unbind('click').on('click', function () {
        let $block = $('.img-theme-group');

        let len = $block.find('.form-group').length;

        $block.append('<div class="form-group"> <label for="id">图片主题' + IDS[len] + ': </label> <input type="text" id="theme-img-' + IDS[len] + '" data-id="' + IDS[len] + '"></div>');
    });

    // 添加主题
    $('.add-theme').unbind('click').on('click', function () {
        let child = [];

        let id = $('#theme-id').val();
        let name = $('#theme-name').val();

        let $imgThemes = $('.img-theme-group .form-group');

        let x = 0;
        let len = $imgThemes.length;

        for (x, len; x < len; x++) {
            let $item = $($imgThemes[x]);

            let $input = $item.find('input');

            let id = $input.data('id');

            let name = $input.val();

            child.push({
                id, name
            });
        }

        child = JSON.stringify(child);

        let data = {
            name,
            id,
            child
        };

        let postOnePromise = themePostOne(data);

        postOnePromise.then(function (res) {
            if (res.status === '200') {
                binding.alert('success', '添加成功');
                getAllTheme();
            } else {
                binding.alert('error', '添加失败');
            }
        });

    });

    // 删除主题
    $(document).on('click', '.theme--delete', function () {
        let id = $(this).data('id');

        let deletePromise = themeDeleteById(id);

        deletePromise.then(function (res) {
            if (res.status === '200') {
                getAllTheme();
                binding.alert('success', '删除成功');
            } else {
                binding.alert('error', '删除失败');
            }
        });

    });
};