const downFile = async (url,name)=>{
  uni.downloadFile({
    url:url,
    success:(res)=>{
      if(res.statusCode === 200){
       console.log('下载成功');  
       //保存视频到本地  
       uni.saveFile({
         tempFilePath:res.tempFilePath,
         success:function(res){
           setVideoStorage(name,url,res.savedFilePath)
         }
       })
      }
    }
  })
}

//检查缓存是否存在，不存则添加
const checkStorage = (cache_name) => {
 let cache = uni.getStorageSync('haibu-video')
 if(!cache){
   uni.setStorageSync('haibu-video',{[cache_name]:{origin:null,filePath:null}})
 }
 if(!cache[cache_name]){
   setVideoStorage(cache_name)
 }
 return uni.getStorageSync('haibu-video')
}

//设置某个cache的缓存值
const setVideoStorage = (cache_name,origin = null,filePath = null)=>{
  let cache = uni.getStorageSync('haibu-video')
  cache[cache_name] = {origin,filePath}
  uni.setStorageSync('haibu-video',cache)
}

// 调试时清空数据方法
const setEmpty = ()=>{
  uni.removeStorageSync('haibu-video')
  console.log('清空文件夹')
  uni.getSavedFileList({
     success:(res) =>{  
       const fileList = res.fileList  
       fileList.forEach((item, index) => {
         // 删除视频列表中无关视频
         uni.removeSavedFile({  
           filePath: item.filePath  
         }); 
       })
       console.log(fileList)
     }
  });
}

export const cacheVideo = async (cache_name,url)=>{
 // await setEmpty()
 let cache = checkStorage(cache_name)
 let videoSrc = ''
 if(cache && cache[cache_name].origin){
   if(cache[cache_name].origin === url){
     console.log('有缓存并且链接没有变动')
     videoSrc = cache[cache_name].filePath
    } else{
     console.log('有缓存但是连接改变了')
     videoSrc = url
     setVideoStorage(cache_name)
     await downFile(videoSrc,cache_name);
   }
 }else{  
   console.log('没有缓存')  
   videoSrc = url
   await downFile(videoSrc,cache_name);
 }
 // 获取本地视频列表
 uni.getSavedFileList({  
   success:(res) =>{  
     const fileList = res.fileList  
     const needArr = Object.keys(cache).map(item=>cache[item].filePath)
     fileList.forEach((item, index) => {
       if(!needArr.includes(item.filePath)){
        // 删除视频列表中无关视频
        uni.removeSavedFile({  
          filePath: item.filePath  
        }); 
       }
     })
    }
 });
 return videoSrc
}