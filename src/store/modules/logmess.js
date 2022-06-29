const state = {
  logmessage: {}
}

const mutations = {
  SaveMessage: (state, time, log) => {
    state.SaveMessage.push(time, log)
  },
  Clearlog: (state) => {
    state.SaveMessage.clear()
  }
}

const actions = {
  SaveLog: (context, time, log) => {
    context.commit('SaveMessage', time, log)
  },
  Clearlog: (context) => {
    context.commit('Clearlog')
  }
}

export default {
  state,
  mutations,
  actions
}
