# vue-grid-canvas

> a vue component，基于vue的表格组件，主要解决大数据量的表格渲染性能问题，使用canvas绘制表格，同时支持类似excel的批量选中，复制黏贴删除，实时编辑等功能，目前还在不断努力完善中，希望大家支持下，你们的star就是我的动力。有任何建议或帮助，可以邮件联系:zhaoyh294@163.com。

![vue-grid-canvas](https://github.com/Harveyzhao/vue-grid-canvas/blob/master/WechatIMG132.jpeg?raw=true)


## Install

#### NPM / Yarn

Install the package:

```
npm install vue-grid-canvas --save
```

Then import it in your project

```js
import Vue from 'vue'
import Grid from 'vue-canvas-grid'

Vue.component('grid', Grid)
```

## Usage

Simply use it like so:

```html
<grid :grid-data="data" :columns="columns" showCheckbox columnSet></grid>
```

##公式（‘=’开头，只支持toolbar上输入框填写）：

Example:

```
=include(1-3,5)=>h*1.1 & include(4,6--)=>i*1.2 
```

* 1，支持多个公式拼接（‘&’）
* 2，支持区域自定义选择（‘区域=>公式’）
* 3，区域选择支持include，exclude（include可以省略，exclude可简写‘!’）
* 4，区域选择括号内内容，‘-’为区间，‘,’为并集
* 5，选中单列区域自动显示批量编辑按钮，点击自动填写公式

## Description
* 1，通过canvas实现，能处理万级数据
* 2，类似excel，选中单元格并实时编辑
* 3，复制黏贴，支持批量，从excel复制，复制到excel都可以
* 4，撤销／前进
* 5，checkbox勾选框，全选功能，可开关
* 6，固定列（目前只支持固定到右侧）
* 7，删除单元格，支持批量
* 7，支持文本的重新计算渲染（通过计算的单元格不支持实时编辑）
* 8，支持基础按钮显示及点击事件
* 9，隐藏列功能，可开关
* 10，基础公式计算


##TODO：
* 1，由于使用canvas不支持浏览器的检索功能，以后加上表格的搜索功能
* 2，行列拖拽
* 3，基本公式计算（部分）




## 运行项目DEMO

``` bash

npm install

npm run dev

