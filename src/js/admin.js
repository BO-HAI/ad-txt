/**
 * Created by bohai on 18/8/9.
 */
require('normalize.css');
require('../sass/screen.scss');
const binding = require('./bind.js');
const host = 'http://localhost:8080/api';
const classify = require('./admin_classify');

$(document).ready(function () {
    classify(host, binding);
});