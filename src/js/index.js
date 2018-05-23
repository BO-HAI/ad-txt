require('normalize.css');
require('../sass/screen.scss');
const colors = require('./colors.js');
const filename_tpl = require('./template/filename.option.handlebars');
const size_tpl = require('./template/size.option.handlebars');
const title_tpl = require('./template/title.option.handlebars');
const illustration_tpl = require('./template/illustration.item.handlebars');
const binding = require('./bind.js');
const DrawImage = require('./drawImage.js');
const storage = require('./storage.js');
// const fileList = ['j_blue.jpg', 'j_purple.jpg'];
//
// fileList.forEach((item) => {
//     console.log(item);
//     require('../images/' + item);
// });
require('../images/j_blue.jpg');
require('../images/j_purple.jpg');
require('../images/j_red.jpg');
require('../images/k_blue.jpg');
require('../images/k_purple.jpg');
require('../images/k_orange.jpg');
require('../images/750_422_dotx2.png');
require('../images/750_422_dotx4.png');
require('../images/750_422_shadow_1.png');


// let debug = true;
// let host = debug ? './js/data/' : '/subject/0000/ad2/';
let host = './js/data/';

$(document).ready(function () {
    let promise;
    let data; // data 是页面编辑内容对象
    let illustration_data = []; // 被选择插图集合
    let scale = 1;

    /**
     * 清除插图
     * @param  {Number} index illustration_data 插图下标
     * @return {null}
     */
    let clearIllustration = function (index) {
        if (index < 0) {
            $('#illustrationNames').html('');
            illustration_data = [];
        } else {
            illustration_data.splice(index, 1);
        }

        binding.loadHtml('.illustration-list', illustration_data, illustration_tpl);
    }

    /**
     * 获取下拉框value
     * @return {Object}
     */
    let getIndex = function () {
        let fileNameValue = $('#fileNames').val();
        let imgSizeValue = $('#imgSize').val();
        return {
            sizeIndex: imgSizeValue ? imgSizeValue : 0,
            fileNameIndex: fileNameValue ? fileNameValue : 0
        }
    };

    /**
     * 比较插图对象，判读目标对象是否存在
     * @param  {Object} obj illustration对象
     * @return {Boolear}
     */
    let compareIllustrationData = function (obj) {
        let c = false;
        illustration_data.forEach((item) => {
            if (item.url === obj.url) {
                c = true;
                return c;
            }
        });

        return c;
    }

    /**
     * 用户输入数据赋值到对象，并执行绘制操作
     * @param  {Element} element 元素对象
     * @return {null}
     */
    let setData = function (element) {
        let $element = $(element);
        let indexs = getIndex();
        let titleIndex = $element.data('index');
        let name = $element.attr('name');
        storage.save($element.data('index'), $(element).val());

        if (name === 'x' || name === 'y') {
            data.size[indexs.sizeIndex].title[titleIndex][name] = $(element).val();
        } else {
            data.size[indexs.sizeIndex].title[titleIndex].txt[name] = $(element).val();
        }
        createCanvas();
    };

    /**
     * 绑定图片分辨率
     * @param  {Element} element 元素对象
     * @return {null}
     */
    let bindImgSize = function (element) {
        binding.loadHtml('#imgSize', data.size, size_tpl).bindEvent('#imgSize', 'change', function () {
            let indexs = getIndex();

            if (data.illustration) {
                bindIllustration(data.size[indexs.sizeIndex].w, data.size[indexs.sizeIndex].h);
            }

            bindTxtOption();
        });

    };

    /**
     * 绑定插图
     * @param  {Number} w 图片分辨率宽
     * @param  {Number} h 图片分辨率高
     * @return {null}
     */
    let bindIllustration = function (w, h) {
        $('#illustrationNames').attr('disabled', false);
        // illustration_data = null;
        /**
         * 配图列表按寄主分辨率区分
         */
        try {
            let illustration_list;
            let resList = $.ajax({
                url: host + 'illustration/' + w + '_' + h + '.json',
                type: 'GET',
                dataType: 'json'

            });

            resList.done(function (res) {
                illustration_list = res;
                binding
                .loadHtml('#illustrationNames', illustration_list, filename_tpl)
                .bindEvent('#illustrationNames', 'change', illustrationChange);
            });

            resList.fail(function () {
                console.error('illustration（配图）属性为true,但未找到相关json');
                $('#illustrationNames').attr('disabled', true);
            });
        } catch (e) {
            console.error('illustration（配图）属性为true,但未找到相关json');
            $('#illustrationNames').attr('disabled', true);
        } finally {

        }
    };

    /**
     * 创建画布，创建核心对象
     * @return {null}
     */
    let createCanvas = function () {
        let indexs = getIndex();
        let $canvas = $('#autoADTXT');
        let context = $canvas[0].getContext('2d');
        let w = data.size[indexs.sizeIndex].w;
        let h = data.size[indexs.sizeIndex].h;

        let drawImage = new DrawImage('#autoADTXT', w, h, data, illustration_data, indexs.sizeIndex);

        drawImage.init();
    };

    /**
     * 绑定文本选项html及事件
     * @param  {Element}  element
     * @param  {Boolean} [ignore=false]
     * @return {null}
     */
    let bindTxtOption = function (element, ignore = false) {
        let indexs = getIndex();
        binding.loadHtml('.option-block', data.size[indexs.sizeIndex].title, title_tpl)
            .bindEvent('.button', 'click', createCanvas)
            .bindEvent('input', 'keyup', setData).bindEvent('input', 'blur', setData)
            .bindEvent('.title-option-form select', 'change', setData);

        colors.init();
        createCanvas();
    };

    /**
     * 选择广告图
     * @param  {Element} element
     * @return {null}
     */
    let fileChange = function (element) {
        const val = $(element).val();
        let indexs = getIndex();
        clearIllustration(-1);
        // data = require('./data/' + val + '.json');

        let resList = $.ajax({
            url: host + val + '.json',
            type: 'GET',
            dataType: 'json'

        });

        resList.done(function (res) {
            data = res;

            if ($('#history').prop('checked')) {
                // 读取上一次输入的结果
                res.size.forEach((item) => {
                    item.title.forEach((item2, index) => {
                        item2.txt.value = storage.load(index);
                    });
                });
            }
            bindImgSize(element);
            bindTxtOption(element);
        });
    };

    /**
     * 选择插图
     * @param  {Element} element
     * @return {null}
     */
    let illustrationChange = function (element) {
        let $this = $(element);
        let val = $this.val();
        // illustration_data = null;
        if (val) {
            // illustration_data = require('./data/illustration/' + val + '.json');
            let resList = $.ajax({
                url: host + 'illustration/' + val + '.json',
                type: 'GET',
                dataType: 'json'
            });

            resList.done(function (res) {
                // 如果配图重复则跳过，不在重复添加
                if (!compareIllustrationData(res)) {
                    illustration_data.push(res);
                    binding.loadHtml('.illustration-list', illustration_data, illustration_tpl);
                }
                bindTxtOption();
            });
        } else {
            bindTxtOption();
        }
        // 这里解决两个问题
        // 1.配图选择后，要重复选择，必须先选择其他选项才能再次选择上一次选项
        // 2.重复渲染问题，半透明图层最突出，累加渲染导致不在透明
        $this.val('-1');
    };

    /**
     * 入口
     */
    let resList = $.ajax({
        url: host + 'list.json',
        type: 'GET',
        dataType: 'json'
    });

    resList.done(function (res) {
        binding.loadHtml('#fileNames', res, filename_tpl).bindEvent('#fileNames', 'change', fileChange);
    });

    resList.fail(function (e) {
        console.log(e);
    });

    /**
     * dom
     */
    $('.enlarge-canvas').on('click', () => {
        if (scale >= 1) {
            return;
        }

        scale += 0.1;
        $('#autoADTXT').css({
            'transform': 'scale(' + scale + ')',
            // 'margin-left': 7 * ((1 - scale) * 10) * -1 + '%'
        });
    });

    $('.narrow-canvas').on('click', () => {
        if (scale <= 0.1) {
            return;
        }

        scale -= 0.1;
        $('#autoADTXT').css({
            'transform': 'scale(' + scale + ')',
            // 'margin-left': 7 * ((1 - scale) * 10) * -1 + '%'
        });
    });

    $('.simulation-app').on('click', function () {
        let $block = $('.canvas-block');
        let $this = $(this);

        if ($block.hasClass('simulation')) {
            $block.removeClass('simulation');
            $this.text('ov');
            $this.attr('title', '打开虚拟环境');
        } else {
            $block.addClass('simulation');
            $this.text('cv');
            $this.attr('title', '关闭虚拟环境');
        }
    });

    $('.right100').on('click', function () {
        let $container = $('.container');
        if ($container.hasClass('r')) {
            $('.container').removeClass('r');
            $('.right100').text('R100');
            $('.right100').attr('title', '100%显示');
        } else {
            $('.container').addClass('r');
            $('.right100').text('R50');
            $('.right100').attr('title', '50%显示');
        }
    });

    $(document).on('click', '.illustration-list li .close', function () {
        let $this = $(this);
        let index = $this.data('index');
        clearIllustration(index);
        bindTxtOption();
    });
});
