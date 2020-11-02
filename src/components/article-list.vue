<template>
  <div class="articl-list">
    <van-pull-refresh
      v-model="isPullRefreshLoading"
      @refresh="onRefresh"
      :success-text='successText'
      success-duration='1500'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <articlListItem v-for="(item) in articlesList" :key="item.art_id.toString()" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticles } from '@/api/articles'
import articlListItem from './article-list-item.vue'
export default {
  name: 'articlList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    articlListItem
  },
  data () {
    return {
      articlesList: [],
      loading: false,
      finished: false,
      timestamp: null,
      isPullRefreshLoading: false,
      successText: ''
    }
  },
  computed: {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data || []
      this.articlesList.push(...results)
      this.loading = false
      if (results.length) {
        this.timestamp = data.data.timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articlesList.unshift(...results)
      this.successText = `更新了${results.length}数据`
      this.isPullRefreshLoading = false
    }
  }
}
</script>
<style scoped lang='less'>
  .articl-list{
    height: calc(100vh - 46px - 46px - 50px);
    overflow-y: auto;
    font-size: 14px;
  }
</style>
