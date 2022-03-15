<template>
  <div class="news-info">
    <h3 class="title">{{newsinfo.title}}</h3>

    <p class="sub-title">
      <span>发表时间：{{newsinfo.add_time | formatDate}}</span>
      <span>点击：{{newsinfo.click}}次</span>
    </p>
    <hr />
    <div class="content" v-html="newsinfo.content">
      <!-- {{this.newsinfo.content}} -->
    </div>
    <cmt :newsid="this.id"></cmt>
  </div>
</template>

<script>
import {Toast} from "mint-ui";

import cmt from "../sub_components/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {},
    };
  },
  components: {
    cmt
  },
  methods: {
    getNewsInfo() {
      this.axios.get("/api/getnew/" + this.id).then(response => {
        console.log(response.data);
        if (response.data.status != 0) {
          Toast("加载新闻列表失败了。。。");
        }
        this.newsinfo = response.data.message[0];
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
    color: red;
    font-size: 16px;
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