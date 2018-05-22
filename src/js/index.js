require('normalize.css');
require('../sass/screen.scss');
const colors = require('./colors.js');
const filename_tpl = require('./template/filename.option.handlebars');
const size_tpl = require('./template/size.option.handlebars');
const title_tpl = require('./template/title.option.handlebars');
const illustration_tpl = require('./template/illustration.item.handlebars');
const binding = require('./bind.js');
const DrawImage = require('./drawImage.js');
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


let debug = false;
let host = debug ? '/data/' : '/subject/0000/ad2/';

$(document).ready(function () {
    let promise;
    let data; // data 是页面编辑内容对象
    let illustration_data = []; // 被选择插图集合
    let scale = 1;

    let printIllustration = function (index) {
        if (index < 0) {
            $('#illustrationNames').html('');
            illustration_data = [];
            binding.loadHtml('.illustration-list', illustration_data, illustration_tpl);
        } else {
            illustration_data.splice(index, 1);
            binding.loadHtml('.illustration-list', illustration_data, illustration_tpl);
            bindTxtOption();
        }
    }

    let getIndex = function () {
        let value = $('#imgSize').val();
        return {
            sizeIndex: value ? value : 0
        }
    };

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

    let setData = function (element) {
        let indexs = getIndex();
        let titleIndex = $(element).data('index');
        let name = $(element).attr('name');

        if (name === 'x' || name === 'y') {
            data.size[indexs.sizeIndex].title[titleIndex][name] = $(element).val();
        } else {
            data.size[indexs.sizeIndex].title[titleIndex].txt[name] = $(element).val();
        }
        createCanvas();
    };

    let bindImgSize = function (element) {
        binding.loadHtml('#imgSize', data.size, size_tpl).bindEvent('#imgSize', 'change', function () {
            let indexs = getIndex();

            if (data.illustration) {
                bindIllustration(data.size[indexs.sizeIndex].w, data.size[indexs.sizeIndex].h);
            }

            bindTxtOption();
        });

    };

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

    let createCanvas = function () {
        let indexs = getIndex();
        let $canvas = $('#autoADTXT');
        let context = $canvas[0].getContext('2d');
        let w = data.size[indexs.sizeIndex].w;
        let h = data.size[indexs.sizeIndex].h;

        let drawImage = new DrawImage('#autoADTXT', w, h, data, illustration_data, indexs.sizeIndex);

        drawImage.init();
    };

    let bindTxtOption = function (element, ignore = false) {
        let indexs = getIndex();
        binding.loadHtml('.option-block', data.size[indexs.sizeIndex].title, title_tpl)
            .bindEvent('.button', 'click', createCanvas)
            .bindEvent('input', 'keyup', setData).bindEvent('input', 'blur', setData)
            .bindEvent('.title-option-form select', 'change', setData);

        colors.init();
        createCanvas();
    };

    let fileChange = function (element) {
        const val = $(element).val();
        let indexs = getIndex();
        printIllustration(-1);
        // data = require('./data/' + val + '.json');

        let resList = $.ajax({
            url: host + val + '.json',
            type: 'GET',
            dataType: 'json'

        });

        resList.done(function (res) {
            data = res;
            bindImgSize(element);
            // if (data.illustration) {
            //     bindIllustration(data.size[indexs.sizeIndex].w, data.size[indexs.sizeIndex].h);
            // }
            bindTxtOption(element);
        });
    };

    let illustrationChange = function (element) {
        let val = $(element).val();
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
    };

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
        printIllustration(index);
    });
});
