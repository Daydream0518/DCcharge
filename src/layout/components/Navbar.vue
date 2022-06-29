<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <label v-show="!InputShow" for="">当前SN:{{ NowSN }}</label>
      <el-input v-show="InputShow" v-model="SetSN" />
      <el-button class="Showbutton" @click="BindMqtt">{{ ButtonText }}</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      SetSN: '',
      NowSN: '20220620000001',
      InputShow: false,
      ButtonText: '切换设备'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    BindMqtt() {
      if (this.ButtonText === '切换设备') {
        this.ButtonText = '订阅设备'
        this.InputShow = true
      } else {
        this.global.ws.unsubscribe('20220620000001U')
        this.global.ws.subscribe('20220620000001U')
        this.global.ws.subscribe('20220620000001D')
        this.NowSN = this.SetSN
        this.InputShow = false
        this.ButtonText = '切换设备'
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.Showbutton{
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    width: 300px;
    .el-input{
      width: 200px !important;
    }
    .el-button{
     margin-left: 10px;
      width: 80px !important;
    }
  }
}
</style>
