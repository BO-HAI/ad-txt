require('normalize.css');
require('../sass/screen.scss');
const colors = require('./colors.js');
const Handlebars = require('handlebars/dist/handlebars.js');
// const filename_tpl = require('./template/filename.option.handlebars');
// const title_tpl = require('./template/title.option.handlebars');
const data = require('./data.js');
const bind = require('./bind.js');


// function bindBgSelect (template, data) {
//     let html = template({data});
//     $('#fileNames').html(html);
// }

$(document).ready(function () {
    let fileNameSelect = bind.FileNameSelect;
    colors.init();

    // bind.bgSelect(filename_tpl, data);
    // event.bgSelect(function (element, event) {
    //     let index = console.log($(element).val());
    // });

    fileNameSelect.loadHtml(data).bindEvent('change', function (element) {
        let index = $(element).val();
        console.log(data[index]);

        // let html = title_tpl({data: data[index].title});
        // console.log(html);
    });
});
