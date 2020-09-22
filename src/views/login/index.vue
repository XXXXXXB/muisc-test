<template>
  <div class="">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
      @submit="onLogin"
      :show-error='false'
      :show-error-message='false'
      ref='login-form'
    >
      <van-field
        v-model="user.mobile"
        left-icon="shouji"
        icon-prefix='iconfont'
        placeholder="请输入手机号"
        :rules = 'formRules.mobile'
        name='mobile'
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix='iconfont'
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules = 'formRules.code'
      >
        <template #button>
          <van-count-down
            :time='1000 * 60'
            format='ss s'
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            size="small"
            type="primary"
            round
            @click.prevent="onSendSms"
            :loading='isSendSmsLoading'
          >发送验证码</van-button>
        </template>
      </van-field>
      <van-button type="info" block>登录</van-button>
    </van-form>
  </div>
</template>
<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        Toast.success('登录成功')
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (err) {
        console.log(err)
        Toast.fail('登录失败')
      }
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        console.log(err)
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>
<style lang="less" scoped>

</style>
