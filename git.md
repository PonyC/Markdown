# Git Q&A
### 速度慢
github.com 替换为国内镜像地址`github.com.cnpmjs.org`
[参考](https://www.zhihu.com/question/27159393/answer/1117219745)

### 修改远程地址
```shell
git remote set-url origin https://hub.fastgit.org/xxxx/xxxx.git
```

### 配置代理
```shell
git config --global http.proxy "127.0.0.1:1080"
git config --global https.proxy "127.0.0.1:1080"
```

### 删除代理
```shell
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 无法推送
#### for mac
检查
```shell
sudo vim /etc/hosts
```
如果发现有
```shell
192.30.253.113 github.com
```
注释或者删除