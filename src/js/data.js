let list = [
    {
        name: '宇宙',
        url: 'http://ykonlinevideo.bs2dl.yy.com/original/c6299568d981433c877de5421cf08218.jpg',
        illustration: true,
        size: [
            {
                w: 1920,
                h: 450
            },
            {
                w: 1700,
                h: 398
            },
            {
                w: 1200,
                h: 281
            },
            {
                w: 1000,
                h: 234
            }
        ],
        title: [
            {
                txt: {
                    value: '',
                    placeholder: '这里填写主标题, 长度不能超过15个汉字',
                    length: 15,
                    fontSize: 50,
                    fontFamily: 'cnYAHEI',
                    fontColor: '#D10101',
                },
                x: 807,
                y: 200,
                controlFont: {
                    size: false,
                    color: true,
                    family: true
                },
                controlCoordinate: {
                    x: false,
                    y: false
                }
            },
            {
                txt: {
                    value: '',
                    placeholder: '这里填写副标题, 长度不能超过30个汉字',
                    length: null,
                    fontSize: 50,
                    fontFamily: 'enJonahRegular',
                    fontColor: '#D10101',
                },
                x: 807,
                y: 300,
                controlFont: {
                    size: false,
                    color: false,
                    family: true
                },
                controlCoordinate: {
                    x: false,
                    y: false
                }
            }
        ]
    },
    {
        name: '建工',
        url: 'http://ykonlinevideo.bs2dl.yy.com/original/d2ed5e84e3fb4d618e1c7773d44913bc.jpg',
        illustration: true,
        title: [
            {
                txt: {
                    value: '',
                    placeholder: '这里填写副标题, 长度不能超过30个汉字',
                    length: null,
                    fontSize: 50,
                    fontFamily: 'enJonahRegular',
                    fontColor: '#D10101',
                },
                x: 807,
                y: 200,
                controlFont: {
                    size: false,
                    color: true,
                    family: true
                },
                controlCoordinate: {
                    x: false,
                    y: false
                }
            }
        ]
    }
]

module.exports = list;
