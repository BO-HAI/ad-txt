require('normalize.css');
require('../sass/screen.scss');
const colors = require('./colors.js');
const Handlebars = require('handlebars/dist/handlebars.js');
const filename_tpl = require('./template/filename.option.handlebars');
const size_tpl = require('./template/size.option.handlebars');
const title_tpl = require('./template/title.option.handlebars');
const data = require('./data.js');
const binding = require('./bind.js');
const DrawImage = require('./drawImage.js');

$(document).ready(function () {
    let getIndex = function () {
        return {
            fileIndex: $('#fileNames').val(),
            sizeIndex: $('#imgSize').val() ? $('#imgSize').val() : 0
        }
    }

    let setData = function (element) {
        let indexs = getIndex();
        let titleIndex = $(element).data('index');
        let name = $(element).attr('name');

        if (name === 'x' || name === 'y') {
            data[indexs.fileIndex].size[indexs.sizeIndex].title[titleIndex][name] = $(element).val();
        } else {
            data[indexs.fileIndex].size[indexs.sizeIndex].title[titleIndex].txt[name] = $(element).val();
        }


        console.log(name);
        createCanvas();
    }

    let formatForm = function () {
        let forms = $('.title-option-form');
        let i, len;

        //.serializeArray();

        for (i = 0, len = forms.length; i < len; i++) {
            // console.log($(forms[i]).serializeArray());
        }
    }

    let bindImgSize = function (element) {
        let fileIndex = $('#fileNames').val();
        let index = $(element).val();
        binding.loadHtml('#imgSize', data[fileIndex].size, size_tpl).bindEvent('#imgSize', 'change', bindTxtOption);
    }

    let createCanvas = function () {
        let index = $('#fileNames').val();
        let imgSizeIndex = $('#imgSize').val() ? $('#imgSize').val() : 0;
        let $canvas = $('#autoADTXT');
        let context = $canvas[0].getContext('2d');
        let w = data[index].size[imgSizeIndex].w;
        let h = data[index].size[imgSizeIndex].h;

        let drawImage = new DrawImage('#autoADTXT', w, h, data[index], imgSizeIndex);

        drawImage.init();

        formatForm();
    }

    let bindTxtOption = function (element) {
        let index = $('#fileNames').val();
        let imgSizeIndex = $('#imgSize').val() ? $('#imgSize').val() : 0;

        binding.loadHtml('.option-block', data[index].size[imgSizeIndex].title, title_tpl)
            .bindEvent('.button', 'click', createCanvas)
            .bindEvent('input', 'keyup', setData).bindEvent('input', 'blur', setData)
            .bindEvent('.title-option-form select', 'change', setData);


        colors.init();
        createCanvas();
    }

    binding.loadHtml('#fileNames', data, filename_tpl).bindEvent('#fileNames', 'change', function (element) {
            bindImgSize(element);
            bindTxtOption(element);
    });
});
