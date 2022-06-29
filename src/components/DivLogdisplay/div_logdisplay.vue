<template>
  <div class="divlogdisplay">
    <el-descriptions
      class="margin-top" title="" :column="3" size="size"
      :message="datemessage"
      :time="time"
      border
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-info" />
          TXRX
        </template>
        <label v-if="TXRX">
          发布
        </label>
        <label v-if="!TXRX">
          接收
        </label>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone" />
          消息
        </template>
        <label>
          {{ seq }}
        </label>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline" />
          CMD
        </template>
        <label>
          GUN
        </label>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets" />
          枪号
        </template>
        <el-tag v-if="gun==1" size="small">枪 1</el-tag>
        <el-tag v-if="gun==2" size="small">枪 2</el-tag>
        <el-tag v-if="gun==3" size="small">桩体</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-date" />
          时间
        </template>
        <label>
          {{ messtime }}
        </label>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      title="" direction="vertical" :column="1" border
      style="margin-top:-1px"
    >
      <el-descriptions-item label="Message">{{ datemessage.value }}</el-descriptions-item>
    </el-descriptions>

  </div>
</template>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  border: 0;
}

.divlogdisplay {
  margin-left: 5px;
  margin-top: 10px;
 border:1px solid #8917ca;
 .el-col{
  border:0px solid #DCDFE6;
  margin:1px 0px 1px 0px
 }
 .el-row {
     margin-top: 0px !important;
     margin-left: 0px !important;
    }
}
</style>
<script>
export default {
  name: 'DivLogdisplay',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    datemessage: Object,
    // eslint-disable-next-line vue/require-default-prop
    time: String
  },
  data() {
    return {
      filterText: '',
      TXRX: false,
      seq: 1,
      cmd: '',
      gun: 1,
      messtime: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.AlaysisValue()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    AlaysisValue() {
      var mess = JSON.parse(JSON.stringify(this.datemessage))
      console.log(mess)
      this.TXRX = mess.value.TXRX
      this.seq = mess.value.SEQ
      this.cmd = mess.value.cmd
      this.gun = mess.value.gun
      this.messtime = this.time.split('/')[0].toString()
      // eslint-disable-next-line no-unneeded-ternary
      this.TXRX = this.time.split('/')[1].toString() === '发布' ? true : false
    }
  }
}
</script>
