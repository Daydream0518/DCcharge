import mqtt from 'mqtt'
import moment from 'moment'

const Mqtt = function(config) {
  this.mqtt = mqtt
  const options = {
    clientId: config.clientId,
    username: config.username,
    password: config.password,
    connectTimeout: 5000,
    keepalive: 100,
    clean: false
  }
  this.logMess = new Map()
  this.client = this.mqtt.connect('ws://' + config.url, options)
  this.reconnectNum = 0
  // 建立mqtt连接
  this.connect = function() {
    return new Promise((resolve, reject) => {
      this.client.on('connect', error => {
        console.log('已建立连接:', error)
        resolve(this.client)
      })
      this.client.on('reconnect', error => {
        this.reconnectNum++
        if (this.reconnectNum >= 1) this.client.end(true)
        console.log('正在重连:', error)
      })
      this.client.on('error', error => {
        console.log('订阅失败', error)
        reject()
      })
    })
  }
  // 订阅消息
  this.subscribe = function(topic, options) {
    this.client.subscribe(topic, options, err => {
      if (!err) {
        console.log('订阅成功-----------------------' + topic)
      } else {
        throw new Error(err)
      }
    })
  }
  // 发布消息
  this.publish = function(topic, sendMsg, options) {
    this.client.publish(topic, JSON.stringify(sendMsg), options, err => {
      if (!err) {
        var today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '/发布'
        sessionStorage.setItem(today, sendMsg)
        this.logMess.set(today, sendMsg)
      } else {
        throw new Error(err)
      }
    })
  }

  this.Isreceived = false
  this.mess = ''
  this.data1
  // 接收收到的消息
  this.message = function() {
    this.Isreceived = false
    this.client.on('message', (topic, message) => {
      if (topic === '20220620000001U') {
        var today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + '/接收'
        try {
          this.mess = this.mess + message
          JSON.parse(this.mess)
        } catch (err) {
          console.log('message catch---' + err)
          return
        }
        this.Isreceived = true
        console.log('mqtt接收到完整包' + this.mess)
        this.logMess.set(today, JSON.parse(this.mess))
        this.data1 = JSON.parse(this.mess)
        this.mess = ''
      }
    })
  }
  // 关闭mqtt链接
  this.unsubscribe = function(topic, options) {
    this.client.unsubscribe(topic, options, error => {
      if (error) {
        console.log('Unsubscribe error', error)
        return
      }
    })
  }
  // 关闭mqtt链接
  this.close = function() {
    this.client.end(true)
  }
}

export default Mqtt
