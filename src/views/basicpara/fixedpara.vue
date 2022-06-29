<template>
  <div class="fixedpara">
    <el-form ref="form" v-model="value" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="桩ID" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.ID" size="small" />
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="电表A地址" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.meteraaddr" size="small" />
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="最大电压" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.maxv" size="small" />
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="模块数量" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.modnum" size="small" />
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="电表B地址" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.meterbaddr" size="small" />
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="最小电压" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.openTime" size="small" />
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="桩ID" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.ID" size="small" />
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="电表变比" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.meterK" size="small" />
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="最大电流" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.maxi" size="small" />
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="后台密码" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.home_pwd" size="small" />
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="电表波特率" />
          </el-col>
          <el-col :span="12">
            <el-select v-model="value.meterbaud" placeholder="请选择">
              <el-option v-for="item in aspowlevel" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="绝缘电压" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.insuVol" size="small" />
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-divider />
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="辅助类别" />
          </el-col>
          <el-col :span="12">
            <el-select v-model="value.aspowlevel" placeholder="请选择">
              <el-option v-for="item in aspowlevel" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="模块类型" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.modtype" size="small" />
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="辅助类型" />
          </el-col>
          <el-col :span="12">
            <el-select v-model="value.aspowtype" placeholder="请选择">
              <el-option v-for="item in aspowtype" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="输出模式" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.outputtype" size="small" />
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-col :span="5">
            <el-form-item label="卡类型" />
          </el-col>
          <el-col :span="12">
            <el-input v-model="value.cardtype" size="small" />
          </el-col>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="19" class="rowbutton">
          <el-button :loading="loading.loading_read" @click="GetInfo">读取</el-button>
        </el-col>
        <el-col :span="5">
          <el-button type="primary medium" :loading="loading.loading_save" @click="SaveInfo">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  border: 0;
}
.fixedpara{
  .el-input{
    width: 200px;
  }
  .el-form{
    margin-top: 20px;
  }
}
.rowbutton{
  .el-button{
    float: right;
    margin-right: 50px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      loading: {
        loading_read: false,
        loading_save: false
      },
      value: {},
      aspowlevel: [
        { value: '0', label: '12V' },
        { value: '1', label: '24V' }
      ],
      aspowtype: [
        { value: '0', label: '单辅源' },
        { value: '1', label: '单辅源' }
      ]
    }
  },
  created() {

  },
  methods: {
    GetInfo() {
      this.global.ws.Isreceived = false
      this.global.ws.publish('20220620000001D', 'pushi_1111', this.global.ws.options)
      this.loading.loading_read = true
      setTimeout(() => {
        if (this.global.ws.Isreceived === true) {
          this.value = this.global.ws.data1.DevInfo.rated_data
          console.log('解析完成')
          this.loading.loading_read = false
        } else {
          this.loading.loading_read = false
          console.log('获取数据失败')
        }
      }, 2000)
    },
    SaveInfo() {
      this.global.ws.Isreceived = false
      this.global.ws.publish('20220620000001D', this.value, this.global.ws.options)
      this.loading.loading_save = true
      setTimeout(() => {
        if (this.global.ws.Isreceived === true) {
          this.value = this.global.ws.data1.DevInfo.rated_data
          console.log('解析完成')
          this.loading.loading_save = false
        } else {
          this.loading.loading_save = false
          console.log('获取数据失败')
        }
      }, 2000)
    }
  }
}
</script>
