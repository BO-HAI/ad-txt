class V {
    constructor () {
        this.errorInfo = '';
    }

    static printError (info) {
        this.errorInfo = info;
        $('.error-info').text(this.errorInfo);
    }

    /**
     * 基础验证
     * @param  {Object} data        [description]
     * @param  {String} igonre      需要忽略的下标,逗号分割:'0,4,8'
     * @return {Boolean}            [description]
     */
    static base (data, igonre) {
        let v = true;
        let ig = igonre ? igonre : '';
        this.printError('');
        data.title.forEach((item, index) => {
            if (ig.indexOf(index) === -1) {
                let len = item.txt.value.length;
                let max = item.txt.maxLen;
                let min = item.txt.minLen;
                if (len > max || len < min) {
                    v = false;
                    this.printError(item.txt.label + '格式错误：' + item.txt.placeholder);
                }
            }
        })

        return v;
    }

    /**
     * 750*422 app顶部视频封面
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    static w750h422 (data) {
        let v = true;
        let that = this;
        let $list = $('.illustration-list img');
        // 分辨率750*422
        if (data.h === 422 && data.w === 750 && $list.length > 0) {
            $list.each(function () {
                var $this = $(this)
                // 选择双点 2345
                if ($this.attr('src').indexOf('750_422_dotx2') > -1) {
                    //双点 不应该存在下标4、5的文本说明
                    if (data.title[4].txt.value.length !== 0 || data.title[5].txt.value.length !== 0) {
                        v = false;
                        that.printError('选择双点配图,知识点3、4不能存在');
                    } else {
                        // 下标4、5 被忽略
                        v = that.base(data, '4,5');
                    }
                }
                // 选择四点
                if ($this.attr('src').indexOf('750_422_dotx4') > -1) {
                    v = that.base(data);
                }
            });

            return v;
        } else {
            return that.base(data);
        }
    }
}

module.exports = function (data) {
    let v = true;
    v = V.base(data);
    if (data.h === 422 && data.w === 750) {
        v = V.w750h422(data);
    }

    if (!v) {
        $('#saveImg').hide();
    } else {
        $('#saveImg').show();
    }

    return v;
}
