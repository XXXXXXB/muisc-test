<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      prePage: 10
    }
  },
  computed: {},
  methods: {
    async onLoad () {
      // 1.请求数据
      const { data } = await getSearchResult({
        page: this.page,
        pre_page: this.prePage,
        q: this.searchText
      })
      console.log(data)
      // 2.将数据放到数据列表
      const { results } = data.data
      this.list.push(...results)
      // 3.关闭本次loading
      this.loading = false
      // 4.判断是否还有数据
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  },
  components: {}
}
</script>
<style scoped lang='less'></style>
