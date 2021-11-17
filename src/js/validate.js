class V {
    constructor () {
        this.errorInfo = '';
    }

    static printError (info) {
        this.errorInfo = info;
        if (info.length > 0) {
            $('#error-info').text('错误：' + this.errorInfo);
        } else {
            $('#error-info').text('');
        }
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
                    this.printError(item.txt.label + '格式错误 -- ' + item.txt.placeholder);
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
        let igonre = '';
        // 分辨率750*422
        if (data.h === 422 && data.w === 750 && $list.length > 0) {
            $list.each(function () {
                var $this = $(this)
                // 选择双点 2345
                if ($this.attr('src').indexOf('dotx2') > -1) {
                    //双点 不应该存在下标4、5的文本说明
                    if (data.title[4].txt.value.length !== 0 || data.title[5].txt.value.length !== 0) {
                        v = false;
                        that.printError('选择双点配图,知识点3、4不能存在');
                    } else {
                        igonre = '4,5';
                        // 下标4、5 被忽略

                        v = that.base(data, igonre);
                        console.log(v);
                    }
                }
                // 选择四点
                if ($this.attr('src').indexOf('dotx4') > -1) {
                    igonre = '';
                    v = that.base(data, igonre);
                }
            });
            return v;
        } else {
            return that.base(data, igonre);
        }
    }

    static w580h326 (data) {

        let len = $('.illustration-list').find('li').length;
        let optionLen = $('#illustrationNames').find('option').length;
        let v = this.base(data);
        if (optionLen === 0 && v) {
            // this.printError('');
            return true;
        }

        if (!v) {
            return false;
        }

        if (len !== 1) {
            this.printError('必须选择一张配图，且只能选择一张');
            return false;
        } else if (!v) {
            return false;
        } else {
            // this.printError('');
            return true;
        }
    }

    static w1334h750 (data) {
        return true;
    }
}

module.exports = function (data) {
    // let strVali = true;
    let imgVali = true;
    // strVali = V.base(data);
    // if (data.h === 422 && data.w === 750) {
    //     v = V.w750h422(data);
    // }
    //
    // if (data.h === 326 && data.w === 580) {
    //     v = V.w580h326(data);
    // }

    imgVali = V['w' + data.w + 'h' + data.h](data);

    if (!imgVali) {
        $('#saveImg').hide();
        return false;
    } else {
        $('#saveImg').show();
        V.printError('');
        return true;
    }
}
