var Mock = require("mockjs")
var express = require("express")
var router = express.Router();

router.use("/profile",function (req,res) {
  console.log(req.body);
  //调用mock方法模拟数据
  let data = Mock.mock({
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
      }]
    }
  );
  return res.json(data);
})


router.use("/profiles",function (req,res) {
  console.log(req.body);
  //调用mock方法模拟数据
  let dataSource = Mock.mock({
    'dataSource|5':[{
      'key|+1': 1,
      'mockTitle|1':['哑巴', 'Butter-fly', '肆无忌惮', '摩天大楼', '初学者', '摩等'],
      'mockContent|1': ['你翻译不了我的声响', '数码宝贝主题曲', '摩天大楼太稀有', '像海浪撞破了山丘'],
      'mockAction|1': ['下载', '试听', '喜欢']
    }]
  })
  return res.json(dataSource);
})

module.exports = router;
