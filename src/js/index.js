require('normalize.css');
require('../sass/screen.scss');
require('./color_picker/css/colpick.css');
// const $ = require("jQuery");
// require('./color_picker/js/colpick.js');
// require('./color_picker/js/plugin.js');

class Adtxt {
    constructor (id, width, height) {
        this.id = id;
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.width = width; // 不带单位
        this.height = height; // 不带单位
        this.titleList = [];
        this.imageUrl = '';
        this.scale = 1;
    }

    init (url) {
        this.imageUrl = url;

        this.context.fillStyle = '#2b2b2b';
        this.context.fillRect(0, 0, this.width, this.height);
        // this.context.stroke();
        this.drawBG(url);

        let tableHtml =
                `<table>
                    <thead>
                        <tr>
                            <td width="40%">标题</td>
                            <td width="10%">颜色</td>
                            <td width="10%">字体</td>
                            <td width="5%">字号</td>
                            <td width="10%">X轴坐标</td>
                            <td width="10%">Y轴坐标</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>`;

        $('.history-block').html('').append(tableHtml);

        $('select[name="fontFamily"]').change(function () {
            var $this = $(this);

            $('#autoADTXT').css({
                'font-family': $this.val()
            });
        });

        $('#submitTxt').on('click', () => {
            var data = $('#titleForm').serializeArray();
            this.draw(url, data);
        });

        $('#saveImg').on('click', () => {
            this.generatePNG();
        });

        $('.enlarge-canvas').on('click', () => {
            if (this.scale >= 1) {
                return;
            }

            this.scale += 0.1;
            $('#' + this.id).css({
                'transform': 'scale(' + this.scale + ')',
                'margin-left': 7 * ((1-this.scale) * 10) * -1 + '%'
            });
        });

        $('.narrow-canvas').on('click', () => {
            if (this.scale <= 0.1) {
                return;
            }

            this.scale -= 0.1;
            $('#' + this.id).css({
                'transform': 'scale(' + this.scale + ')',
                'margin-left': 7 * ((1-this.scale) * 10) * -1 + '%'
            });
        });
    }

    /**
     * 描绘背景
     * @param  {String}   url      [description]
     * @param  {Function} callback [description]
     */
    drawBG (url, callback) {
        let beauty = new Image();
        beauty.src = url;
        beauty.setAttribute("crossOrigin",'Anonymous');
        beauty.onload = () => {
            this.context.drawImage(beauty, 0, 0, this.width, this.height);
            this.context.stroke();

            if (callback) {
                callback();
            }
        }
    }

    /**
     * 向画布添加标题
     * @param {Array[Object]} data [description]
     */
    addTxt (data) {
        let measureScoreStr = {
           width: 0
        };

        let isCenter = !data[4].value ? true : false;
        let isVerticalCenter = !data[5].value ? true : false;

        //data[2].value, data[3].value, data[1].value, data[0].value, data[4].value, data[5].value, !data[4].value ? true : false

        this.context.beginPath();
        this.context.font = 'lighter ' + data[3].value + ' ' + data[2].value;
        this.context.fillStyle =  data[1].value;

        if (isCenter) {
           measureScoreStr = this.context.measureText(data[0].value);
           data[4].value = this.width / 2 - (measureScoreStr.width / 2);
        }

        if (isVerticalCenter) {
            data[5].value = this.height / 2 - (parseInt(data[3].value.replace('px', '')) / 2);
        }


        this.context.fillText(data[0].value, data[4].value, data[5].value);
        this.context.stroke();
    }

    /**
     * 画
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    draw (url, data) {
        let that = this;
        let appendHTML = (item, index) => {
            $('.history-block tbody').append(
                `<tr>
                    <td class="title" style="font-family:${item[2].value}">${item[0].value}</td>
                    <td>${item[1].value}<span class="color" style="background:${item[1].value}"></span></td>
                    <td style="font-family:${item[2].value}">${item[2].value}</td>
                    <td>${item[3].value}</td>
                    <td>${item[4].value}</td>
                    <td>${item[5].value}</td>
                    <td>
                        <a class="del" href="javascript:;" data-index="${index}">删除</a>
                        <a class="modify" href="javascript:;" data-index="${index}">修改</a>
                    </td>
                </tr>`
            );
        }

        let bindDel = function () {
            let $that = $(this);
            that.titleList.splice($that.data('index'), 1)
            that.draw(that.imageUrl, undefined);
        }

        this.context.clearRect(0, 0, this.width + 'px', this.height + 'px');
        if (data) {
            this.titleList.push(data);
        }

        // console.log(this.titleList);
        this.drawBG(url, () => {
            $('.history-block tbody').html('');
            this.titleList.forEach((item, index) => {
                this.addTxt(item);
                appendHTML(item, index);
            });

            $('.del').on('click', bindDel);
        });
    }

    generatePNG () {
        let newImg = new Image();

        $('img').attr('src', this.canvas.toDataURL("image/png"));
    }
}

window.onload = function () {
    $('.img-list li').on('click', function () {
        let $that = $(this);
        let width = $that.data('width');
        let height = $that.data('height');
        let url = $that.data('url');

        $('#autoADTXT').attr('width', width + 'px');
        $('#autoADTXT').attr('height', height + 'px');
        $('#autoADTXT').css({
            width,
            height
        });

        let c = new Adtxt('autoADTXT', width, height);
        c.init(url);
        $('.container').show();
    });

    $('.close-canvas').on('click', function () {
        $('.container').hide();
    });
}

$(document).ready(function () {
});
