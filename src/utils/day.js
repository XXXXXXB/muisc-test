import dayjs from 'dayjs'
import Vue from 'vue'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置中午语言包
dayjs.locale('zh-cn')
// 相对时间
dayjs.extend(relativeTime)
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
