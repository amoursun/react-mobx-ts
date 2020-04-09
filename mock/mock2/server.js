var express = require("express")
var app = express();
const Mock = require('mockjs'); //引入mock模块
var bodyParser = require('body-parser');
const chokidar = require('chokidar')
const path = require('path')

app.use(bodyParser.json());  //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({ //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}));

var router = express.Router();

app.get('/', function(req, res) {
  res.send('hello world是防守打法');
});
// 路由api对应的模拟数据
app.all('/apis', function (req, res) {
// mockjs中属性名‘|’符号后面的属性为随机属性，数组对象后面的随机属性为随机数组数量，正则表达式表示随机规则，+1代表自增

  res.json(Mock.mock({
    "status": 200,
    "data|1-19": [{
      "name|5-8": /[a-zA-Z]/,
      "id|+1": 1,
      "value|0-500": 200
    }]
  }));
});


// /api/test/xxxx
router.use("/test",require('./test'));
app.use("/api",router);

chokidar.watch(path.resolve(__dirname, '..'), {
  ignored: /mock-server/,
  ignoreInitial: true
}).on('all', (event, path) => {
  if (event === 'change' || event === 'add') {
    try {
      console.log(event)
    } catch (error) {
      console.log(error)
    }
  }
})

app.listen(3001, 'localhost', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('mock 服务启动, 端口号:' + 3001);
});

// 热更新

