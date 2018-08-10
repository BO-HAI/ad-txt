/**
 * Created by bohai on 18/8/9.
 */
const classify_tpl = require('./template/admin/classify.handlebars');

module.exports = function (host, binding) {

    function getAllClassify () {
        let classifyPromise = $.ajax({
            url: host + '/classify/list',
            type: 'GET',
            dataType: 'jsonp'
        });

        classifyPromise.done(function (res) {
            console.log(res);
            binding.loadHtml('tbody', res.data, classify_tpl);
        });
    }

    getAllClassify();

    $(document).on('dblclick', '.classify-block table input', function () {
        let $that = $(this);
        // let $input = $that.find('input');

        $that.attr("disabled", false);

    });

    $(document).on('blur', '.classify-block table input', function () {
        let $that = $(this);
        // let $input = $that.find('input');
        let key = $that.parent().parent().attr('id');

        let $inputs = $('#' + key).find('input');
        let name = $($inputs[0]).val();
        let id = $($inputs[1]).val();
        let parentId = $($inputs[2]).val();

        let obj = {
            name, id, parentId,
            _method: 'PUT'
        };

        $that.attr("disabled", true);

        $.ajax({
            url: host + '/classify/' + key,
            type: 'PUT',
            dataType: 'json',
            data: obj
        });

    });

    // 删除操作
    $(document).on('click', '.classify-block table .delete-button', function () {
        let id = $(this).data('id');
        $('#' + id).addClass('delete-option').css({
            'background': '#ffb55f'
        }).find('input').css({
            'background': '#ffb55f'
        });
    });

    // 停止删除
    $(document).on('click', '.no-button', function () {
        let id = $(this).data('id');
        $('#' + id).removeClass('delete-option').css({
            'background': '#ffffff'
        }).find('input').css({
            'background': '#ffffff'
        });
    });

    // 确认删除
    $(document).on('click', '.yes-button', function () {
        let key = $(this).data('id');
        $.ajax({
            url: host + '/classify/' + key,
            type: 'DELETE',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                getAllClassify();
            }
        });
    });

    // 添加分类
    $('.add-classify').on('click', function () {

        let id = $('input[name="id"]').val();
        let name = $('input[name="name"]').val();
        let parentId = $('input[name="parentId"]').val();

        $.ajax({
            url: host + '/classify',
            type: 'POST',
            dataType: 'json',
            data: {
                id,
                name,
                parentId
            },
            success: function (res) {
                console.log(res);
                getAllClassify();
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
};