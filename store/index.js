import Cookies from 'js-cookie'
import { auth, storage, db } from '~/services/firebase'
import apiGeounity from '~/plugins/api'

// import { getUserFromCookie } from '@/helpers'

export const state = () => ({
  loading: false,
  error: false,
  authId: '',
  user: null,
  progressUpload: 0,
  geocommunities: [
    {
      name: 'Global',
      divisionName: 'Continents',
      items: ['Africa', 'Asia', 'Americas', 'Europe', 'Oceania'],
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
    if (state.user && state.user.photoURL) return state.user.photoURL
    else return null
  },
  isAuthenticated: (state) => !!state.user && !!state.authId,
  uid: (state) => {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },
  username: (state) => {
    if (state.user && state.user.username) return state.user.username
    else return null
  },
  // geocmmunities
  geocommunities: (state) => {
    return state.geocommunities.map((item) => {
      const name = item.country || item.state || item.name
      return {
        division: item.divisionName,
        items: item.items,
        name
      }
    })
  },
  continentName: (state) => state.geocommunities[1].name,
  country: (state) => state.geocommunities[2],
  state: (state) => state.geocommunities[3],
  statics: (state) =>
    state.geocommunities[state.geocommunities.length - 1].statics,
  debates: (state) =>
    state.geocommunities[state.geocommunities.length - 1].debates,
  aims: (state) => state.geocommunities[state.geocommunities.length - 1].aims
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
    state.user = {
      ...state.user,
      ...user
    }
  },
  UPDATE_PROGRESS_UPLOAD: (state, sp) => {
    state.progressUpload = sp.toFixed(2)
  },
  UPDATE_USER_IMAGE: (state, photo) => {
    state.user.photoURL = photo
  },
  // geocommnities
  DELETE_LAST_GEOCOMMUNITY: (state) => {
    state.geocommunities.pop()
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
  UPDATE_CONTINENT: (state, payload = {}) => {
    state.geocommunities = [...state.geocommunities.slice(0, 1), payload]
  },
  UPDATE_COUNTRY: (state, payload = {}) => {
    state.geocommunities = [...state.geocommunities.slice(0, 2), payload]
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
  // communities
  UPDATE_CONTINENT: ({ commit }, continent) => {
    apiGeounity
      .get(`/${continent}/countries`)
      .then((res) => {
        const countries = res.data.map((item) => item.country)
        const payload = {
          name: continent,
          divisionName: 'Countries',
          items: countries,
          polls: [],
          statics: [],
          debates: [],
          aims: []
        }
        commit('UPDATE_CONTINENT', payload)
      })
      .catch((e) => console.error(e))
  },
  UPDATE_COUNTRY: ({ commit }, country) => {
    apiGeounity
      .get(`/${country}/states`)
      .then((res) => {
        console.log('Res: ', res)
        const states = res.data.map((item) => item.state)
        const payload = {
          name: country,
          divisionName: 'States',
          items: states,
          polls: [],
          statics: [],
          debates: [],
          aims: []
        }
        commit('UPDATE_COUNTRY', payload)
      })
      .catch((e) => console.error(e))
  },
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
              community:
                state.geocommunities[state.geocommunities.length - 1].name,
              level: state.geocommunities.length
            }
            db.collection('users')
              .add(newUser)
              .then((doc) => {
                console.log('Document written with ID: ', doc.id)
                apiGeounity
                  .post('/signup', { ...newUser, idDoc: doc.id })
                  .then(() => {
                    commit('SET_USER', { ...newUser, idDoc: doc.id })
                    resolve(state.user)
                  })
                  .catch((err) => {
                    reject(new Error(`en la base de datos: ${err}`))
                  })
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
  FETCH_USER: async ({ state, commit }, email) => {
    let user = ''
    user = await apiGeounity.get(`/user/email/${email}`)
    commit('SET_USER', user.data)
  },
  FETCH_AUTH_USER: ({ commit }) => {
    const userId = auth.currentUser.uid
    console.log('userId')
    console.log(userId)
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
  SIGN_OUT: ({ commit, redirect }) => {
    console.log('[STORE ACTIONS] - SIGN_OUT')
    auth.signOut().then(() => {
      Cookies.remove('access_token')
      commit('SET_USER', null)
      commit('SAVE_AUTHID', null)
      return redirect('/')
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
      username: user.username,
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
