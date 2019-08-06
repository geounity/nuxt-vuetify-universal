import { auth, db, storage } from '~/plugins/firebase'
import apiGeounity from '~/plugins/api'

export const state = () => ({
  loading: false,
  error: false,
  showModalLogin: false,
  authId: 5656,
  uid: null,
  user: {
    username: '',
    email: null,
    emailVerified: null,
    photoURL: '',
    idDoc: '',
    accessToken: '',
    phoneNumber: '',
    providerData: '',
    community: '' // Haciendo referencia a Global
  },
  geocommunity: [
    {
      name: 'Global',
      level: 1,
      divisionName: 'Continents',
      polls: [],
      statics: [],
      debates: [],
      aims: []
    }
  ],
  // , otro tipo de comunidades como las empresas, organizaciones, ideologías
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
  aims: (state) => state.geocommunity[state.geocommunity.length - 1].aims,
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },
  avatar(state) {
    return state.user.photoURL
  },

  username(state) {
    return state.user.username
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  }
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
  DELETE_IMAGE_USER: (state) => {
    state.user.photoURL = ''
  },
  SET_AUTHID: (state, uid) => {
    state.uid = uid
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  UPDATE_USER: (state, payload) => {
    state.user = {
      ...state.user,
      ...payload
    }
  },
  UPDATE_USER_IMAGE: (state, photo) => {
    state.user.photoURL = photo
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
  CREATE_USER: ({ state, commit }, { email, username, password }) =>
    new Promise(async (resolve, reject) => {
      const exist = await apiGeounity.get(`/user/${username}`)
      if (exist.data) {
        reject(new Error('El usuario ya existe'))
      } else {
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
                apiGeounity.post('/signup', newUser)
                resolve(state.user)
              })
              .catch((e) => {
                reject(new Error(e))
              })
            // Guardar en Cloud
            console.log('newUser')
            console.log(newUser)
          })
          .catch((e) => {
            reject(new Error(e))
          })
      }
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
      commit('UPDATE_GEOCOMMUNITY', {
        ...data,
        name: data.country,
        level: 3
      }) // Add country
    })
  },
  FETCH_STATES: ({ commit }, countryCode) => {
    return apiGeounity.get(`/${countryCode}/states`)
  },
  GET_POPULATION_TOTAL: () => {
    return apiGeounity.get('/population')
  },
  PUT_INFO_USER: (
    { state, commit },
    { fileName, name, lastname, datebirth }
  ) => {
    console.log(
      'fileName',
      fileName,
      'name',
      name,
      'lastname',
      lastname,
      'birthDate',
      datebirth
    )
    const username = state.user.username
    apiGeounity
      .post(`/${username}/aditional-info`, {
        name,
        lastname,
        datebirth
      })
      .catch((e) => {
        commit('SET_ERROR', e)
      })
    storage
      .ref()
      .put(fileName)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot)
      })
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
  UPLOAD_IMAGE_USER: ({ state, commit }, file) => {
    const uploadTask = storage
      .ref('images/' + `${state.user.username}-${file.name}`)
      .put(file)
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
