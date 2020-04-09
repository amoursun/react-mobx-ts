const express = require('express'); //引入express模块
const Mock = require('mockjs'); //引入mock模块
const app = express(); //实例化express
const path = require("path"); //引入path模块 核心模块不许要npm
const fs = require('fs'); // 引入fs模块 核心模块不许要npm

// 读取配置文件 将路由和文件对应上
fs.readFile(__dirname + '/tests/conf.json', 'utf-8', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    let dataObject = JSON.parse(data);
    console.log(dataObject)
    for (let key in dataObject) {
      app.all(dataObject[key].url, function (req, res) {
        fs.readFile(path.join(__dirname + '/tests', dataObject[key].path), 'utf-8', function (err, data) {
          if (err) {
            console.log(err);
          } else {
            res.json(Mock.mock(JSON.parse(data)));
          }
        })
      });
    }
  }
});

app.listen(3002, 'localhost', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('mock 服务启动, 端口号:' + 3002);
});
