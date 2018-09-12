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
    let imageData = {}; // 图片数据
    let imageData_size = []; // imageData.size属性
    let path_themeName = '';
    let path_classifyId = '';
    let path_fileName = '';

    /**
     * 数据封装
     */
    function dataEncapsulation () {
        let data = $('#images-form').serializeArray();
        let name = data[0].value;
        // let url = data[1].value;
        let illustration = data[1].value;
        let describe = data[2].value;
        let url = $('#image_file_Url').val();
        let size = [];

        console.log(data);

        illustration =  illustration === '1';

        imageData = {
            name, url, illustration, describe, size
        };

        // console.log(imageData);

        return JSON.stringify(imageData);
    }

    function setImgPath (themeName, classifyId, fileName) {
        let imgPath = `./images/theme/${themeName}/${classifyId}/${fileName}`;
        $('#image_file_Url').attr('value', imgPath);
    }

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
                path_classifyId = $element.val();
                setImgPath(path_themeName, path_classifyId, path_fileName);
            });
    }

    function bindThemeName (list) {
        binding
            .loadHtml('#images-block--theme-name', list, option_tpl)
            .bindEvent('#images-block--theme-name', 'change', function ($element) {
                path_themeName = $element.val();
                setImgPath(path_themeName, path_classifyId, path_fileName);
            });
    }

    /**
     * 添加一个图片对象
     */
    $('.add-image').unbind('click').on('click', function () {
        let key = parseInt(Math.random() * 1000000);
        binding.appendHtml('.px-block-group', {key}, img_tpl);
    });

    /**
     * 添加一个图片标题
     */
    $(document).on('click', '.add-image-title', function () {
        let id = $(this).data('key');
        let size = $('#' + id + '-form').serializeArray();
        let key = size[0].value + '_' + size[1].value;
        //
        if (key.replace('_', '') === '') {
            alert('请输入图片分辨率');
            return;
        }
        //
        // imageData_size.push({
        //     w: size[0].value,
        //     h: size[1].value,
        //     title: []
        // });

        binding.appendHtml('#px-block-' + id, {key}, title_tpl, function () {
            colors.init();
        });
    });

    /**
     * 删除图片
     */
    $(document).on('click', '.del-image', function () {
        let id = $(this).data('key');
        $('#px-block-' + id).remove();
    });

    /**
     * 装载图片
     */
    $(document).on('click', '.inster-image', function () {
        let id = $(this).data('key');
        let size = $('#' + id + '-form').serializeArray();
        let $forms = $('#px-block-' + id).find('.txt-block form');
        let titles = [];

        let key = size[0].value + '_' + size[1].value;

        if (key.replace('_', '') === '') {
            alert('请输入图片分辨率');
            return;
        }

        // $forms.forEach((item) => {
        //     imageData_size[0].title.push($(item).serializeArray());
        // });

        for (let i = 0, len = $forms.length; i < len; i++) {
            let arr = $($forms[i]).serializeArray();
            let obj = {
                txt: {
                    label: arr[0].value,
                    placeholder: arr[1].value,
                    befor: arr[2].value,
                    after: arr[3].value,
                    maxLen: arr[4].value,
                    minLen: arr[5].value,
                    fontSize: arr[6].value,
                    fontFamily: arr[7].value,
                    fontColor: arr[8].value,
                    spacing: arr[9].value
                },
                x: arr[10].value,
                y: arr[11].value,
                controlFont: {
                    size: arr[12].value,
                    color: arr[13].value,
                    family: arr[14].value
                },
                controlCoordinate: {
                    x: arr[15].value,
                    y: arr[16].value
                }
            };
            titles.push(obj);
        }

        imageData_size.push({
            w: size[0].value,
            h: size[1].value,
            title: titles
        });

        console.log(imageData_size);
    });

    /**
     * 删除一个图片标题
     */
    $(document).on('click', '.txt-block-del', function () {
        let id = $(this).data('key');
        $('#' + id).remove();
    });



    $('#image_file_name').keyup(function (key) {
        let $this = $(this);
        path_fileName = $this.val();
        setImgPath(path_themeName, path_classifyId, path_fileName);
    });

    $('#image-save-button').on('click', function () {
        let json = dataEncapsulation();
    });

    classifyGetAll().done((res) => {
        // console.log(res);

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

        // console.log(res);

        binding
            .loadHtml('#images-block--theme-type', res.data, option_tpl)
            .bindEvent('#images-block--theme-type', 'change', function ($element) {
                let val = parseInt($element.val(), 10);

                bindThemeName(themes[val].child);
            });
    });

};