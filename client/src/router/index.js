import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import DetailPhoto from '@/components/DetailPhoto'
import Profile from '@/components/Profile'
import NotFound from '@/components/NotFound'
import Post from '@/components/Post'
import EditProfile from '@/components/EditProfile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      children: [
        {
          path: '/photo/:id',
          component: DetailPhoto,
          props: true
        }
      ]
    },
    {
      path: '/profile/:username',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/notfound',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/:username/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/:username/editprofile',
      name: 'EditProfile',
      component: EditProfile
    }
  ]
})
