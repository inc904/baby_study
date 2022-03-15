<template>
  <div class="news-info">
    <h2 class="title">{{newsinfo.title}}</h2>

    <p class="sub-title">
      <span>发表时间：{{newsinfo.add_time | formatDate}}</span>
      <span>点击量：{{newsinfo.clicked}}次</span>
    </p>
    <div class="content" v-html="newsinfo.content">
      <!-- {{this.newsinfo.content}} -->
    </div>
    <cmt :newsid="this.id"></cmt>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

import cmt from "../sub_components/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  components: {
    cmt
  },
  methods: {
    getNewsInfo() {
      this.axios.get("api/getnewsdetail?newsId=" + this.id).then(response => {
        console.log(response.data);
        if (response.data.status != 1) {
          Toast("加载新闻列表失败了。。。");
        }
        this.newsinfo = response.data.news;
      });
    }
  },
  created() {
    this.getNewsInfo();
  }
};
</script>
<style lang="scss" scoped>
.news-info {
  margin-bottom: 100px;

  padding: 3px;
  .title {
    color: #226aff;
    font-size: 26px;
    text-align: center;
  }
  .sub-title {
    display: flex;
    justify-content: space-between;
    span {
      color: #226aff;
      font-size: 14px;
    }
  }
  .content {
    margin-bottom: 20px;

    img {
      width: 100%;
    }
  }
}
</style>