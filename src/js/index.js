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
    let promise, data;
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

    // let formatForm = function () {
    //     let forms = $('.title-option-form');
    //     let i, len;
    //
    //     //.serializeArray();
    //
    //     for (i = 0, len = forms.length; i < len; i++) {
    //         // console.log($(forms[i]).serializeArray());
    //     }
    // }

    let bindImgSize = function (element) {
        // let fileIndex = $('#fileNames').val();
        // let index = $(element).val();
        binding.loadHtml('#imgSize', data.size, size_tpl).bindEvent('#imgSize', 'change', bindTxtOption);
    }

    let createCanvas = function () {
        // let index = $('#fileNames').val();
        let indexs = getIndex();
        let $canvas = $('#autoADTXT');
        let context = $canvas[0].getContext('2d');
        let w = data.size[indexs.sizeIndex].w;
        let h = data.size[indexs.sizeIndex].h;

        let drawImage = new DrawImage('#autoADTXT', w, h, data, indexs.sizeIndex);

        drawImage.init();

        // formatForm();
    }

    let bindTxtOption = function (element) {
        // let index = $('#fileNames').val();
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
            data = require('./data/' + val + '.json');
            console.log(data);
            bindImgSize(element);
            bindTxtOption(element);
    });


    // promise = $.ajax({
    //     url: './js/json/list.json',
    //     type: 'GET',
    //     dataType: 'json'
    // });
    //
    // promise.done(function (res) {
    //     console.log(res);
    // });
});
