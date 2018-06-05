# ad-txt

```
// 热加载
npm run start:dev

http://localhost:9001/

// 编译
npm run build
```

#### 增加新字体

增加新字体需要在hmtl内提前引入

```css
@font-face {
    font-family: "cnMSYH";
    src: url("../font/msyh.ttf") format('truetype');
    font-weight: normal;
    font-style: normal;
}
```

```html
<hidden class="cnMSYH"></hidden>
```

#### 图片路径

图片路径需要包含

```
src/images/illustration/分辨率宽_分辨率高/*.png
src/images/theme/主题名/*.jpg
```
