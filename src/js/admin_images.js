/**
 * Created by bohai on 18/8/14.
 */
const binding = require('./bind.js');
const img_tpl = require('./template/admin/image.handlebars');
const title_tpl = require('./template/admin/image.title.handlebars');
const option_tpl = require('./template/admin/option.handlebars');
let { classifyGetAll, themeGetAll } = require('./api.js');
const colors = require('./colors.js');
module.exports = function () {
    let l1 = [];
    let l2 = [];
    let l3 = [];
    let themes = null;

    function bindClassify1 () {
        binding
            .loadHtml('#images-block--classify-1', l1, option_tpl)
            .bindEvent('#images-block--classify-1', 'change', function ($element) {
                let val = $element.val();

                bindClassify2(val);
                bindClassify3();
            });
    }

    function bindClassify2 (parentId) {
        let temp = [];

        l2.forEach((item) => {
            if (item.parentId === parentId) {
                temp.push(item);
            }
        });

        binding
            .loadHtml('#images-block--classify-2', temp, option_tpl)
            .bindEvent('#images-block--classify-2', 'change', function ($element) {
                let val = $element.val();

                bindClassify3(val);
            });
    }

    function bindClassify3 (parentId) {
        let temp = [];

        if (!parentId) {
            binding
                .loadHtml('#images-block--classify-3', temp, option_tpl);
            return;
        }

        l3.forEach((item) => {
            if (item.parentId === parentId) {
                temp.push(item);
            }
        });

        binding
            .loadHtml('#images-block--classify-3', temp, option_tpl)
            .bindEvent('#images-block--classify-3', 'change', function ($element) {
                let val = $element.val();

                console.log(val);
            });
    }

    function bindThemeName (list) {
        binding
            .loadHtml('#images-block--theme-name', list, option_tpl);
    }

    $('.add-image').unbind('click').on('click', function () {
        let key = parseInt(Math.random() * 1000000);
        binding.appendHtml('.px-block-group', {key}, img_tpl);
    });

    $(document).on('click', '.add-image-title', function () {
        let id = $(this).data('id');
        let key = parseInt(Math.random() * 1000000);
        binding.appendHtml('#' + id, {key}, title_tpl, function () {
            colors.init();
        });
    });

    $(document).on('click', '.del-image', function () {
        let id = $(this).data('id');
        $('#' + id).remove();
    });

    $(document).on('click', '.txt-block-del', function () {
        let id = $(this).data('id');
        $('#' + id).remove();
    });

    classifyGetAll().done((res) => {
        console.log(res);

        if (res.status === '200') {
            res.data.forEach((item) => {
                switch (item.parentId.length) {
                    case 0:
                        l1.push(item);
                        break;

                    case 1:
                        l2.push(item);
                        break;

                    case 3:
                        l3.push(item);
                        break;
                }
            });

            bindClassify1();
        }
    });

    themeGetAll().done((res) => {
        themes = res.data;

        console.log(res);

        binding
            .loadHtml('#images-block--theme-type', res.data, option_tpl)
            .bindEvent('#images-block--theme-type', 'change', function ($element) {
                let val = parseInt($element.val(), 10);

                bindThemeName(themes[val].child);
            });
    });

};