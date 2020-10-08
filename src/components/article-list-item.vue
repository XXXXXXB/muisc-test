<template>
  <van-cell >
    <div class="van-multi-ellipsis--l3" slot="title">{{ article.title }}</div>
    <div slot="label">
      <div class="cove-wrap" v-if="article.cover.type === 3">
        <div class="cove-wrap-item" v-for="(item, index) in article.cover.images" :key="index">
          <van-image height='100%' :src="item" />
        </div>
      </div>
      <span class="lable_font">{{article.aut_name}}</span>
      <span class="lable_font">{{article.comm_count}}评论</span>
      <span class="lable_font">{{article.pubdate | relativeTime}}</span>
    </div>
    <div >
      <van-image class="right-cover" v-if="article.cover.type === 1" :src="article.cover.images[0]" />
    </div>
  </van-cell>
</template>
<script>
export default {
  name: 'listItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
  .van-list{
    .van-cell__title{
      font-size: 16px;
      color: #3A3A3A;
    }
    .van-cell__value{
      flex: unset;
    }
    .right-cover{
      width: 116px;
      height: 73px;
      margin-left: 12px;
      flex: unset;
    }
    .cove-wrap{
      display: flex;
      .cove-wrap-item{
        height: 73px;
        flex: 1;
        padding: 15px 0;
      }
      &:not(:last-child){
        padding-right: 4px;
      }
    }
    .lable_font{
      padding-left: 10px;
      &:first-child{
        padding-left: 0;
      }
    }
    /deep/ .van-tabs__line{
      background-color: #3296FA;
    }
  }
</style>
