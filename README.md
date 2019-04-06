## 介绍

#### 简单的配置 webpack 引入 VUX  => 一个凑合的 Vue.js 移动端 UI 组件库

#### 初始化项目
1. 已配置 eslint
```
建议对编辑器配置 eslint 保存自动格式代码。
```

2. 已配置 px2rem  
```
项目以 @2x屏为标准
注意: vux 使用的是less，为了适配，webpack.config.js 当中配置的 less-loader 非@2x屏标准 !
```
3. webpack.config.js 引入的 ./src/viewport.js 是第三方库 hotcss https://github.com/imochen/hotcss
```
根据当前环境计算出最适合的 viewport
```

## 使用
```
git clone https://github.com/xyuh111/vux-init.git

cd vux-init

npm install

npm start
or
npm run build
```
