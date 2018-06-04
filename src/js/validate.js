class V {
    /**
     * 基础验证
     * @param  {Object} data        [description]
     * @param  {String} igonre      需要忽略的下标
     * @return {Boolean}            [description]
     */
    static base (data, igonre) {
        let v = true;
        let ig = igonre ? igonre : '';
        console.log(data);
        data.title.forEach((item, index) => {
            if (ig.indexOf(index) === -1) {
                let len = item.txt.value.length;
                let max = item.txt.maxLen;
                let min = item.txt.minLen;
                if (len > max || len < min) {
                    v = false;
                }
            }
        })

        return v;
    }
}

module.exports = function (data) {
    let v = true;
    v = V.base(data);

    // 分辨率750*422
    if (data.h === 422 && data.w === 750) {
        $('.illustration-list img').each(function () {
            var $this = $(this)
            // 选择双点 2345
            if ($this.attr('src').indexOf('750_422_dotx2') > -1) {
                //双点 不应该存在下标4、5的文本说明
                if (data.title[4].txt.value.length !== 0 || data.title[5].txt.value.length !== 0) {
                    v = false;
                } else {
                    // 下标4、5 被忽略
                    v = V.base(data, '4,5');
                }
            }
            // 选择四点
            if ($this.attr('src').indexOf('750_422_dotx4') > -1) {
                v = V.base(data);
            }
        });
    }

    return v;
}
