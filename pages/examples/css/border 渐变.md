# border 渐变

- [`border`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border)
- [`border-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image)

::: info
从视觉效果上来说，有多种实现方式，此处使用 `border-image`。
:::

## 效果

<div class="z-container">
    <span> border 渐变 </span>
</div>

<style scoped>
.z-container {
    border: 2px solid transparent;
    border-image: linear-gradient(90deg, #14b8a6, #7c3aed) 1;
    padding: 1em;
}

</style>

## 代码

```css
.container {
    border: 2px solid transparent;
    border-image: linear-gradient(to right, #14b8a6, #7c3aed) 1;
}
```
