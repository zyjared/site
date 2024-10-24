# clamp 函数

[`clamp(MIN, VAL, MAX)`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp)，等同于 `max(MIN, min(VAL, MAX))`。

- [`clamp`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp)
- [`max`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/max)
- [`min`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min)

## 效果

<div class="z-container">
    <span class="font"> clamp 函数 </span>
</div>

<style scoped>
.z-container {
    border: 1px solid var(--vp-c-divider);
    padding: 1rem;
    color: var(--vp-c-text-3);
    width: clamp(20rem, 50%, 90%);
    font-size: clamp(1rem, 2.5vw, 2rem);
}
</style>

## 代码

```css
.container {
    width: clamp(20rem, 50%, 90%);
    font-size: clamp(1rem, 2.5vw, 2rem);
}
```
