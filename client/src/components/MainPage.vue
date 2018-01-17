<template>
  <div class="container">
    <div class="row" >
      <Modal></Modal>
      <div class="col-md-4" v-for="p in photos.data" :key="p._id">
        <Card :photo="p"></Card>
      </div>
    </div>
  </div>
  
</template>

<script>
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'MainPage',
  data () {
    return {
      tasks: 8
    }
  },
  components: {
    Card,
    Modal
  },
  computed: {
    ...mapState([
      'photos'
    ])
  },
  methods: {
    ...mapActions([
      'getAllPhoto'
    ])
  },
  created () {
    this.getAllPhoto()
    if (localStorage.getItem('isLogin')) {
      
      this.tasks = 4
    }
  }
}
</script>

<style>

</style>
