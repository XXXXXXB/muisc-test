<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="(comment, index) in list"
        :key="index"
        :title="comment.content" /> -->
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
      ></comment-item>
    </van-list>
  </div>
</template>
<script>
import commentItem from './comment-item'
import { getComments } from '@/api/comment'
export default {
  name: 'commentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  computed: {},
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getComments({
        type: 'a',
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      this.$emit('update-totle-count', data.data.total_count)
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  },
  components: {
    commentItem
  }
}
</script>
<style scoped lang='less'>

</style>
