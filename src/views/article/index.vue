<template>
 <div>
   <div class="article_content">
      <van-nav-bar
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
      />
      <h1 class="title">{{article.title}}</h1>
      <van-cell center class="user_info">
        <div slot="title" class="name">{{article.aut_name}}</div>
        <van-image
          slot="icon"
          round
          fit="cover"
          class="avatar"
          :src="article.aut_photo" />
        <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
        <van-button
          :loading="isfollowLoading"
          @click="onFollow"
          class="follow_btn"
          :icon='article.is_followed ? "":"plus"'
          round
          size='small'
          :type='article.is_followed ? "default":"info"'
        >{{article.is_followed ? "已关注":"关注"}}</van-button>
      </van-cell>
      <div class="content markdown-body" ref="article-content" v-html="article.content"></div>
      <comment-list :source='articleId' :list='commentList' @update-totle-count='totalCommentCount = $event'></comment-list>
    </div>
    <div class="article_bottom">
      <van-button
        class="comment_btn"
        type='default'
        round
        size='small'
        @click="isPopupShow = true"
      >写评论</van-button>
      <van-icon
        color="#777"
        name="comment-o"
        :info="totalCommentCount"
      ></van-icon>
      <van-icon
        :color="article.is_collected ? 'orange' :'#777'"
        :name="article.is_collected ? 'star' :'star-o'"
        @click="onCollectionsClick"
        :loading='isCollectionsLoading'
      ></van-icon>
      <van-icon
        color="#777"
        name="good-job-o"
      ></van-icon>
      <van-icon
        color="#777"
        name="share"
      ></van-icon>
    </div>
    <van-popup
      v-model="isPopupShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <post-comment :target="articleId" @onPostSuccess="onPostSuccess"></post-comment>
    </van-popup>
 </div>
</template>
<script>
import './github-markdown.css'
import { ImagePreview } from 'vant'
import { getArticle, addCollections, deleteCollections } from '@/api/articles'
import { addFollow, deleteFollow } from '@/api/user'
import commentList from './components/comment-list'
import postComment from './components/post-comment'
export default {
  name: 'articleDetail',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isfollowLoading: false,
      isCollectionsLoading: false,
      isPopupShow: false,
      commentList: [],
      totalCommentCount: 0
    }
  },
  created () {
    this.loadArticle()
  },
  computed: {},
  methods: {
    async loadArticle () {
      console.log(this.articleId)
      const { data } = await getArticle(this.articleId)
      this.article = data.data
      this.$nextTick(() => {
        this.handlImagePreview()
      })
    },
    handlImagePreview () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths,
            startPositon: index
          })
        }
      })
    },
    async onFollow () {
      this.isfollowLoading = true
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.isfollowLoading = false
      this.article.is_followed = !this.article.is_followed
    },
    async onCollectionsClick () {
      this.isCollectionsLoading = true
      if (this.article.is_collected) {
        await deleteCollections(this.article.aut_id)
      } else {
        await addCollections(this.article.aut_id)
      }
      this.isCollectionsLoading = false
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '收藏成功' : '取消收藏成功'}`)
    },
    onPostSuccess (data) {
      this.isPopupShow = false
      this.totalCommentCount++
      this.commentList.unshift(data)
    }
  },
  components: {
    commentList,
    postComment
  }
}
</script>
<style scoped lang='less'>
  .article_content{
    width: 100%;
    height: calc(100vh - 45px);
    background-color: #fff;
    overflow: auto;
  }
  .title{
    font-size: 20px;
    margin: 0;
    padding: 14px;
    color: #333;
    background-color: #fff;
  }
  .user_info{
    .name{
      font-size: 11px;
    }
    .pubdate{
      font-size: 10px;
    }
    .follow_btn{
      width: 85px;
      height: 29px;
    }
    .avatar{
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
  }
  .markdown-body{
    background-color: #fff;
    padding: 14px;
  }
  .article_bottom{
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #eee;
    background-color: #fff;
    .comment_btn{
      width: 140px;
      height: 23px;
      margin-left: 10px;
      font-size: 15px;
    }
    i{
      margin: 0 10px;
    }
  }
</style>
