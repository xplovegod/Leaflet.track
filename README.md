# Leaflet.track
车辆轨迹

 1. 下载Zrender: https://github.com/ecomfe/zrender,  放到目录 apache-tomcat-7.0.61\webapps\zrender
 2. 下载Leaflet.track， 放到目录 apache-tomcat-7.0.61\webapps\Leaflet.track

2. 或者修改配置 : /src/simpleTrack.js  line74
```javascript
Zrender配置
        require.config({
            packages: [{
                name: 'zrender',
                location: '../../zrender/src',
                main: 'zrender'
            }]
        });
```

###启动tomcat打开demo页面：http://localhost:8080/Leaflet.track/demo/index.html
