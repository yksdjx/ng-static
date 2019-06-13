* 建议把该前端工程放在原项目平级目录

* npm install

* 如未全局安装 gulp 先全局安装  npm install gulp -g

* 配置 package.json

```json
"config": {
    "port": 3000,
    "links": [
      {
        // view 前端源码
        "view": "../datariver-datastandard/ds/webapp/src/main/webapp/view/",
        
        // 编译打包后代码
        "ds": "../datariver-datastandard/ds/webapp/target/ds/"
      }
    ]
},
```

* app.js apiProxy 配置代理

* gulp symlink  创建软连接

* npm start

* 在原项目 gulp/build 中 启动 gulp ui/ds ...;
