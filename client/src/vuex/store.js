import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { log } from 'util'
import { stat } from 'fs'
import swal from 'sweetalert'
import Jwt from 'jwt-decode'

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

Vue.use(Vuex)

const state = {
  users: [],
  photos: [],
  photoUser: [],
  formSign: { fullname: '', username: '', password: '', email: '' },
  formSignin: { username: '', password: '' },
  uploads: { url: '', caption: '', token: '' },
  file: '',
  caption: '',
  profile: {},
  userSearch: {},
  urlAvatar: {}
}

const mutations = {
  getAllPhoto (state, payload) {
    state.photos = payload
  },
  getById(state, payload) {
    state.photoUser = payload
  },
  setPhoto (state, payload) {
    state.file = payload
  },
  setProfile (state, payload) {
    state.profile = payload
  },
  setDataUser (state, payload) {
    state.userSearch = payload
  }
}

const actions = {
  getAllPhoto ({ commit }) {
    console.log('MASUK')
    http.get('api/photos')
    .then((data) => {
      console.log('MASA GAKENA', data)
      commit('getAllPhoto', data)
    }).catch(err => {
      console.error(err)
    })
  },
  getById ({commit}) {
    http.get(`api/photos/${state.userSearch.dataUser._id}`)
    .then(({ data }) => {
      console.log(data)
      commit('getById', data)
    })
    .catch(err => console.log(err))
  },
  signup () {
    http.post('api/users', state.formSign)
    .then( (data) => {
      console.log('masuk nih', data)
    })
    .catch(err => console.log('error cuy', state.formSign))
  },
  signin ({commit}) {
    http.post('api/users/signin', state.formSignin)
    .then( ({ data }) => {
      console.log('masuk nih', data)
      commit('setProfile',data)
      localStorage.setItem('isLogin', true)
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('fullname', data.fullname)
      localStorage.setItem('id', data.user_Id)
      window.location.reload()
    })
    .catch(err => console.log('error cuy', state.formSignin))
  },
  uploadsFile () {
    let formDt = new FormData()
    formDt.append('photos', state.file, 'test')
    // formDt.append('photos', state.file)
    console.log('form data ====== :', formDt.get('photos'))
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('http://localhost:3000/api/photos', formDt)
    .then(({data}) => {
      console.log('dataVision :', data)
      // commit('setData', data.guest.nama)
    })
  },
  postPhoto ({ commit }, payload) {
    commit('setPhoto', payload)
  },
  getUsername ({commit}, payload) {
    http.get(`api/users/${payload}`)
    .then( function({data}) {
      console.log('data', data)
      if (data.dataUser === null){ window.location = 'http://localhost:8080/notfound'}
      else {
        commit('setDataUser', data.dataUser)
        http.get(`api/photos/${state.userSearch._id}`)
        .then(({ data }) => {
          console.log(data)
          commit('getById', data)
          if(state.userSearch.followers.indexOf(state.profile.id) != -1) {
            return false
          }
        })
        .catch(err => console.log(err))
      }
    })
  },
  posting({commit}, payload) {
    state.uploads.token = localStorage.getItem('token')
    http.post(`api/photos/${payload}`, state.uploads, {
      headers: {
        'token' : localStorage.getItem('token')
      } 
    })
    .then(({ data }) => {
      swal({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        button: "Aww yiss!",
      })
      window.location = '/profile/payload'
    })
  },
  decoded() {
    let decode = Jwt(localStorage.getItem('token'))
    state.profile = decode
  },
  follow(){
    return new Promise((resolve, reject) => {
      http.put(`/api/users/follow/${state.profile.id}`, { token : localStorage.getItem('token'), userFollow: state.userSearch._id})
      .then( ({data}) => {
        console.log(data)
        resolve(data)
      })
      .catch(err => reject(err))
    })
    
  },
  unfollow(){
    return new Promise((resolve,reject) => {
      http.put(`/api/users/unfollow/${state.profile.id}`, { token : localStorage.getItem('token'), userFollow: state.userSearch._id})
      .then(({data}) => {
        resolve(data)
      })
      .catch(err => reject(err))
    })
  },
  urlAvatar(payload) {
    state.urlAvatar = payload
    console.log('ini payload', state.urlAvatar)
    // http.post('/api/photos', state.urlAvatar)
    // .then(({data}) => {
    //   return data
    // })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
