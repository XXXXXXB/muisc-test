<template>
 <div>
   <van-cell class="comment-item">
     <van-image
      class="avatar"
      slot="icon"
      round
      :src="comment.aut_photo"/>
      <div slot="title">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="">{{ comment.content }}</div>
        <div>
          <span class="pubdate">{{ comment.pubdate | dateTime('MM:DD HH:mm:ss') }}</span>
          <van-button size="mini" round>{{comment.reply_count}}回复</van-button>
        </div>
      </div>
      <div>
        <div @click="onCommentLike">
          <van-icon :name="comment.is_liking?'good-job':'good-job-o'"></van-icon> <span>{{comment.like_count}}</span>
        </div>
      </div>
   </van-cell>
 </div>
</template>
<script>
import { addCommentsLike, deleteCommentsLike } from '@/api/comment'
export default {
  name: 'commentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    async onCommentLike () {
      console.log(11)
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await deleteCommentsLike(commentId)
        this.comment.like_count--
      } else {
        await addCommentsLike(commentId)
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
    }
  },
  components: {}
}
</script>
<style scoped lang='less'>
  .comment-item{
    /deep/ .van-cell__value{
      flex: initial;
    }
    .avatar{
      width: 36px;
      height: 36px;
      margin-right: 13px;
    }
    .name{
      font-size: 14px;
    }
    .content{
      font-size: 16px;
      color: #333;
    }
    .pubdate{
      margin-right: 10px;
      font-size: 10px;
    }
    .good-job{
      display: flex;
      align-items: center;
    }
  }
</style>
