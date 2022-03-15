## 所有api的域名为:
baseUrl: http://120.77.181.41:3000
## 首页获取轮播图
地址： api/getcover
返回数据样式：
```json
{
"imgs": [
"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2237275641,3286268943&fm=26&gp=0.jpg",
"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1772621880,239329995&fm=26&gp=0.jpg",
"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3032099697,1357687922&fm=26&gp=0.jpg"
],
"_id": "5cc68c8420fcef0b6c644c79",
"status": 1
}
```
## 获取新闻列表
地址：api/getnews?pageIdx=:id
### 获取新闻详情
地址：http://120.77.181.41:3000/api/getnewsdetail?newsId=0
### 获取评论
地址：http://120.77.181.41:3000/api/getnewscom?newsId=0&pageIdx=1