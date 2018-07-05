/**
 * Created by bohai on 18/6/19.
 */
require('normalize.css');
require('../sass/screen.scss');
const classify = require('./data/classify.json');
const Dao = require('./dao.js');

$(function () {
    let dao = new Dao('adtxt', 1900013);
    let host = './js/data/';

    dao.connect();

    // 存储分类
    classify.forEach(function (item) {
        dao.save('Classify', item);
    });

    // 存储主题-110
    let themeList = [];
    let themeNames = ['a', 'b', 'c', 'd', 'e', 'f'];
    themeNames.forEach((item) => {
        let obj = require('./data/classify/theme_' + item + '/1-1-0/list.json');
        themeList.push({
            theme: item,
            list: obj
        });
    });
    themeList.forEach(function (item) {
        item.list.forEach(function (item2, index) {
            item2.index = index;
            item2.parentId = '110';
            item2.theme = item.theme;
            item2.id = item2.theme + '_' + item2.parentId + '_' + item2.index;
            dao.save('theme', item2);

            // 获取图片对象
            let parentId = (function (str) {
                let arr = str.split('');
                return item2.theme + '/' + arr[0] + '-' + arr[1] + '-' + arr[2];
            }(item2.parentId));
            let imageObj = require('./data/classify/theme_' + parentId + '/' + item2.index + '.json');
            imageObj.id = item2.theme + '_' + item2.parentId + '_' + item2.index;
            dao.save('image', imageObj);
        });
    });
});
