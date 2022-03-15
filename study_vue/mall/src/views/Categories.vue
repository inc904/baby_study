<template>
  <div>
    <van-search
      v-model="searchData"
      input-align="center"
      placeholder="请输入搜索关键词"
    />
    <van-tree-select
      :items="categoryList"
      height="calc(100vh-50px)"
      :main-active-index.sync="active"
    >
      <template #content>
        <div
          class=""
          v-for="(item, index) in categoryList"
          :key="item.id"
          v-if="active === index"
        >
          <!-- <van-image :src="item.banner_url" /> -->
          <!-- <van-image :src="item.icon_url" /> -->
          <!-- <van-image :src="item.img_url" /> -->
          <van-image :src="item.wap_banner_url" />
          <van-panel :title="item.front_name" :desc="item.front_desc">
            <van-grid :column-num="3">
              <van-grid-item
                :icon="childItem.wap_banner_url"
                :text="childItem.name"
                v-for="childItem in currentCategory.subCategoryList"
                :key="childItem.id"
                :to="/categoryList/ + childItem.id"
              />
            </van-grid>
          </van-panel>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
let items = []
export default {
  data() {
    return {
      searchData: '',
      active: 0,
      categoryData: [],
      currentCategory: {},
    }
  },
  methods: {
    clickCategoryItem() {
      console.log(123)
      this.getCurrentCategoryContent()
    },
    getCurrentCategoryContent: async function() {
      console.log(222)
      let id = this.categoryList[this.active].id
      let result = await this.$http.get(
        `${this.$root.api.CatalogCurrent}?id=${id}`
      )
      console.log(result)
      this.currentCategory = result.data.data.currentCategory
    },
  },
  computed: {
    categoryList: function() {
      if (this.categoryData.categoryList != undefined) {
        const { categoryList } = this.categoryData
        categoryList.map((item) => {
          item.text = item.name
        })
        return categoryList
      } else {
        return []
      }
    },
  },
  watch: {
    active: async function() {
      if (this.categoryList.length !== 0) {
        let id = this.categoryList[this.active].id
        // let result = await this.$http.get(
        //   `${this.$root.api.CatalogCurrent}?id=${id}`
        // )
        let result = await this.$http.get(this.$root.api.CatalogCurrent, {
          params: { id },
        })
        console.log(result)
        this.currentCategory = result.data.data.currentCategory
      } else {
        this.currentCategory = []
      }
    },
  },
  async created() {
    let result = await this.$http.get(this.$root.api.CatalogList)
    console.log(result.data.data)
    this.categoryData = result.data.data
    this.getCurrentCategoryContent()
  },
}
</script>
