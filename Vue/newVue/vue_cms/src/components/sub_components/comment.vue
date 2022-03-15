<template>
  <div class="cmt-container">
    <h3 class="t">发表评论</h3>
    <hr />
    <textarea v-model="ucomment" placeholder="请输入要评论的内容。。。" maxlength="120"></textarea>
    <mt-button @click="postComment" type="primary" size="large">发表评论</mt-button>
    <div class="cmt-lists">
      <div class="cmt-item" v-for="(item, index) in commentsInfo" :key="index">
        <div class="cmt-title">
          <p>
            <span>第{{index+1}}楼 用户：{{item.username}}</span>
            <span>发表时间：{{item.comDate | formatDate}}</span>
          </p>
        </div>
        <div class="cmt-body">
          {{item.content=== "" ? "懒得说":item.content}}
          </div>
      </div>
    </div>
    <mt-button @click="getMore" type="danger" size="large" plain>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import xss from "xss";
export default {
  data() {
    return {
      pageindex: 1,
      commentsInfo: [],
      ucomment: ""
    };
  },
  props: ["newsid"],
  methods: {
    getCommonts() {
      this.axios
        .get(
          "api/getnewscom?newsId=" +
            parseInt(this.newsid) +
            "&pageIdx=" +
            this.pageindex
        )
        .then(response => {
          console.log(response.data);
          // console.log(response.data.status === 0);
          // console.log(response.data.message.length != 0);
          if (response.data.status != 1) {
            Toast("加载新闻列表失败了。。。");
          }
            this.commentsInfo = this.commentsInfo.concat(response.data.comments);
            // this.commentsInfo = response.data.comments

          // if (response.data.status === 0 && response.data.message.length != 0) {
          //   this.commentsInfo = this.commentsInfo.concat(response.data.message);
          // } else {
          //   Toast("加载评论失败了。。。");
          // }
        });
    },
    getMore() {
      this.pageindex++;
      this.getCommonts();
    },
    postComment() {
      // if(this.ucomment.trim().length ===0 ){
      //   Toast('评论不能为空')
      // }
      console.log(this.ucomment.trim());
      this.axios
        .post("api/addnewscom?newsId=" + this.$route.params.id, {
          content: xss('asdasss')
        })
        .then(res =>{
          console.log(res)
           if (res.data.status == 1) {
            Toast("提交成功");
            this.commentsInfo.unshift({
              username: 'ni',
              comDate: new Date(),
              content: this.ucomment.trim()
            });
            this.ucomment = "";
          } else {
            Toast("提交失败");
          }
        })
    }
  },
  created() {
    this.getCommonts();
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  .t {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-lists {
    margin-top: 10px;
    .cmt-item {
      margin-bottom: 10px;
      .cmt-title p {
        background-color: #ccc;
        display: flex;
        justify-content: space-between;
      }
      .cmt-body {
        font-size: 18px;
        text-indent: 18px;
      }
    }
  }
}
</style>