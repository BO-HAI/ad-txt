class DrawImage {
    constructor (id, width, height, data, illustrationData, imgSizeIndex) {
        this.id = id;
        this.$canvas = $(id);
        this.canvas = this.$canvas[0],
        this.context = this.canvas.getContext('2d');
        this.width = width; // 不带单位
        this.height = height; // 不带单位
        this.data = data;
        this.illustrationData = illustrationData;
        this.imgSizeIndex = imgSizeIndex;
    }

    init () {
        this.$canvas.css({
            width: this.width,
            height: this.height
        }).attr({
            width: this.width,
            height: this.height
        });

        this.context.fillStyle = '#2b2b2b';
        this.context.fillRect(0, 0, this.width, this.height);

        this.drawBg(() => {
            this.data.size[this.imgSizeIndex].title.forEach((item) => {
                this.drawTxt(item);
            });
        });
    }

    drawBg (fn) {
        let beauty = new Image();
        beauty.src = this.data.url;
        beauty.setAttribute("crossOrigin",'Anonymous');
        beauty.onload = () => {
            this.context.drawImage(beauty, 0, 0, this.width, this.height);
            this.context.stroke();

            if (this.illustrationData) {
                this.drawIllstration(fn);
            } else {
                fn()
            }

            // if (fn) {
            //     fn();
            // }
        }
    }

    drawIllstration (fn) {
        let beauty = new Image();
        beauty.src = this.illustrationData.url;
        beauty.setAttribute("crossOrigin",'Anonymous');
        beauty.onload = () => {
            this.context.drawImage(beauty, this.illustrationData.x, this.illustrationData.y, this.illustrationData.w, this.illustrationData.h);
            this.context.stroke();

            if (fn) {
                fn();
            }
        }
    }

    drawTxt (data) {
        let measureScoreStr = {
           width: 0
        };

        let x;
        let y;
        let value;

        let isCenter = !data.x ? true : false;
        let isVerticalCenter = !data.y ? true : false;

        if (data.txt.len !== null && (data.txt.value.length - data.txt.befor.length - data.txt.after.length) > data.txt.len) {
            value = data.txt.value.substring(0, data.txt.len);
        } else {
            value = data.txt.value;
        }

        this.context.beginPath();
        this.context.font = 'lighter ' + data.txt.fontSize + 'px' + ' ' + data.txt.fontFamily;
        this.context.fillStyle =  data.txt.fontColor;
        // this.canvas.style.letterSpacing = '100';

        value = value.trim() !== '' ? data.txt.befor + value + data.txt.after : value;

        if (isCenter) {
           measureScoreStr = this.context.measureText(value);
           x = this.width / 2 - (measureScoreStr.width / 2);
       } else {
           x = data.x;
       }

        if (isVerticalCenter) {
            y = this.height / 2 - (parseInt(data.txt.fontSize) / 2);
        } else {
            y = data.y;
        }

        this.context.fillText(value, x, y);
        this.context.stroke();
    }
}

module.exports = DrawImage;
