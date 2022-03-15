<template>
  <div class="list">
    categorylist---{{ this.$route.params.id }}

    <van-tabs v-model="activeName" @change="tabChange">
      <van-tab
        v-for="(item, index) in categoryData.brotherCategory"
        :key="item.id"
        :title="item.name"
        :name="item.id"
      >
        <h3>{{ item.name }}</h3>
        <p>{{ item.front_desc }}</p>
        <van-grid :border="false" :column-num="2">
          <van-grid-item
            v-for="item in catergoryContent.goodsList"
            :key="item.id"
            class="good-item"
            :to="'/goods/' + item.id"
          >
            <van-image :src="item.list_pic_url" lazy-load />
            <!-- <div> -->
            <p class="brief">{{ item.name }}</p>
            <p class="price">${{ item.retail_price }}</p>
            <!-- </div> -->
          </van-grid-item>
        </van-grid>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryData: {},
      activeName: '',
      active: this.$route.params.id,
      catergoryContent: {},
      page: 1,
      size: 10,
      catergoryContent: [],
    }
  },
  computed: {
    activeTab: function() {
      return this.categoryData.brotherCategory.filter((item, index) => {
        if (item.id === Number(this.$route.params.id)) {
          item.index = index
        }
        return item.id === Number(this.$route.params.id)
      })
    },
  },
  watch: {
    activeName: function() {
      this.activeName = this.categoryData.currentCategory.id
    },
  },
  methods: {
    tabChange: async function(name, title) {
      console.log('name', name)
      this.active = name
      this.getGoods(name)
    },
    getGoods: async function(id) {
      console.log('getID:', id)
      let catergoryContentResult = await this.$http.get(
        this.$root.api.GoodsList,
        {
          params: {
            categoryId: id,
            page: this.page,
            size: this.size,
          },
        }
      )
      console.log('catergoryContentResult:', catergoryContentResult.data.data)
      this.catergoryContent = catergoryContentResult.data.data
    },
  },
  async created() {
    let result = await this.$http.get(this.$root.api.GoodsCategory, {
      params: {
        id: this.$route.params.id,
      },
    })
    console.log(result.data.data)
    this.categoryData = result.data.data
    this.getGoods(this.$route.params.id)
  },
}
</script>
<style lang="less">
.list {
  text-align: center;
  min-height: calc(100vh - 50px);
  margin-bottom: 60px;
  .good-item {
    width: 50%;
    .van-grid-item__content {
      padding: 0 3px;
      text-align: left;
      .brief {
        width: 90%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .price {
        color: red;
        text-align: center;
      }
    }
  }
}
</style>
