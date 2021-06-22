写h5页面时经常会遇到底部固定评论框的需求,但是浏览器为了在弹起键盘时一定要看到input输入框
导致将页面上顶，视图窗口被顶出键盘高度至视图外
为了良好的操作体验，我们希望内部视图不变，只有输入框上移至键盘高度之上
以下方式可以解决
html
``` html
<div class="input">
  <input @focus="handleFocus" @blur="handleBlur" type="text" v-model="reply" enterkeyhint="send" placeholder="留下你的评论吧">
</div>
```
```js
    handleFocus () {
      const u = navigator.userAgent
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if(isIOS) {
        // 先让底部input飞到文档顶部，并设置成透明的
        // 必须是飞到顶部，如果是飞到底部依然超出了文档高度，键盘还是会将文档上顶
        this.$refs['comment-action'].style.bottom = window.innerHeight + 'px'
        this.$refs['comment-action'].style.opacity = 0
        setTimeout(() => {
          // 上顶后延迟100毫秒，设置过度，将输入框降至需要的高度，并恢复透明度
          this.$refs['comment-action'].style.transition = 'opacity 0.8s'
          this.$refs['comment-action'].style.opacity = 1
          this.$refs['comment-action'].style.bottom = window.innerHeight / 2.3 + 'px'
        },100)
      } else {
        // android
        // 因为行为模式和ios不同，需要固定住当前文档流的高度
        document.getElementById('mobileVideo').style.height = window.innerHeight + 'px'
      }
    }
    handleBlur () {
      this.$refs['comment-action'].style.transition = 'bottom 0.3s'
      this.$refs['comment-action'].style.bottom = 0
    },
```