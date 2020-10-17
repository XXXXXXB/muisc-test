<template>
  <div>
    <van-cell
      title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('delect-all', [])">全部删除</span>
        &nbsp; &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name='delete' @click="isDeleteShow = true"/>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistorys"
      :key="index"
      @click="onDeleteClick(item, index)"
    >
      <van-icon v-if="isDeleteShow" name='close' />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistorys: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  methods: {
    onDeleteClick (history, index) {
      if (this.isDeleteShow) {
        this.searchHistorys.splice(index, 1)
        return
      }
      this.$emit('search', history)
    }
  }
}
</script>
<style scoped lang='less'></style>
