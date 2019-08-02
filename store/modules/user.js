import { auth, db, storage } from '~/plugins/firebase'

export const state = () => ({
  uid: null,
  user: {
    username: 'user',
    email: null,
    emailVerified: null,
    photoURL: '',
    idDoc: '',
    accessToken: '',
    phoneNumber: '',
    providerData: '',
    community: '' // Haciendo referencia a Global
  }
})

export const getters = {
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
  SIGN_IN: (ctx, { email, password }) => {
    return auth.signInWithEmailAndPassword(email, password)
  },
  SIGN_OUT: ({ commit }) => {
    auth.signOut().then(() => {
      commit('SET_AUTHID', null)
    })
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
