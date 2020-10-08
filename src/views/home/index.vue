<template>
  <div>
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        type="info"
        slot="title"
        round
        icon='search'
        size='small'
        >搜索</van-button>
    </van-nav-bar>
    <van-tabs class="home_tabs" v-model="active">
      <van-tab :title="channel.name" v-for="(channel) in channels" :key="channel.id">
        <articlList :channel='channel' />
      </van-tab>
      <div slot='nav-right' class="nav_right">
      </div>
      <div slot='nav-right' class="tab_nav_right" @click="isChannelEditShow=true">
        <van-icon name="apps-o" />
      </div>
    </van-tabs>
    <van-popup
      v-model="isChannelEditShow"
      position='bottom'
      style="height:100%"
      closeable
      close-icon-position="top-left">
        <channelEdit
          :userChannels='channels'
          @closePup='isChannelEditShow = false'
          @updateActive='updateActive'
          :active='active'/>
      </van-popup>
  </div>
</template>
<script>
import { getUserChannels } from '@/api/user'
import articlList from '@/components/article-list'
import channelEdit from '@/components/channel-edit'
export default {
  name: 'homeIndex',
  components: {
    articlList,
    channelEdit
  },
  data () {
    return {
      active: 1,
      channels: [],
      isChannelEditShow: false
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    },
    updateActive (index) {
      this.active = index
    }
  }
}
</script>

<style scoped lang='less'>
  .app-nav-bar{
    background-color: #3296FA;
    /deep/ .van-nav-bar__title{
      max-width: 100%;
    }
    /deep/ .van-button--info{
      border: none
    }
    .search-btn{
      width: 278px;
      margin: 0 auto;
      background-color: rgba(255, 255, 255, .2);
      /deep/ .van-icon{
        color: #fff;
        font-size: 19px;
      }
    }
  }
  .home_tabs {
    .nav_right{
      width: 33px;
      height: 44px;
    }
    .tab_nav_right{
      width: 33px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      right: 0;
      background-color: #fff;
    }
    /deep/ .van-tabs__line{
      background-color: #3296FA;
    }
  }
</style>
