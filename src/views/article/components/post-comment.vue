<template>
 <div class="post-comment">
   <van-field
      v-model="message"
      rows="1"
      autosize
      show-word-limit
      type="textarea"
      placeholder="请输入留言"
    />
    <van-button size="mini" @click="onAddComment">发布</van-button>
 </div>
</template>
<script>
import { addComments } from '@/api/comment'
export default {
  name: 'postComment',
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  methods: {
    async onAddComment () {
      const { data } = await addComments({
        target: this.target.toString(),
        content: this.message,
        art_id: !this.articleId ? null : this.articleId.toString()
      })
      this.$emit('onPostSuccess', data.data.new_obj)
    }
  },
  components: {}
}
</script>
<style scoped lang='less'>
.post-comment{
  display: flex;
  align-items: center;
}
</style>
