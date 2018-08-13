/**
 * Created by bohai on 18/8/9.
 */
const classify_tpl = require('./template/admin/classify.handlebars');
const binding = require('./bind.js');
let { classifyApi } = require('./api.js');
// import { classifyApi } from './api.js';

module.exports = function () {

    function getAllClassify () {
        let classifyPromise = $.ajax({
            url: classifyApi().getAll,
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
        let themeId = $($inputs[3]).val();

        let obj = {
            name, id, parentId, themeId,
            _method: 'PUT'
        };

        $that.attr("disabled", true);

        $.ajax({
            url: classifyApi(key).update,
            type: 'PUT',
            dataType: 'json',
            data: obj
        });

    });

    // 删除操作
    $(document).on('click', '.classify-block table .delete-button', function () {
        let id = $(this).data('id');
        $('#' + id).addClass('delete-option').css({
            'background': '#FFC107'
        }).find('input').css({
            'background': '#FFC107'
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
            url: classifyApi(key).delete,
            type: 'DELETE',
            dataType: 'json',
            success: function (res) {

                if (res.status === '200') {
                    getAllClassify();
                    binding.alert('success', '删除成功');
                } else {
                    binding.alert('error', '删除失败');
                }

            },
            error: function () {
                binding.alert('error', '请求失败');
            }
        });
    });

    // 添加分类
    $('.add-classify').on('click', function () {

        let id = $('.add-classify-form input[name="id"]').val();
        let name = $('.add-classify-form input[name="name"]').val();
        let parentId = $('.add-classify-form input[name="parentId"]').val();
        let themeId = $('.add-classify-form input[name="themeId"]').val();

        $.ajax({
            url: classifyApi().postOne,
            type: 'POST',
            dataType: 'json',
            data: {
                id,
                name,
                parentId,
                themeId
            },
            success: function (res) {

                if (res.status === '200') {
                    getAllClassify();
                    binding.alert('success', '添加成功');
                } else {
                    binding.alert('error', '添加失败');
                }
            },
            error: function (err) {
                binding.alert('error', '请求失败');
            }
        });
    });
};