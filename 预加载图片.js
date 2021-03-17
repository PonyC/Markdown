// 预加载图片
 const preload = async() =>{
  /* 获取所有的图片 */
  const req = require.context("../assets/logo/", true, /\.png$/);
  this.logoImages = req.keys().map(item =>
    // eslint-disable-next-line prettier/prettier
    item.split("").splice(2).join("")
  );
  let proAll = [];
  let imgOnload = src => {
    return new Promise(relove => {
      let image = new Image();
      image.onload = () => {
        relove();
      };
      image.src = require(`../assets/logo/${src}`);
    });
  };
  /* 预加载图片 */
  this.logoImages.forEach(src => {
    proAll.push(imgOnload(src));
  });
  await Promise.all(proAll);
}