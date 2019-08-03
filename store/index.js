import apiGeounity from '~/plugins/api'

export const state = () => ({
  loading: false,
  error: false,
  showModalLogin: false,
  authId: 333,
  geocommunity: [
    {
      name: 'Global',
      level: 1,
      divisionName: 'Continents',
      polls: '',
      statics: '',
      debates: '',
      aims: ''
    }
  ],
  // , otro tipo de comunidades como las empresas, organizaciones, ideologías
  country: null,
  progressUpload: 0
})

export const getters = {
  items: (state) => {
    return state.geocommunity.map((item) => {
      const name = item.country || item.state || item.name
      return {
        text: name
      }
    })
  },
  country: (state) => state.geocommunity[2],
  state: (state) => state.geocommunity[3],
  statics: (state) => state.geocommunity[state.geocommunity.length - 1].statics,
  debates: (state) => state.geocommunity[state.geocommunity.length - 1].debates,
  aims: (state) => state.geocommunity[state.geocommunity.length - 1].aims
}

export const mutations = {
  DELETE_LAST_GEOCOMMUNITY: (state) => {
    state.geocommunity.pop()
  },
  LOADING_OFF: (state) => {
    state.loading = false
  },
  LOADING_ON: (state) => {
    state.loading = true
  },
  SET_COUNTRY: (state, payload) => {
    state.country = {
      ...state.country,
      ...payload
    }
  },
  SET_ERROR: (state, error) => {
    state.error = error
  },
  SET_MODAL_STATE: (state, { name, value }) => {
    state.modals[name] = value
  },
  TOGGLE_MODAL_SIGNIN: (state) => {
    state.showModalLogin = !state.showModalLogin
  },
  UPDATE_GEOCOMMUNITY: (state, payload = {}) => {
    console.log(payload.name || payload.country)
    const l = state.geocommunity.length
    let i = payload.level
    for (i; i <= l; i++) {
      state.geocommunity.pop()
    }
    state.geocommunity.push(payload)
  },
  UPDATE_PROGRESS_UPLOAD: (state, sp) => {
    state.progressUpload = sp
  }
}

export const actions = {
  CREATE_POLL: ({ state, commit }, poll) => {
    const newPoll = poll
    const pollId = `poll${Math.random()}`
    newPoll.key = pollId
    newPoll.userId = state.authId
    commit('SET_POLL', { newPoll, pollId })
    commit('APPEND_POLL_TO_USER', { pollId, userId: newPoll.userId })
  },
  FETCH_COUNTRY: ({ commit }, code) => {
    return apiGeounity.get(`/country/${code}`).then((country) => {
      const { data } = country
      commit('UPDATE_GEOCOMMUNITY', {
        name: data.in_continent,
        level: 2,
        divisionName: 'Countries'
      }) // Add continent
      commit('UPDATE_GEOCOMMUNITY', { ...data, level: 3 }) // Add country
      commit('SET_COUNTRY', data)
    })
  },
  FETCH_STATES: ({ commit }, countryCode) => {
    return apiGeounity.get(`/${countryCode}/states`)
  },
  GET_POPULATION_TOTAL: () => {
    return apiGeounity.get('/population')
  },
  TOGGLE_MODAL_STATE: ({ commit }, { name, value }) => {
    commit('SET_MODAL_STATE', { name, value })
  }
}
