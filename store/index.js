import Cookies from 'js-cookie'
import { auth, storage, db } from '~/plugins/firebase'
import apiGeounity from '~/plugins/api'

// import { getUserFromCookie } from '@/helpers'

export const state = () => ({
  loading: false,
  error: false,
  showModalLogin: false,
  authId: '',
  user: {
    uid: '',
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
  progressUpload: 0,
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
  ]
  // , otro tipo de comunidades como las empresas, organizaciones, ideologías
})

export const getters = {
  // users
  avatar: (state) => {
    if (state.user) return state.user.photoURL
    else return null
  },
  isAuthenticated: (state) => !!state.user && !!state.authId,
  uid: (state) => {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },
  username: (state) => state.user.username,
  // geocmmunities
  items: (state) => {
    return state.geocommunity.map((item) => {
      const name = item.country || item.state || item.name
      return {
        text: name
      }
    })
  },
  continent: (state) =>
    state.geocommunity.length > 1 ? state.geocommunity[1] : '',
  country: (state) => state.geocommunity[2],
  state: (state) => state.geocommunity[3],
  statics: (state) => state.geocommunity[state.geocommunity.length - 1].statics,
  debates: (state) => state.geocommunity[state.geocommunity.length - 1].debates,
  aims: (state) => state.geocommunity[state.geocommunity.length - 1].aims
}

export const mutations = {
  // users
  DELETE_IMAGE_USER: (state) => {
    state.user.photoURL = ''
  },
  SET_AUTHID(state, uid) {
    console.log('[STORE MUTATIONS] - SAVE_UID:', uid)
    state.authId = uid
  },
  SET_USER(state, user) {
    console.log('[STORE MUTATIONS] - SET_USER:', user)
    state.user = user
  },
  UPDATE_PROGRESS_UPLOAD: (state, sp) => {
    state.progressUpload = sp.toFixed(2)
  },
  UPDATE_USER: (state, payload) => {
    state.user = {
      ...state.user,
      ...payload
    }
  },
  UPDATE_USER_IMAGE: (state, photo) => {
    state.user.photoURL = photo
  },
  // geocommnities
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
  }
}

export const actions = {
  // async nuxtServerInit({ dispatch }, { req }) {
  //   const currentUser = auth.currentUser
  //   console.log('currentUser')
  //   console.log(currentUser)
  //   auth.onAuthStateChanged(function(user) {
  //     if (user) {
  //       console.log('user', user)
  //     }
  //   })
  //   const userCookie = getUserFromCookie(req)
  //   if (userCookie) {
  //     await dispatch('SET_USER', {
  //       name: userCookie.name,
  //       email: userCookie.email,
  //       avatar: userCookie.picture,
  //       uid: userCookie.user_id
  //     })
  //   }
  // },
  // users
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
                commit('SET_USER', { ...newUser, idDoc: doc.id })
                apiGeounity.post('/signup', { ...newUser, idDoc: doc.id })
                resolve(state.user)
              })
              .catch(() => {
                reject(new Error('Problemas al guardar en Firestore'))
              })
            // Guardar en Cloud
          })
          .catch(() => {
            reject(
              new Error(
                'La dirección de correo ya esta siendo usada por otra cuenta.'
              )
            )
          })
      }
    }),
  DELETE_IMAGE_USER: ({ state }, fileName) =>
    storage.ref('images/' + fileName).delete(),
  FETCH_FLAGS: ({ commit }) => {
    let countries = []
    return apiGeounity
      .get('/countries')
      .then((res) => {
        countries = res.data
        const arrFlags = countries.map((country) => country.flag)
        console.log('[ARR DE FLAGS]')
        console.log(arrFlags)
        return arrFlags
      })
      .catch((e) => {
        commit('SET_ERROR', e)
      })
  },
  FETCH_USER: ({ state, commit }, { id }) =>
    new Promise((resolve) => {
      resolve('Hola fetch user')
    }),
  FETCH_AUTH_USER: ({ commit }) => {
    const userId = auth.currentUser.uid
    commit('SET_AUTHID', userId)
  },
  PUT_INFO_USER: ({ state, commit }, payload) => {
    console.log('[STORE PUT_INFO_USER]', payload)
    const username = state.user.username
    apiGeounity.post(`/${username}/aditional-info`, payload).catch((e) => {
      commit(
        'SET_ERROR',
        `No se pudo actualizar la información del usuario ${e}`
      )
    })
  },
  PUT_PHOTO_USER: ({ state, commit }, payload) => {
    console.log('[STORE PUT_PHOTO_USER]', payload)
    const username = state.user.username
    apiGeounity.post(`/${username}/addphoto`, payload).catch((e) => {
      commit('SET_ERROR', `No se pudo cargar la imagen ${e}`)
    })
  },
  SIGN_IN: (ctx, { email, password }) => {
    return auth.signInWithEmailAndPassword(email, password)
  },
  SIGN_OUT: ({ commit }) => {
    console.log('[STORE ACTIONS] - SIGN_OUT')
    auth.signOut().then(() => {
      Cookies.remove('access_token')
      commit('SET_USER', null)
      commit('SAVE_AUTHID', null)
    })
  },
  UPLOAD_IMAGE_USER: ({ state, dispatch, commit }, file) => {
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
        console.log('Error al cargar la imagen: ', error)
      },
      function() {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          commit('UPDATE_USER_IMAGE', downloadURL)
          dispatch('PUT_PHOTO_USER', downloadURL)
          commit('LOADING_OFF')
        })
      }
    )
  },
  // polls
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
  LOGIN: async ({ dispatch, state }, user) => {
    console.log('[STORE ACTIONS] - login')
    const token = await auth.currentUser.getIdToken(true)
    const userInfo = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid
    }

    Cookies.set('access_token', token) // saving token in cookie for server rendering
    await dispatch('SET_USER', userInfo)
    await dispatch('SAVE_UID', userInfo.uid)
    console.log('[STORE ACTIONS] - in login, response:', status)
  },
  TOGGLE_MODAL_STATE: ({ commit }, { name, value }) => {
    commit('SET_MODAL_STATE', { name, value })
  }
}
