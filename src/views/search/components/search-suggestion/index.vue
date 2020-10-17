<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(str, index) in suggestions"
      :key="index"
      icon='search'
      @click="$emit('search',str)">
      <div slot="title" v-html="heighLinght(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchIndex',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  methods: {
    heighLinght (str) {
      return str.replace(new RegExp(this.searchText, 'gi'), `<span style='color:red'>${this.searchText}</span>`)
    }
  },
  components: {},
  watch: {
    searchText: {
      handler: debounce(async function () {
        const { data } = await getSearchSuggestion(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      immediate: true
    }
  }
}
</script>
<style scoped lang='less'>
  .search-suggestion{
    font-size: 14px;
  }
</style>
