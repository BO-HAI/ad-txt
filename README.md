# 广告工厂

```
// 热加载
npm run start:dev

http://localhost:9001/

// 编译
npm run build
```
### 一、关于主题

主题分类及对应的编号：

基础(a)、强化(b)、冲刺(c)、报名指导(d)、解析(e)、听课指南(f)

### 二、增加新字体

#### sass/base/_font.scss

内增加字体，并建立对应的css样式名

```css
@font-face {
    font-family: "cnMSYH";
    src: url("../font/msyh.ttf") format('truetype');
    font-weight: normal;
    font-style: normal;
}

.cnMSYH {
    font-family: 'cnMSYH' !important;
}
```
#### template/index.html

增加新字体需要在hmtl内提前引入

```html
<hidden class="cnMSYH"></hidden>
```

#### js/template/title.option.handlebars

增加新的字体选项，找到id="fontFamily"的select控件，增加option

```
<option value="cnYAHEI" {{#compare txt.fontFamily '==' 'cnMSYH'}}{{/compare}} class="cnYAHEI">微软雅黑细</option>
```

### 三、图片路径

图片路径需要包含

```
src/images/illustration/分辨率宽_分辨率高/*.png
src/images/theme/主题名/分类id/*.jpg

// src/images/illustration/750_422/*.png
// src/images/theme/a/0-0-0/0.jpg
```

### 四、数据格式说明

#### js/data/
`该目录属于数据文件，不被webpack编译，请手动复制到dist目录`

#### js/data/classify.json

分类：保存左侧菜单各大分类及子分类

```
[
    {
        "id": "1",
        "name": "APP",
        "child": [
            {
                "id": "1-0",
                "name": "首页",
                "child": [
                    {
                        "id": "1-0-0",
                        "name": "焦点轮播图"
                    }
                ]
            }
    }
]
```

#### js/data/classify/theme_a/0-0-0/list.json（js/data/classify/theme_[主题id]/[分类id]/）

分类主题下的图片列表:

`value`: [String] 对应的图片数据json文件名，比如“0”，就对应的当前目录下存在一个0.json；

`name`: [String] 显示在页面上的文件名；

`src`: [String] 图片位置，用于缩略图的显示；

```
[
    {
        "name": "01",
        "value": "0",
        "src": "./images/theme/a/0-0-1/01.png"
    }
]
```
#### js/data/classify/theme_a/0-0-0/0.json

图片描述

```
{
    "name": "01",
    "url": "./images/theme/a/0-0-1/01.png",
    "illustration": true,
    "describe": "",
    "size": []
}
```

`name`: [String] 图片名称
`url`: [String] 图片地址
`illustration`: [Boolean] 图片是否可配插图
`describe`: [String] 图片描述
`size`: [Array] 按分辨率分类的图片属性集合

##### size 属性

每一个size项代表的一个分辨率的图片

```
[
    {
        "w": 580,
        "h": 326,
        "title": []
    }
]
```

`w`: [Number] 分辨率宽
`h`: [Number] 分辨率高
`title`: [Array] 该图片此分辨率下的标题属性集合

##### title 属性

每一个title代表该图片此分辨率下的标题

```
[
    {
        "txt": {
            "label": "商品主标题1",
            "value": "9节课",
            "befor": "",
            "after": "",
            "placeholder": "1-6个汉字",
            "maxLen": 6,
            "minLen": 1,
            "fontSize": 40,
            "fontFamily": "GBK_FZ_LT_DH",
            "fontColor": "#ffffff",
            "spacing": 3
        },
        "x": 50,
        "y": 130,
        "controlFont": {
            "size": false,
            "color": false,
            "family": false
        },
        "controlCoordinate": {
            "x": false,
            "y": false
        }
    }
]
```

`txt`: [Object] 文案对象
`txt.label`: [String] 标签，说明该字段作用
`txt.value`: [String] 默认值
`txt.befor`: [String] 在value前面加入的内容
`txt.after`: [String] 在value后面加入的内容
`txt.placeholder`: [String] 提示语 
`txt.maxLen`: [String] 最大字数
`txt.minLen`: [String] 最小字数
`txt.fontSize`: [String] 字号
`txt.fontFamily`: [String] 字体名称
`txt.fontColor`: [String] 字体颜色
`txt.spacing`: [String] 字间距

`controlFont`: [Object] 控制字体对象
`controlFont.size`: [Boolean] 字号是否可变
`controlFont.color`: [Boolean] 字体颜色是否可变
`controlFont.family`: [Boolean] 字体是否可变

`controlCoordinate`: [Object] 控制坐标对象
`controlCoordinate.x`: [Boolean] x坐标是否可变
`controlCoordinate.y`: [Boolean] y坐标是否可变


