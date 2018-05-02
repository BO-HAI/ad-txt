require('normalize.css');
require('../sass/screen.scss');
const colors = require('./colors.js');
const Handlebars = require('handlebars/dist/handlebars.js');
const filename_tpl = require('./template/filename.option.handlebars');
const size_tpl = require('./template/size.option.handlebars');
const title_tpl = require('./template/title.option.handlebars');
// const data = require('./data.js');
const binding = require('./bind.js');
const DrawImage = require('./drawImage.js');
const list = require('./data/list.json');

$(document).ready(function () {
    let promise;
    let data;
    let illustrationData;
    let scale = 1;

    let getIndex = function () {
        return {
            sizeIndex: $('#imgSize').val() ? $('#imgSize').val() : 0
        }
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
    }

    let bindImgSize = function (element) {
        binding.loadHtml('#imgSize', data.size, size_tpl).bindEvent('#imgSize', 'change', function () {
            let indexs = getIndex();
            bindIllustration(data.size[indexs.sizeIndex].w, data.size[indexs.sizeIndex].h);
            bindTxtOption();
        });

    }

    let bindIllustration = function (w, h) {
        $('#illustrationNames').attr('disabled', false);
        /**
         * 配图列表按寄主分辨率区分
         */
        try {
            const illustration_list = require('./data/illustration/' + w + '_' + h + '.json');
            binding.loadHtml('#illustrationNames', illustration_list, filename_tpl).bindEvent('#illustrationNames', 'change', function (element) {
                    let val = $(element).val();
                    illustrationData = null;
                    if (val) {
                        illustrationData = require('./data/illustration/' + val + '.json');
                    }

                    bindTxtOption();
            });
        } catch (e) {
            console.error('illustration（配图）属性为true,但未找到相关json');
            $('#illustrationNames').attr('disabled', true);
        } finally {

        }


    }

    let unbindIllustration = function () {
        $('#illustrationNames').attr('disabled', true);
        binding.loadHtml('#illustrationNames', [], filename_tpl);
    }

    let createCanvas = function () {
        let indexs = getIndex();
        let $canvas = $('#autoADTXT');
        let context = $canvas[0].getContext('2d');
        let w = data.size[indexs.sizeIndex].w;
        let h = data.size[indexs.sizeIndex].h;

        let drawImage = new DrawImage('#autoADTXT', w, h, data, illustrationData, indexs.sizeIndex);

        drawImage.init();
    }

    let bindTxtOption = function (element, ignore = false) {
        let indexs = getIndex();
        binding.loadHtml('.option-block', data.size[indexs.sizeIndex].title, title_tpl)
            .bindEvent('.button', 'click', createCanvas)
            .bindEvent('input', 'keyup', setData).bindEvent('input', 'blur', setData)
            .bindEvent('.title-option-form select', 'change', setData);

        colors.init();
        createCanvas();
    }

    binding.loadHtml('#fileNames', list, filename_tpl).bindEvent('#fileNames', 'change', function (element) {
            const val = $(element).val();
            let indexs = getIndex();
            data = require('./data/' + val + '.json');
            bindImgSize(element);
            if (data.illustration) {
                bindIllustration(data.size[indexs.sizeIndex].w, data.size[indexs.sizeIndex].h);
            }
            bindTxtOption(element);
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
