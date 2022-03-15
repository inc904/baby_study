const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function loadMovieData(url, callback) {
  var self = this
  wx.request({
    url: url,
    success(res) {
      console.log(res)
      // console.log(res.data.subjects)
      // self.setData({
      //   res: res.data.subjects
      // })
      console.log(888)

      callback(res.data)
    },
    fail(){
      console.log(999)
    }
  })
}
function handleData(moviesData, itemName, callback) {
  var itemList = []
  var temp = {}
  var movies = {}

  for (let i = 0; i < moviesData.length; i++) {
    var data = moviesData[i]
    temp = {
      title: data.title,
      coverImageUrl: data.images.large,
      rating: data.rating.average,
      movieId: data.id
    }
    itemList.push(temp)
  }

  movies[itemName] = itemList
  callback(movies, itemList )
  this.setData({
    movies: movies,
    itemName: itemList
  })
}

module.exports = {
  formatTime: formatTime,
  loadMovieData: loadMovieData,
  handleData: handleData
}
