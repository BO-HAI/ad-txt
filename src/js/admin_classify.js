/**
 * Created by bohai on 18/8/9.
 */
const classify_tpl = require('./template/admin/classify.handlebars');
const binding = require('./bind.js');
let { classifyGetAll, classifyPostOne, classifyUpdateById, classifyDeleteById } = require('./api.js');
// import { classifyApi } from './api.js';

module.exports = function () {

    function getAllClassify () {
        let classifyPromise = classifyGetAll();

        classifyPromise.done(function (res) {
            // console.log(res);
            binding.loadHtml('.classify-block table tbody', res.data, classify_tpl);
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

        let data = {
            name, id, parentId, themeId,
            _method: 'PUT'
        };

        $that.attr("disabled", true);

        let classifyUpdatePromise = classifyUpdateById(key, data);

        classifyUpdatePromise.then(function (res) {
            if (res.status === '200') {
                binding.alert('success', '更新成功');
            } else {
                binding.alert('error', '更新失败了，信息未保存道数据库');
            }
        });

        classifyUpdatePromise.fail(function (err) {
            binding.alert('error', '更新请求失败');
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

        let classifyDeletePromise = classifyDeleteById(key);

        classifyDeletePromise.then(function (res) {
            if (res.status === '200') {
                binding.alert('success', '删除成功');
            } else {
                binding.alert('error', '删除失败');
            }

            getAllClassify();
        });

        classifyDeletePromise.fail(function () {
            binding.alert('error', '删除请求失败');
        });
    });

    // 添加分类
    $('.add-classify').unbind('click').on('click', function () {

        let id = $('.add-classify-form input[name="id"]').val();
        let name = $('.add-classify-form input[name="name"]').val();
        let parentId = $('.add-classify-form input[name="parentId"]').val();
        let themeId = $('.add-classify-form input[name="themeId"]').val();

        let postOnePromise = classifyPostOne({
            id,
            name,
            parentId,
            themeId
        });

        postOnePromise.then(function (res) {
            if (res.status === '200') {
                getAllClassify();
                binding.alert('success', '添加成功');
            } else {
                binding.alert('error', '添加失败');
            }
        });

        postOnePromise.fail(function (err) {
            binding.alert('error', '添加请求失败');
        });

    });
};