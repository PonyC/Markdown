let codeStatus = {
  statusText: "获取验证码",
  sending: false,
  interval: undefined
}
/**
 * 验证码倒计时
 */
sendCountDown() {
  let _seconds = 30;
  this.codeStatus.sending = true;
  this.codeStatus.statusText = _seconds + "s";
  this.codeStatus.interval = setInterval(() => {
    if (_seconds === 1) {
      this.codeStatus.sending = false;
      this.codeStatus.statusText = "获取验证码";
      clearInterval(this.codeStatus.interval);
      this.codeStatus.interval = undefined;
      return;
    }
    _seconds--;
    this.codeStatus.statusText = _seconds + "s";
  }, 1000);
}