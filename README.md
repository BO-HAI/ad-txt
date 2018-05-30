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
