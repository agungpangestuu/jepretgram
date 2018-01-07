<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img style="height: 200px; width: 100%; display: block;" src="https://via.placeholder.com/350x150">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>@{{ $route.params.username}}</strong> <a class="btn btn-primary" :href="editProfile" v-if='$route.params.username === profile.username'>Edit Profile</a>
                   <a class="btn btn-primary" v-if='$route.params.username !== profile.username && status' @click="following()">Follow</a>
                   <a class="btn btn-primary" v-if='$route.params.username !== profile.username && !status' @click="unfollowing()">Unfollow</a>
                  <br>
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                    <p class="level-item has-text-centered">
                        <a class="link is-info"  @click='completedTask(task._id)'><strong>{{photoUser.length}}</strong> posts</a>
                      </p>
                      <p class="level-item has-text-centered">
                        <a class="link is-info"><strong>{{userSearch.followers.length}}</strong> followers</a>
                      </p> 
                      <p class="level-item has-text-centered">
                        <a class="link is-info" @click='deleteTask(task._id, task.status)'><strong>{{userSearch.following.length}}</strong> following</a>
                      </p> 
                </div>

              </nav>
              <p class="fullname">
                <strong>{{userSearch.fullname}}</strong>
              </p>
            </div>
          </article>
          <hr>
          <div class="container">
            <div class="row justify-content-md-center">
              <ul class="nav nav-pills">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Post</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Saved</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="photo in photoUser" :key="photo">
          <div style="margin-top:2%; margin-bottom:3%;" class="card mb-3">
            <img style="height: 200px; width: 100%; display: block;" :src="photo.photo" alt="Card image">
            <div class="card-body">
              <p class="card-text">{{photo.caption}}</p>
            </div>
            <div class="card-footer text-muted">
              <div class="row">
                <div class="col-md-6">
                  <a class="fa fa-heart-o fa-2x" aria-hidden="true"> <span class="badge">{{photo.like.length}} Like</span></a>
                </div>
                <div class="col-md-6">
                  <span class="fa fa-comments-o fa-2x" aria-hidden="true"></span>
                </div>
              </div>
             
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  data: function () {
    return {
      photos: 6,
      profiles: { username: '', fullname: '' },
      editProfile: `/${localStorage.getItem('username')}/editprofile`,
      status: true
    }
  },
  methods: {
    ...mapActions([
      'getUsername',
      'getById',
      'follow',
      'unfollow'
    ]),
    following() {
      this.status = false
      this.follow()
      .then(data => {
        this.$store.commit('setDataUser', data)
      })
    },
    unfollowing() {
      this.status = true
      this.unfollow()
      .then(data => {
        this.$store.commit('setDataUser', data)
      })
    }
  },
  computed: {
    ...mapState([
      'formSign',
      'photoUser',
      'userSearch',
      'profile'
    ])
  },
  beforeCreate: function () {
    
  },
  created: function () {
    
    this.status = this.getUsername(this.$route.params.username)
    console.log('ini id profile index of  ',this.userSearch.followers)
    
    // this.getById()
    if (localStorage.getItem('isLogin')) {
      this.profile.username = localStorage.getItem('username')
      this.profile.fullname = localStorage.getItem('fullname')
    } else {
      window.location = '../'
    }
  }
}
</script>

<style>
  div.content {
    margin: 20px;
    font-size: 32px;
    line-height: 40px;
    font-weight: 200;
  }
  .level-left {
    display: flex;
  }
  a.link {
    margin : 20px;
  }
  p.fullname{
    margin: 20px;
  }
  .image img {
    border-radius: 10%;
  }
  a {
    text-decoration: none;
  }
  a.btn.btn-primary {
    font-size: 13px;
    color: white;
  }
  .col-md-6 {
    text-align: center;
  }
  article.media {
    margin-top: 20px;
  }
  p strong {
    margin-right: 20px;
  }
  .badge {
		background: #f44336;
    font-size: 13px;
    border-radius: 20px;
    position: absolute;
    min-width: 10px;
    padding: 4px 6px 0;
    min-height: 18px;
    color: white;
	}
</style>
