<template>
  <div class="Originalmessage">
    <el-form ref="form" v-model="value" label-width="100px">
      <el-col span="12"><div>
        <el-row>
          <el-col :span="8">
            <label>发送数据：</label>
          </el-col>
          <el-col :span="16">
            <el-button type="primary medium" @click="GetInfo">JSON命令</el-button>
            <el-button type=" medium" @click="GetInfo">日志清理</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-input v-model="Sendtextarea" type="textarea" :rows="40" placeholder="请输入内容" />
          </el-col>
        </el-row>
      </div></el-col>
      <el-col span="12"><div>
        <el-row>
          <el-col :span="24">
            <div id="scrol" class="showarea">
              <DivLogdisplay
                v-for="(item, index) in logArr"
                :key="index"
                ref="DivLogdisplay"
                size="medium"
                :datemessage="item"
                :time="item.key"
              />
            </div>
          </el-col>
        </el-row>
      </div></el-col>

    </el-form>
  </div>
</template>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  border: 0;
}

.Originalmessage {
  margin-top: 30px;
    .el-row {
     margin-top: 10px;
     margin-left: 30px;
    }
    .el-button{
      float: right;
      margin-left: 20px;
    }
.showarea{
  height: 833px;
  border:1px solid #DCDFE6;
   overflow-y:scroll;
}
}
</style>
<script>
import DivLogdisplay from '@/components/DivLogdisplay/div_logdisplay.vue'

export default {
  components: {
    DivLogdisplay
  },
  data() {
    return {
      Sendtextarea: '',
      Journaltextarea: '',
      value: {},
      logArr: []
    }
  },
  created() {
    this.ShwoMessage()
  },
  methods: {
    ShwoMessage() {
      const myMap = this.global.ws.logMess
      //  this.logArr = Array.from(myMap)
      this.logArr = []
      for (const [key, value] of myMap.entries()) { // 遍历map
        // eslint-disable-next-line no-new-object
        var obj = new Object()
        obj.key = key
        obj.value = value
        this.logArr.push(obj)
        console.log(obj.key + ' = ' + obj.value)
      }
      console.log('长度：' + myMap.size)

      setTimeout(() => {
        var div = document.getElementById('scrol')
        div.scrollTop = div.scrollHeight
      }, 10)
    },
    ClearLog() {
      this.global.ws.logMess.clear()
      this.ShwoMessage()
    },
    GetInfo() {
      this.global.ws.publish('20220620000001D', JSON.parse(this.Sendtextarea.replace(/\s*/g, '').replace(/[\\]/g, '')), this.global.ws.options)
      setTimeout(() => {
        console.log('发送读取命令-------')
        this.ShwoMessage()
      }, 1000)
    }
  }
}
</script>
