<template>
  <div class="newslist-container">
    <!-- <h1>新闻列表页面</h1> -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsList/newsInfo/'+item.id" tag="a">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <p class="mui-ellipsis title">{{item.title}}</p>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | formatDate}}</span>
              <span>点击次数：{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data(){
    return {
      newsList:[],
    }
  },
  methods: {
    getNewsList(){
      this.axios.get("/api/getnewslist").then(response => {
        console.log(response.data);
        if (response.data.status != 0) {
          Toast("加载新闻列表失败了。。。");
        }
        this.newsList = response.data.message;
      });
    }
  },
  created(){
    this.getNewsList()
  }
};
</script>

<style scoped lang="scss">
.newslist-container{
  margin-bottom: 120px;
}
.mui-ellipsis.title{
  color: #000;
  font-size: 17px;
}
p.mui-ellipsis{
  display: flex;
  justify-content: space-between;
}
.mui-ellipsis span{
  font-size: 13px;
  color: #25a2ff;
}
</style>