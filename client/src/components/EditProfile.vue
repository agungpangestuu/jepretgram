<template>
  <div class="container">
    <div id="kv-avatar-errors-2" class="center-block" style="width:800px;display:none"></div>
    <form class="form form-vertical" enctype="multipart/form-data" novalidate>
        <div class="row">
            <div class="col-sm-4 text-center">
                <div class="kv-avatar">
                    <div class="file-loading" v-if="!image">
                        <input id="avatar-2" name="avatar-2" type="file" required multiple @change="onFileChange">
                    </div>
                    <div v-else>
                      <img :src="image" />
                      <button @click="removeImage">Remove image</button>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                      <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="email">Email Address<span class="kv-reqd">*</span></label>
                    <input type="email" class="form-control" name="email" required v-model="profile.email">
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="pwd">Password<span class="kv-reqd">*</span></label>
                    <input type="password" class="form-control" name="pwd" required v-model="formEdit.password">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="fname">First Name</label>
                    <input type="text" class="form-control" name="fname" required v-model="fullname[0]" >
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="lname">Last Name</label>
                    <input type="text" class="form-control" name="lname" required v-model="fullname[1]">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <hr>
                <div class="text-right"> 
                  <button type="submit" class="btn btn-primary" @click="updateProfile()">Submit</button>
                </div>
              </div>
            </div>
        </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'EditProfile',
  data () {
    return {
      image: '',
      fullname: [],
      formEdit: {token: localStorage.getItem('token'), avatar: "", fullname: "", email: "", password: ""}
    }
  },
  computed: {
    ...mapState([
      'profile'
    ])
  },
  methods : {
    ...mapActions([
      'urlAvatar'
    ]),
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.urlProfile(files[0])
      
      this.createImage(files[0])
    },
    createImage (file) {
      var image = new Image()
      var reader = new FileReader()
      var vm = this

      reader.onload = (e) => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (e) {
      this.image = ''
    },
    urlProfile(file) {
      let data = new FormData()
      data.append('photos', file)
      let url = axios.post('http://localhost:3000/api/photos', data)
                .then(({data}) => {
                  return data
                })
      this.image = url
    },
    updateProfile() {
      this.formEdit.avatar = this.image
      this.formEdit.email = this.profile.email
      this.formEdit.fullname = this.fullname.join(' ')
      axios.put(`http://localhost:3000/api/users/${this.profile.id}`, this.formEdit)
      .then(({data}) => {
        localStorage.setItem('data.token')
      })
      .catch(err => console.log(err))
      window.location = `http://localhost:3000/profile/${this.profile.username}`
    }
  },
  created () {
    this.fullname = this.profile.fullname.split(' ')
    // this.image = this.profile.avatar
  }
}
</script>

<style>
  .container {
    margin-top: 30px;
  }
  .kv-avatar .krajee-default.file-preview-frame,.kv-avatar .krajee-default.file-preview-frame:hover {
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
    text-align: center;
  }
  .kv-avatar {
      display: inline-block;
  }
  .kv-avatar .file-input {
      display: table-cell;
      width: 213px;
  }
  .kv-reqd {
      color: red;
      font-family: monospace;
      font-weight: normal;
  }
  img {
    max-width: 300px;
    max-height: 200px;
  }
</style>
