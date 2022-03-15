### 1

试试这些接口，电影项目的
正在热映
http://39.97.33.178/api/movieOnInfoList?cityId=10

即将上映
http://39.97.33.178/api/movieComingList?cityId=10

搜索
http://39.97.33.178/api/searchList?cityId=10&kw=a

城市
http://39.97.33.178/api/cityList

电影详情
http://39.97.33.178/api/detailmovie?movieId=345808

影院
http://39.97.33.178/api/cinemaList?city=10

城市定位
http://39.97.33.178/api/getLocation

### 2

apikey： apikey=0df993c66c0c636e29ecbb5344252a4a

由于最近 API 有变化，需要在请求 API 的 url 后面跟一个 apikey 参数：

电影列表 API：http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10

电影详情 API：http://api.douban.com/v2/movie/subject/${event.movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a
亲测有效！！！！！！！

### 3

https://douban.uieee.com/v2/movie/in_theaters?start=0&count=20

详情使用这个： https://douban.uieee.com/v2/movie/subject/:id 
（这个把id替换成电影的id就好了）
我也是在百度翻到的 我可以获取到数据 分享给大家 大家都加油
