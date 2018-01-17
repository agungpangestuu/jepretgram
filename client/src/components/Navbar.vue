<template>
  <nav class="navbar navbar-default navbar-expand-xl navbar-light">
	<div class="navbar-header d-flex col">
		<a class="navbar-brand" href="#"><i class="fa fa-cube"></i>Jepret<b>Gram</b></a>  		
		<button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle navbar-toggler ml-auto">
			<span class="navbar-toggler-icon"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>
	</div>
	<!-- Collection of nav links, forms, and other content for toggling -->
	<div id="navbarCollapse" class="collapse navbar-collapse justify-content-start">
		<ul class="nav navbar-nav">
			<li class="nav-item active" v-if="$route.name == navbar.home"><a href="../" class="nav-link">Home</a></li>
			<li class="nav-item" v-else><a href="../" class="nav-link">Home</a></li>

      <li class="nav-item active" v-if="isLogin && $route.name == navbar.profile"><a :href="username" class="nav-link">Profile</a></li>
			<li class="nav-item" v-else><a :href="username" class="nav-link">Profile</a></li>

     <li class="nav-item active" v-if="isLogin && $route.name == navbar.post"><a :href="username" class="nav-link">Post</a></li>
      <li class="nav-item" v-else><a :href="post" class="nav-link">Post</a></li>
				<!-- <a data-toggle="dropdown" class="nav-link dropdown-togglenavbar" href="#">Post <b class="caret"></b></a> -->
			<!-- </li> -->
		</ul>
		<div class="navbar-form form-inline">
			<div class="input-group search-box">								
				<input type="text" id="search" class="form-control" placeholder="Search by Username" v-model="search">
				
			</div>
		</div>
    <a class="btn btn-primary" @click="dataSearch()">Search</a>
		<ul class="nav navbar-nav navbar-right ml-auto" v-if="isLogin">
			<li class="nav-item dropdown">
				<a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle user-action"><img :src="profile.avatar" class="avatar" alt="Avatar"> {{profile.fullname}} <b class="caret"></b></a>
				<ul class="dropdown-menu">
					<li><a href="username" class="dropdown-item"><i class="fa fa-user-o"></i> Profile</a></li>
					<li><a href="#" class="dropdown-item"><i class="fa fa-calendar-o"></i> Calendar</a></li>
					<li><a href="#" class="dropdown-item"><i class="fa fa-sliders"></i> Settings</a></li>
					<li class="divider dropdown-divider"></li>
					<li><a href="../" @click="logout()" class="dropdown-item"><i class="material-icons">&#xE8AC;</i> Logout</a></li>
				</ul>
			</li>
		</ul>
    <div class="navbar-right ml-auto " v-else>
      <a class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">Login</a>
      <a class="btn btn-primary" data-toggle="modal" data-target="#signUp">Signup</a>
      <Modal></Modal>
    </div>
	</div>
</nav>
</template>

<script>
import Modal from '@/components/Modal'
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: 'Navbar',
  data: function () {
    return {
      isLogin: '',
      username: `/profile/${localStorage.getItem('username')}`,
      post: `/${localStorage.getItem('username')}/post`,
      navbar: { profile: 'Profile', home: 'MainPage', post: 'Post' },
      search: ""
    }
  },
  methods: {
    ...mapActions([
      'decoded',
      'getUsername'
    ]),
    logout () {
      localStorage.removeItem('isLogin')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('fuollname')
      window.location = '../'
    },
    dataSearch () {
      this.getUsername(this.search)
      if(this.userSearch){
        window.location = `/profile/${this.search}`
      }
    }
  },
  computed: {
     ...mapState([
      'formSign',
      'profile',
      'userSearch'
    ])
  },
  created: function () {
    if (localStorage.getItem('isLogin')) {
      this.isLogin = localStorage.getItem('isLogin')
      this.decoded()
    }
    else {
      this.isLogin = false
    }
  },
  components: { Modal }
}
</script>

<style>
  body {
		background: #eeeeee;
	}
  .form-inline {
    display: inline-block;
   }
	.navbar-header.col {
		padding: 0 !important;
	}	
	.navbar {		
		background: #fff;
		padding-left: 16px;
		padding-right: 16px;
		border-bottom: 1px solid #d6d6d6;
		box-shadow: 0 0 4px rgba(0,0,0,.1);
	}
	.nav-link img {
		border-radius: 50%;
		width: 36px;
		height: 36px;
		margin: -8px 0;
		float: left;
		margin-right: 10px;
	}
	.navbar .navbar-brand {
		color: #555;
		padding-left: 0;
		padding-right: 50px;
		font-family: 'Merienda One', sans-serif;
	}
	.navbar .navbar-brand i {
		font-size: 20px;
		margin-right: 5px;
	}
	.search-box {
        position: relative;
    }	
  .search-box input {
		box-shadow: none;
    padding-right: 35px;
    border-radius: 3px !important;
  }
	.search-box .input-group-addon {
    min-width: 35px;
    border: none;
    background: transparent;
    position: absolute;
    right: 0;
    z-index: 9;
    padding: 7px;
		height: 100%;
  }
  .search-box i {
    color: #a0a5b1;
		font-size: 19px;
  }
	.navbar .nav-item i {
		font-size: 18px;
	}
	.navbar .dropdown-item i {
		font-size: 16px;
		min-width: 22px;
	}
	.navbar .nav-item.open > a {
		background: none !important;
	}
	.navbar .dropdown-menu {
		border-radius: 1px;
		border-color: #e5e5e5;
		box-shadow: 0 2px 8px rgba(0,0,0,.05);
	}
	.navbar .dropdown-menu li a {
		color: #777;
		padding: 8px 20px;
		line-height: normal;
	}
	.navbar .dropdown-menu li a:hover, .navbar .dropdown-menu li a:active {
		color: #333;
	}	
	.navbar .dropdown-item .material-icons {
		font-size: 21px;
		line-height: 16px;
		vertical-align: middle;
		margin-top: -2px;
	}
	.navbar .badge {
		background: #f44336;
		font-size: 11px;
		border-radius: 20px;
		position: absolute;
		min-width: 10px;
		padding: 4px 6px 0;
		min-height: 18px;
		top: 5px;
	}
	.navbar ul.nav li a.notifications, .navbar ul.nav li a.messages {
		position: relative;
		margin-right: 10px;
	}
	.navbar ul.nav li a.messages {
		margin-right: 20px;
	}
	.navbar a.notifications .badge {
		margin-left: -8px;
	}
	.navbar a.messages .badge {
		margin-left: -4px;
	}	
	.navbar .active a, .navbar .active a:hover, .navbar .active a:focus {
		background: transparent !important;
	}
  a.btn.btn-primary {
    color: white;
  }
	@media (min-width: 1200px){
    .form-inline .input-group {
      width: 300px;
      margin-left: 30px;
    }
	}
	@media (max-width: 1199px){
		.form-inline {
			display: block;
			margin-bottom: 10px;
		}
		.input-group {
			width: 100%;
		}
	}
</style>
