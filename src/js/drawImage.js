class DrawImage {
    constructor (id, width, height, data, imgSizeIndex) {
        this.id = id;
        this.$canvas = $(id);
        this.context = this.$canvas[0].getContext('2d');
        this.width = width; // 不带单位
        this.height = height; // 不带单位
        this.data = data;
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

            if (fn) {
                fn();
            }
        }
    }

    drawTxt (data) {
        let measureScoreStr = {
           width: 0
        };

        let x, y;

        let isCenter = !data.x ? true : false;
        let isVerticalCenter = !data.y ? true : false;

        //data[2].value, data[3].value, data[1].value, data[0].value, data[4].value, data[5].value, !data[4].value ? true : false

        this.context.beginPath();
        this.context.font = 'lighter ' + data.txt.fontSize + 'px' + ' ' + data.txt.fontFamily;
        this.context.fillStyle =  data.txt.fontColor;

        if (isCenter) {
           measureScoreStr = this.context.measureText(data.txt.value);
           x = this.width / 2 - (measureScoreStr.width / 2);
       } else {
           x = data.x;
       }

        if (isVerticalCenter) {
            y = this.height / 2 - (parseInt(data.txt.fontSize) / 2);
        } else {
            y = data.y;
        }


        this.context.fillText(data.txt.value, x, y);
        this.context.stroke();
    }
}

module.exports = DrawImage;
