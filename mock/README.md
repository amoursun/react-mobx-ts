## mock react 调用

### GET
```
fetch("/api/test/profile",{
    method:"GET",
    credentials: 'include'
}).then((response)=>{
    console.log(response);
   
    return response.json()
}).then((response)=>{
    console.log(response)
}).catch((error)=>{
    console.log(error)
})

// axios
```

### POST
```
const params = {
    id: "id",
}
fetch("/api/test/profile", {
    method: "POST",
    credentials: 'include',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(params)
}).then((response) => {
    console.log(response);
    return response.json()
}).then((response) => {
    console.log(response)
}).catch((error) => {
    console.log(error)
})

// axios
```

## 热更新 nodemon
`node mock-start.js`

```
两种 server
server1(server-dev.js text.js)
server2(server-dev.js mock-start.js tests)

```


### YAPI
http://yapi.demo.qunar.com/
高效、易用、功能强大的API管理平台旨在为开发、产品、测试人员提供更优雅的接口管理服务
https://yapi.ymfe.org/documents/mock.html#%E6%96%B9%E5%BC%8F1.-mockjs


https://github.com/marak/Faker.js/
