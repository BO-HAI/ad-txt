/**
 * Created by bohai on 18/6/19.
 */
require('normalize.css');
require('../sass/screen.scss');
const classify = require('./data/classify.json');
const a_110 = require('./data/classify/theme_a/1-1-0/list.json');
const Dao = require('./dao.js');

console.log(a_110);

$(function () {
    let dao = new Dao('adtxt', 19000120);
    dao.connect();
    let host = './js/data/';

    let saveClassify = function eachObj (obj) {

        if (obj instanceof Array) {
            obj.forEach((item) => {
                if (item.child instanceof Array) {
                    eachObj(item.child);
                }
                dao.save('Classify', {
                    id: item.id,
                    name: item.name,
                    level: item.level
                });
            });
        } else {
            dao.save('Classify', {
                id: item.id,
                name: item.name,
                level: item.level
            });
        }
    };

    classify.forEach(function (item) {
        dao.save('Classify', item);
    });

    // let classifyPromise = $.ajax({
    //     url: host + 'classify.json',
    //     type: 'GET',
    //     dataType: 'json'
    // });
    //
    // classifyPromise.done(function (res) {
    //     // saveClassify(res);
    //     res.forEach(function (item) {
    //         dao.save('Classify', item);
    //     });
    //     // dao.save('Classify', res[0]);
    //     // dao.save('Classify', res[1]);
    // });
});
