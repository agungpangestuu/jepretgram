<template>
  <!-- Modal -->
  <div>
    <div :class="ModalClass" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Form Login</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- <input type="text" class="form-control" name="fullname" id="" placeholder="fullname"> -->
          <input type="text" class="form-control"  v-model="formSignin.username" name="username" id="emailLogin" placeholder="Username or Email">
          <input type="password" class="form-control"  v-model="formSignin.password" id="passwordLogin" placeholder="Password">
          <!-- <input type="email" class="form-control" name="email" id="" placeholder="Email"> -->

          
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="signin()" >Submit</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <span class="modal-foot"> or </span>
            <button class="btn btn-outline-primary btn-block" @click="fbLogin">
              login with facebook
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
   <!-- End Modal login-->

    <div :class="ModalClass" id="signUp" tabindex="-1" role="dialog" aria-labelledby="signUpTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signUpTitle">Form Sign Up</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" v-model="formSign.fullname" id="fullname" placeholder="fullname">
            <input type="text" class="form-control" v-model="formSign.username" name="username" id="username" placeholder="Username or Email">
            <input type="password" class="form-control" v-model="formSign.password" id="exampleInputPassword1" placeholder="Password">
            <input type="email" class="form-control" v-model="formSign.email" name="email" id="email" placeholder="Email">

            
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="signup()">Submit</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="ModalClass" id="post" tabindex="-1" role="dialog" aria-labelledby="postTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="postTitle">Form Sign Up</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="removeImage">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form enctype="multipart/form-data" novalidate>
            <div v-if="!image">
              <h2>Select an image</h2>
              <input type="file" multiple @change="onFileChange">
            </div>
            <div v-else>
              <img :src="image" />
              <button @click="removeImage">Remove image</button>
            </div>
            <input type="text" class="form-control" v-model="uploads.caption" id="caption" placeholder="caption">
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="loginbtn()">Submit</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Modal',
  data () {
    return {
      ModalClass: 'modal fade',
      image: ''
    }
  },
  computed: {
    ...mapState([
      'formSign',
      'formSignin',
      'uploads'
    ])
  },
  methods: {
    ...mapActions([
      'signup',
      'signin',
      'uploadsFile',
      'postPhoto'
    ]),
    fbLogin: function () {
      FB.login(function(response){
        console.log(response)
        if (response.status === 'connected') {
          localStorage.setItem('isLogin', true)
          window.location.reload()
        }
        // axios.post('http://localhost:3000/signin',response)
        // .then((result)=>{
        //   console.log(result.data);
        //   if(!result.data.status){
        //     console.log("Something went wrong!");
        //     setTimeout(function(){
        //       window.location.reload();
        //     },5000);
        //   }
        //   else {
        //     localStorage.setItem('id', result.data.id)
        //     localStorage.setItem("token",result.data.token);
        //     localStorage.setItem('picture', result.data.picture)
        //     localStorage.setItem('name', result.data.name)
        //     window.location = 'http://localhost:8080'
        //   }
        // })
      }, {scope: 'public_profile,email'})
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.image = files[0]
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
    loginbtn () {
      this.postPhoto(this.image)
      this.uploadsFile()
      // let formDt = new formData()
      // axios.post('http://localhost:3000/api/photos', this.image, {headers: { 'Content-Type': 'multipart/form-data' }})
    }
  }
}
</script>

<style>
  input.form-control {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  span.modal-foot {
    padding: 0px 30px;
  }
  img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
  }
  #post {
    text-align: center;
  }
</style>
