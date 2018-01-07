<template>
  <div>
    <div style="margin-top:2%; margin-bottom:3%;" class="card mb-3">
      <h3 class="card-header">@{{photo.author.username}}</h3>
      <img style="height: 200px; width: 100%; display: block;" :src="photo.photo" alt="Card image">
      <div class="card-body">
        <p class="card-text">{{photo.caption}}</p>
      </div>
      <div class="card-footer text-muted">
        2 days ago
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['photo']
}
</script>

<style>

</style>
