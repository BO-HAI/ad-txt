require('normalize.css');
require('../sass/screen.scss');
const colors = require('./colors.js');
const Handlebars = require('handlebars/dist/handlebars.js');
const filename_tpl = require('./template/filename.option.handlebars');
const size_tpl = require('./template/size.option.handlebars');
const title_tpl = require('./template/title.option.handlebars');
const data = require('./data.js');
const binding = require('./bind.js');
// function bindBgSelect (template, data) {
//     let html = template({data});
//     $('#fileNames').html(html);
// }

$(document).ready(function () {
    // let fileNameSelect = binding.fileNameSelect;
    // let titleOption = binding.titleOption;

    // bind.bgSelect(filename_tpl, data);
    // event.bgSelect(function (element, event) {
    //     let index = console.log($(element).val());
    // });

    let bindTxtOption = function (element) {
        let index = $(element).val();
        console.log(data[index].size);
        binding.loadHtml('#imgSize', data[index].size, size_tpl);
        binding.loadHtml('.option-block', data[index].title, title_tpl).bindEvent('.button', 'click', draw);
        colors.init();
    }

    let draw = function (element) {
        let index = $(element).data('index');
        alert(index);
    }

    binding.loadHtml('#fileNames', data, filename_tpl).bindEvent('#fileNames', 'change', bindTxtOption);

    // fileNameSelect.loadHtml('#fileNames', data)
    //     .bindEvent('#fileNames', 'change', titleOption.loadHtml.bind(titleOption, '.option-block', data[index].title));

    //titleOption.loadHtml('.option-block', data[index].title)
});
