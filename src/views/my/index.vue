<template>
  <div>
    <div class="my_info">
      <div v-if='user'>
        <div  class="base_info">
          <div>
            <img :src="userInfo.photo">
            <span>{{userInfo.name}}</span>
          </div>
          <div class="edit_info">编辑资料</div>
        </div>
        <div class="info_nav">
          <div>
            <div>
              <p class="count">{{userInfo.art_count}}</p>
              <p>头条</p>
            </div>
          </div>
          <div>
            <div>
              <p class="count">{{userInfo.follow_count}}</p>
              <p>关注</p>
            </div>
          </div>
          <div>
            <div>
              <p class="count">{{userInfo.fans_count}}</p>
              <p>粉丝</p>
            </div>
          </div>
          <div>
            <div>
              <p class="count">{{userInfo.like_count}}</p>
              <p>获赞</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="not_login">
        <div @click="$router.push('/login')">
          <img src = "../../assets/images/not_login.png">
        </div>
        <div>
          登录/注册
        </div>
      </div>
    </div>
    <van-grid class="nav_grid" :column-num='2'>
      <van-grid-item class="nav_grid_item" icon-prefix='iconfont' icon="shoucang" text="收藏" />
      <van-grid-item class="nav_grid_item" icon-prefix='iconfont' icon="lishi" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <div v-if="user" class="login_out_cell">
      <span @click="onloginOut">退出登录</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'myIndex',
  data () {
    return {
      userInfo: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    onloginOut () {
      this.$dialog.confirm({
        title: '用户退出',
        message: '确认退出'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {

      })
    },
    async loadUserInfo () {
      const { data } = await getCurrentUser()
      this.userInfo = data.data
      console.log(this.userInfo)
    }
  }
}
</script>

<style lang='less' scoped>
  .my_info{
    background: url('../../assets/images/banner.png') no-repeat;
    background-size: 100% 100%;
    .base_info{
      width: 100%;
      height: 115px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      box-sizing: border-box;
      >div:first-child{
        display: flex;
        align-items: center;
        img{
          width: 66px;
          height: 66px;
          border-radius: 50%;
          margin-right: 11px;
        }
        span{
          font-size: 15px;
          color: #fff;
        }
      }
      .edit_info {
        width: 58px;
        height: 18px;
        line-height: 18px;
        color:#666;
        font-size: 10px;
        background: #FFFFFF;
        border-radius: 8px;
        text-align: center;
      }
    }
    .info_nav{
      width: 100%;
      height: 65px;
      display: flex;
      padding: 0 16px;
      box-sizing: border-box;
      >div{
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #fff;
        font-size: 11.5px;
        .count{
          font-size: 18px;
        }
      }
    }
  }
  .nav_grid{
    .nav_grid_item{
      height: 70px;
    }
  }
  .login_out_cell{
    height: 52px;
    margin-top: 9px;
    text-align: center;
    color: #D86262;
    font-size: 15px;
    line-height: 52px;
    background-color: #fff;
  }
  .not_login{
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    img{
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
    }
  }
</style>
