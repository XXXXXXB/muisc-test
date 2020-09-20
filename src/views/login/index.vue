<template>
  <div class="">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        left-icon="shouji"
        icon-prefix='iconfont'
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="music-o"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="small" type="primary" round>发送验证码</van-button>
        </template>
      </van-field>
      <van-button type="info" block @click="onLogin">登录</van-button>
    </van-cell-group>
  </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onLogin () {
      try {
        const res = await login(this.user)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
