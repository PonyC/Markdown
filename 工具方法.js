// 生成随机字符串
export function random(len) {
  len = len || 16;
  let chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

// 判断是否是全面屏
export function judgeBigScreen() {
  let result = false;
  const rate = window.screen.height / window.screen.width;
  let limit = window.screen.height == window.screen.availHeight ? 1.8 : 1.65; // 临界判断值

  // window.screen.height为屏幕高度
  // window.screen.availHeight 为浏览器 可用高度

  if (rate > limit) {
    result = true;
  }
  return result;
}

// 替换全部
export function replaceAll(text, FindText, RepText) {
  const regExp = new RegExp(FindText, "g");
  return text.replace(regExp, RepText);
}

// 检测数据类型
export function istype(o, type) {
  switch (type) {
    case "string":
      return Object.prototype.toString.call(o) === "[object String]";
    case "number":
      return Object.prototype.toString.call(o) === "[object Number]";
    case "boolean":
      return Object.prototype.toString.call(o) === "[object Boolean]";
    case "undefined":
      return Object.prototype.toString.call(o) === "[object Undefined]";
    case "null":
      return Object.prototype.toString.call(o) === "[object Null]";
    case "function":
      return Object.prototype.toString.call(o) === "[object Function]";
    case "array":
      return Object.prototype.toString.call(o) === "[object Array]";
    case "object":
      return Object.prototype.toString.call(o) === "[object Object]";
    case "nan":
      return isNaN(o);
    case "elements":
      return Object.prototype.toString.call(o).indexOf("HTML") !== -1;
    default:
      return Object.prototype.toString.call(o);
  }
}

// 传入时间与当前时间的倒计时
export function countDown(time, callback = () => {}) {
  let _interval = undefined;
  let _data = "00:00:00";
  let _time = (() => {
    let _strTime = new Date(time);
    if (_strTime == "Invalid Date") {
      time = time.replace(/T/g, " ");
      time = time.replace(/-/g, "/");
      _strTime = new Date(time);
    }
    return _strTime;
  })();
  let _d = 0,
    _h = 0,
    _m = 0,
    _s = 0;
  let addZero = num => {
    return (num < 10 ? "0" : "") + num;
  };

  if (_interval) {
    clearInterval(_interval);
  }
  _interval = setInterval(() => {
    let _now = new Date();
    let _diff = _time - _now;
    if (_diff <= 0) {
      _data = "00:00:00";
      callback(_data);
      clearInterval(_interval);
      return;
    }
    _d = Math.floor(_diff / 1000 / 3600 / 24);
    _h = addZero(Math.floor((_diff / 1000 / 60 / 60) % 24));
    _m = addZero(Math.floor((_diff / 1000 / 60) % 60));
    _s = addZero(Math.floor((_diff / 1000) % 60));
    if (_d > 0) {
      _data = `${_d}天${_h}:${_m}:${_s}`;
    } else if (_h === 0) {
      _data = `${_m}:${_s}`;
    } else {
      _data = `${_h}:${_m}:${_s}`;
    }
    callback(_data);
  }, 1000);
}

// 日期格式化
export function formatTime(time, format) {
  if (!time) {
    return "-";
  }
  let _format = format || "y/m/d h:i:s";
  let _date = time ? new Date(time) : new Date();
  let formatObj = {
    y: _date.getFullYear(),
    m: _date.getMonth() + 1,
    d: _date.getDate(),
    h: _date.getHours(),
    i: _date.getMinutes(),
    s: _date.getSeconds()
  };
  let time_str = _format.replace(/(y|m|d|h|i|s)/g, (result, key) => {
    let value = formatObj[key];
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

// 时间差
export function formTheCurrentTime(time) {
  // 处理传入时间，兼容iOS
  let _time = (() => {
    let _strTime = new Date(time);
    if (_strTime == "Invalid Date") {
      time = time.replace(/T/g, " ");
      time = time.replace(/-/g, "/");
      _strTime = new Date(time);
    }
    return _strTime;
  })();
  // 补零
  let addZero = num => (num < 10 ? "0" : "") + num;
  let _now = new Date();
  let _diff = _now - _time; // 相差
  let diffObj = {
    d: Math.floor(_diff / 1000 / 3600 / 24),
    h: addZero(Math.floor((_diff / 1000 / 60 / 60) % 24)),
    i: addZero(Math.floor((_diff / 1000 / 60) % 60))
  };
  return diffObj.d;
}

// 设置微信title
export function setTitle(title) {
  document.title = title;
  // 针对微信中的处理
  let iframe = document.createElement("iframe");

  iframe.src = "";
  iframe.style.display = "none";
  iframe.onload = () => {
    setTimeout(() => {
      iframe.remove();
    }, 10);
  };
  document.body.appendChild(iframe);
}

/**
 * 获取指定天数的日期
 * @param {*} diff 正数为后x天 负数为前x天
 * @returns 
 */
export function getDate(diff) {
  const now = new Date();
  const date = new Date(now.getTime() - diff * 24 * 3600 * 1000);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
  const result = year + "-" + month + "-" + day;
  return result;
}

//判断是移动端和pc端
export function isPc () {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    console.log('移动端...')
    return false
  }
  return true
}

// 复制文本
export function copy({content = '', success = Function }) {
  const input = document.createElement('input')

  input.setAttribute('readonly', 'readonly')
  input.setAttribute('value', content)
  document.body.appendChild(input)
  input.select()
  // 手机上要用这个方法
  input.setSelectionRange(0, 9999)

  if (document.execCommand('copy')) {
    document.execCommand('copy')
    success()
  }
  document.body.removeChild(input)
}

/**
 * 绘制圆角矩形
 * @param {*} x 起始点x坐标
 * @param {*} y 起始点y坐标
 * @param {*} w 矩形宽
 * @param {*} h 矩形高
 * @param {*} r 圆角半径
 * @param {*} ctx 画板上下文
 */
export function darwRoundRect({x, y, w, h, r,color,shadow,url, ctx} = {}) {
  ctx.save();
  ctx.beginPath();

  // 左上弧线
  ctx.arc(x + r, y + r, r, 1 * Math.PI, 1.5 * Math.PI);
  // 左直线
  ctx.moveTo(x, y + r);
  ctx.lineTo(x, y + h - r);
  // 左下弧线
  ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, 1 * Math.PI);
  // 下直线
  ctx.lineTo(x + r, y + h);
  ctx.lineTo(x + w - r, y + h);
  // 右下弧线
  ctx.arc(x + w - r, y + h - r, r, 0 * Math.PI, 0.5 * Math.PI);
  // 右直线
  ctx.lineTo(x + w, y + h - r);
  ctx.lineTo(x + w, y + r);
  // 右上弧线
  ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);
  // 上直线
  ctx.lineTo(x + w - r, y);
  ctx.lineTo(x + r, y);
  if(shadow){ 
    ctx.setShadow(0, 0, 10, '#E5E7EE');
  }
  if(url){
    // clip() 方法会在原始画布上剪切任意形状和尺寸。
    // 一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内（不能访问画布上的其他区域）
    ctx.clip()
    ctx.drawImage(url,x,y,w,h)
  } else {
    ctx.setFillStyle(color);
    ctx.fill();
  }
  ctx.restore();
}

// 节流函数
export function throttle(func, ms){
  let isCool = false,
  _self,
  _args;
  function w(...args) {
    console.log(args)
    // 如果冻结状态，直接返回，并记录下来传递的参数
    if (isCool) {
        _self = this
        _args = args
        return
    } 
    // 非冻结状态
    func.apply(this, args) // 执行
    isCool = true // 执行后冻结
    setTimeout(() => {
        isCool = false // 时间到了之后解冻
        if (_args && _args.length) { // ms时间过后，如果在冻结期有触发操作，则执行一次
            w.apply(_self, _args)
            _self = null
            _args = null // 执行后把冻结期参数置空，避免ms之后对之前的操作进行下一轮执行
        } 
    }, ms)
  }
  return w
}

//防抖函数
const debounce = (func, ms) =>{
  let isCool = false // 是否为冻结状态
  return function(...args) {
      if (isCool) return // 冻结状态直接跳出不继续执行
      // 非冻结状态
      func.apply(this, args) // 执行
      isCool = false // 执行后把状态置为冻结状态
      setTimeOut(() => {isCool = true}, ms) // 过ms时间后再把状态置为解冻
  }
}