<template>
  <div >
    <form action="/">
      <van-search
        v-model="searchText"
        @search="onSearch"
        show-action
        @focus="isResultShow = false"
        placeholder="请输入搜索关键词" />
    </form>
    <div class="search_content">
      <!-- 搜索结果 -->
      <search-result
        v-if='isResultShow'
        :search-text='searchText'
      />
      <!-- 搜索联想 -->
      <search-suggestion
        v-else-if="searchText"
        :search-text='searchText'
        @search='onSearch'
      />
      <!-- 搜索历史 -->
      <search-history
        v-else
        :searchHistorys='searchHistorys'
        @search='onSearch'
        @delect-all='searchHistorys = $event'
      />
    </div>
  </div>
</template>

<script>
import searchSuggestion from './components/search-suggestion/index'
import searchResult from './components/search-result/index'
import searchHistory from './components/search-history/index'
import { getItem, setItem } from '@/utils/storage'
import { getHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'searchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistorys: []
    }
  },
  methods: {
    onSearch (search) {
      this.searchText = search
      const index = this.searchHistorys.indexOf(search)
      if (index !== -1) {
        this.searchHistorys.splice(index, 1)
      }
      this.searchHistorys.unshift(search)
      this.isResultShow = true
    },
    async loadSearchHistories () {
      let searchHistories = getItem('search-historys')
      if (this.user) {
        const { data } = await getHistories()
        searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      }
      this.searchHistorys = searchHistories
    }
  },
  async created () {
    this.loadSearchHistories()
  },
  components: {
    searchSuggestion,
    searchResult,
    searchHistory
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistorys () {
      setItem('search-historys', this.searchHistorys)
    }
  }
}
</script>

<style scoped lang='less'>
  .search_content{
    position: fixed;
    top: 54px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
</style>
