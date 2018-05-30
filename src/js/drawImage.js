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

    clear () {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    init () {
        this.context.clearRect(0, 0, this.width, this.height);
        this.$canvas.css({
            width: this.width,
            height: this.height
        }).attr({
            width: this.width,
            height: this.height
        });

        this.context.fillStyle = '#2b2b2b';
        this.context.fillRect(0, 0, this.width, this.height);

        this.drawBg(this.data.url, 0, 0, this.width, this.height, () => {
            this.data.size[this.imgSizeIndex].title.forEach((item) => {
                this.drawTxt(item);
            });
        });
    }

    drawBg (url, x, y, w, h, fn) {
        let beauty = new Image();
        beauty.src = url;
        beauty.setAttribute("crossOrigin",'Anonymous');
        beauty.onload = () => {
            this.context.drawImage(beauty, x, y, w, h);
            this.context.stroke();

            if (this.illustrationData.length > 0) {
                this.drawIllstration(fn);
            } else {
                fn()
            }
        }
    }

    drawIllstration (fn) {
        for (let i = 0, len = this.illustrationData.length;i < len; i++) {
            let item = this.illustrationData[i];

            let beauty = new Image();
            beauty.src = item.url;
            beauty.setAttribute("crossOrigin",'Anonymous');
            beauty.onload = () => {
                this.context.drawImage(beauty, item.x, item.y, item.w, item.h);
                this.context.stroke();

                if (fn) {
                    fn();
                }
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
        let strArr;
        let spacing = data.txt.spacing ? data.txt.spacing : 0;

        let isCenter = !data.x ? true : false;
        let isVerticalCenter = !data.y ? true : false;

        if (data.txt.len !== null && (data.txt.value.length > data.txt.len)) {
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

           // value.length * 5 为 字间距总长度
           x = spacing === 0 ?
               this.width / 2 - (measureScoreStr.width / 2) :
               this.width / 2 - ((measureScoreStr.width + value.length * spacing) / 2);
       } else {
           x = data.x;
       }

        if (isVerticalCenter) {
            y = this.height / 2 - (parseInt(data.txt.fontSize) / 2);
        } else {
            y = data.y;
        }

        strArr = value.split('');

        if (spacing && spacing !== 0) {
            let temp;
            // 逐字渲染，控制字间距
            strArr.forEach((item, index) => {
                let mss = this.context.measureText(temp);
                if (index > 0) {
                    x = x + mss.width + spacing;
                }

                this.context.fillText(item, x, y);
                this.context.stroke();
                temp = item;
            });
        } else {
            this.context.fillText(value, x, y);
            this.context.stroke();
        }
    }
}

module.exports = DrawImage;
