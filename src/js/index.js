require('normalize.css');
require('../sass/screen.scss');
const colors = require('./colors.js');
const filename_tpl = require('./template/filename.option.handlebars');
const size_tpl = require('./template/size.option.handlebars');
const title_tpl = require('./template/title.option.handlebars');
const binding = require('./bind.js');
const DrawImage = require('./drawImage.js');

// require('./data/list.json');
// require('./data/0.json');
// require('./data/1.json');
// require('./data/2.json');
// require('./data/illustration/1000_234.json');
// require('./data/illustration/1920_450.json');
// require('./data/illustration/lijuan_1000.json');
// require('./data/illustration/lijuan_1920.json');
// require('./data/illustration/wanglili_1920.json');

require('../images/a.jpg');
require('../images/b.jpg');
require('../images/c.jpg');
// // const Handlebars = require('handlebars/dist/handlebars.js');

let debug = true;
let host = debug ? '/data/' : '/subject/0000/ad2/';

$(document).ready(function () {
    let promise;
    let data;
    let illustration_data;
    let scale = 1;

    let getIndex = function () {
        let value = $('#imgSize').val();
        return {
            sizeIndex: value ? value : 0
        }
    };

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

            bindIllustration(data.size[indexs.sizeIndex].w, data.size[indexs.sizeIndex].h);
            bindTxtOption();
        });

    };

    let bindIllustration = function (w, h) {
        $('#illustrationNames').attr('disabled', false);
        illustration_data = null;
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

    // let unbindIllustration = function () {
    //     $('#illustrationNames').attr('disabled', true);
    //     binding.loadHtml('#illustrationNames', [], filename_tpl);
    // };

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
        // data = require('./data/' + val + '.json');

        let resList = $.ajax({
            url: host + val + '.json',
            type: 'GET',
            dataType: 'json'

        });

        resList.done(function (res) {
            data = res;
            bindImgSize(element);
            if (data.illustration) {
                bindIllustration(data.size[indexs.sizeIndex].w, data.size[indexs.sizeIndex].h);
            }
            bindTxtOption(element);
        });
    };

    let illustrationChange = function (element) {
        let val = $(element).val();
        illustration_data = null;
        if (val) {
            // illustration_data = require('./data/illustration/' + val + '.json');
            let resList = $.ajax({
                url: host + 'illustration/' + val + '.json',
                type: 'GET',
                dataType: 'json'
            });

            resList.done(function (res) {
                illustration_data = res;
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
    })
});
