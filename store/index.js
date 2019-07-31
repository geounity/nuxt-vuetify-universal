import { auth, db, storage } from '~/plugins/firebase'
import apiGeounity from '~/plugins/api'

export const state = () => ({
  loading: false,
  error: false,
  showModalLogin: false,
  authId: null,
  user: {
    username: 'user',
    email: null,
    emailVerified: null,
    photoURL: '',
    idDoc: '',
    accessToken: '',
    phoneNumber: '',
    providerData: '',
    communities: [1] // Haciendo referencia a Global
  },
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
  DELETE_IMAGE_USER: (state) => {
    state.user.photoURL = ''
  },
  DELETE_LAST_GEOCOMMUNITY: (state) => {
    state.geocommunity.pop()
  },
  LOADING_OFF: (state) => {
    state.loading = false
  },
  LOADING_ON: (state) => {
    state.loading = true
  },
  SET_AUTHID: (state, id) => {
    state.authId = id
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
  SET_USER: (state, payload) => {
    state.user = payload
  },
  TOGGLE_MODAL_SIGNIN: (state) => {
    state.showModalLogin = !state.showModalLogin
  },
  UPDATE_USER: (state, payload) => {
    state.user = {
      ...state.user,
      ...payload
    }
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
  },
  UPDATE_USER_IMAGE: (state, photo) => {
    state.user.photoURL = photo
  }
}

export const actions = {
  COMPLETE_INFO_USER: ({ commit }, { fileName, name, lastName, birthDate }) => {
    console.log(
      'fileName',
      fileName,
      'name',
      name,
      'lastname',
      lastName,
      'birthDate',
      birthDate
    )
    storage
      .ref()
      .put(fileName)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot)
      })
  },
  CREATE_POLL: ({ state, commit }, poll) => {
    const newPoll = poll
    const pollId = `poll${Math.random()}`
    newPoll.key = pollId
    newPoll.userId = state.authId
    commit('SET_POLL', { newPoll, pollId })
    commit('APPEND_POLL_TO_USER', { pollId, userId: newPoll.userId })
  },
  CREATE_USER: ({ state, commit }, { email, username, password }) =>
    new Promise((resolve) => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((account) => {
          account.snapshotlayName = username
          console.log('ACCOUNT')
          console.log(account)
          const newUser = {
            email,
            username,
            community: state.geocommunity[state.geocommunity.length - 1].name,
            level: state.geocommunity.length
          }
          db.collection('users')
            .add(newUser)
            .then((doc) => {
              console.log('Document written with ID: ', doc.id)
              commit('UPDATE_USER', { ...newUser, idDoc: doc.id })
              resolve(state.user)
            })
            .catch((e) => {
              console.error('Error adding document: ', e)
            })
          // Guardar en Cloud
          console.log('newUser')
          console.log(newUser)
        })
        .catch((e) => {
          commit('SET_ERROR', e)
        })
    }),
  DELETE_IMAGE_USER: ({ state }, fileName) =>
    storage.ref('images/' + fileName).delete(),
  FETCH_AUTH_USER: ({ commit }) => {
    const userId = auth.currentUser.uid
    commit('SET_AUTHID', userId)
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
  FETCH_USER: ({ state, commit }, { id }) =>
    new Promise((resolve) => {
      // traer de firestore el usuario con sus encuestas
    }),
  GET_POPULATION_TOTAL: () => {
    return apiGeounity.get('/population')
  },
  SIGN_IN: (ctx, { email, password }) => {
    return auth.signInWithEmailAndPassword(email, password)
  },
  SIGN_OUT: ({ commit }) => {
    auth.signOut().then(() => {
      commit('SET_AUTHID', null)
    })
  },
  TOGGLE_MODAL_STATE: ({ commit }, { name, value }) => {
    commit('SET_MODAL_STATE', { name, value })
  },
  UPLOAD_IMAGE_USER: ({ commit }, file) => {
    const uploadTask = storage.ref('images/' + file.name).put(file)
    uploadTask.on(
      'state_changed',
      function(snapshot) {
        commit(
          'UPDATE_PROGRESS_UPLOAD',
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
      },
      function(error) {
        console.log('Error: ', error)
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          commit('UPDATE_USER_IMAGE', downloadURL)
          commit('LOADING_OFF')
        })
      }
    )
  }
}
