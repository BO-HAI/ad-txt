require('normalize.css');
require('../sass/screen.scss');
// require('./colorPicker-master/colors.js');
// require('./colorPicker-master/colorPicker.data.js');
// require('./colorPicker-master/colorPicker.js');
// require('./colorPicker-master/javascript_implementation/jsColor.js');
const colors = require('./colors.js');
const Handlebars = require('handlebars/dist/amd/handlebars.runtime.js');
const titleList = require('./data.js');

$(document).ready(function () {
    colors.init();
    console.log(Handlebars);

    //用jquery获取模板
    var tpl = $("#tpl-option").html();
    //预编译模板
    var template = Handlebars.compile(tpl);

    var html = template(titleList.title);

    $('#imageList').html(html);
});
