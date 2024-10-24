# focus-within

- [`focus-within`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within)

## 效果

<form class="z-form">
    <label>
        <span>爱好</span>
        <select name="hobby">
            <option value="eat">吃饭</option>
            <option value="sleep">睡觉</option>
        </select>
    </label>
</form>

<style scoped>
.z-form label:focus-within span {
    color: tomato;
}

.z-form select {
    width: 8em;
    padding: 0 .5em;
    margin-left: .5em;
    text-align: center;
    border: 1px solid skyblue;
}
</style>

## 代码

```css
label:focus-within span {
    color: tomato;
}
```
