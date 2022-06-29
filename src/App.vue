<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import MQTT from '@/api/mqtt'

export default {
  name: 'App',
  data: function() {
    return {
      connection: {
        clientId: 'mqttjs_3be2c321',
        username: 'emqx_test',
        password: 'emqx_test',
        url: `106.13.50.13:8083/mqtt`
      }
    }
  },
  created() {
    this.linkmqtt()
  },
  methods: {
    linkmqtt() {
      console.log('app.vue_11111111')
      this.ws = new MQTT(this.connection)
      this.global.setWs(this.ws)
      this.ws.connect()
      this.ws.subscribe('20220620000001U')
      this.ws.subscribe('20220620000001D')
      this.global.ws.message(this.global.ws.GetMessage)
    }
  }
}
</script>
