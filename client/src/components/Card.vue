<template>
  <div>
    <div style="margin-top:2%; margin-bottom:3%;" class="card mb-3">
      <h3 class="card-header">@{{photo.author.username}}</h3>
      <img style="height: 200px; width: 100%; display: block;" :src="photo.photo" alt="Card image">
      <div class="card-body">
        <p class="card-text">{{photo.caption}}</p>
      </div>
      <div class="card-footer text-muted">
        <!-- <div class="container"> -->
          <div class="row">
            <div class="col-md-6">
              <a class="fa fa-heart-o fa-2x btn" v-if="!photo.like.includes(profile.id)" aria-hidden="true" @click="likeBtn(photo)"> <span class="badge">{{photo.like.length}} Like</span></a>
              <a class="fa fa-heart-o fa-2x btn" v-if="photo.like.includes(profile.id)" aria-hidden="true" @click="likeBtn(photo)" style="color: red"> <span class="badge">{{photo.like.length}} Like</span></a>
            </div>
            <div class="col-md-6">
              <a class="fa fa-comments-o fa-2x btn" @click="classBtn(photo)" data-toggle="modal" data-target=".bd-example-modal-lg"><span class="badge">{{photo.koment.length}} Like</span></a>
              <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Comment</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-6">
                          <img :src="dataPhoto.photo" alt="">
                        </div>
                        <div class="col-6">
                          all comment
                          <div class="col-12" style="border: 1px" v-if="photo.koment.length > 0">
                            <div v-for="comment in photo.koment" :key="comment">
                              {{comment.koment}}
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
                <div class="modal-footer">
                  <input type="text" v-model="koment">
                  <button type="button" class="btn btn-primary" @click="addComent(photo._id)">Send Comment</button>
                </div>
                    ...
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Card',
  props: ['photo'],
  data () {
    return {
      dataLike: false,
      addClass: 'modal fade',
      koment: '',
      dataPhoto: ''
    }
  },
  methods: {
    ...mapActions([
      'likeThis',
      'postComent'
    ]),
    likeBtn (photo) {
      // console.log(photo);
      this.likeThis(photo)
      this.dataLike = true
    },
    classBtn (photo) {
      this.dataPhoto = photo
      console.log(photo._id)
    },
    addComent (id) {
      let data = {
        koment: this.koment,
        photoId: id
      }
      this.postComent(data)
    }
  },
  watch: {
    photo: function (newData) {
      console.log('ini new data', newData)
    }
  },
  computed: {
    ...mapState(['profile'])
  }
}
</script>

<style>
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
