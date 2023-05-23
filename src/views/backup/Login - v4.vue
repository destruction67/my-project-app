<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <br>
        <br>
        <br>
        <br>
        <div class="container mt-0" id="container">

          <div class="form-container sign-in-container">
            <form  @submit.prevent="login">
              <h2>Sign in</h2>
              <input type="text" placeholder="Username"  v-model="authData.username" />
              <div class="password-container">
                <input type="password" placeholder="Password..." id="password" v-model="authData.password">
                <font-awesome-icon icon="eye fa-eye" />
              </div>
<!--              <input type="password" placeholder="Password" v-model="authData.password"/>-->
<!--              <a href="#">Forgot your password?</a>-->
              <button>Sign In</button>



            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-right">
<!--                <img class="img img-thumbnail" src="../assets/cdms.png" alt="">-->
<!--                <img height="330" width="330" src="../assets/cdms.png" alt="">-->
                <h1>Welcome Users</h1>
                <p>sign in to see more details</p>
                <button class="ghost" id="signUp">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>


    <base-app-footer></base-app-footer>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {vueAppMixin} from "@/mixins/vueAppMixin";

export default {
  name: "Login",

  mixins: [vueAppMixin],

  data() {
    return {
      username: '',
      password: '',
      is_admin: false,

      icon: 'eye-slash',
      isSelected: 'user',
      // authentication: {
      //   username: '',
      //   password: '',
      //   is_admin: '',
      // },
      error: null,
      success: false,
    };
  },

  /** methods **/
  methods: {
    ...mapActions(
        [
          'loginUser',
        ],
    ),

    async login () {
      this.loginUser(this.authData).then((r)=>{
        if(r){
          console.log('Checking the auth user',this.isObjEmpty(this.authUser));
          this.proceed_to_home();
        }else {
          if(!this.isObjEmpty(this.authUser)){
            console.log('login failed')
          }
        }
      });
    },

    showPassword() {
      const input = document.getElementById('input-password');
      if (input.type == 'password') {
        input.type = 'text';
        this.icon = 'eye';

      } else {
        input.type = 'password';
        this.icon = 'eye-slash';
      }
    },

    proceed_to_home(){
      this.$router.push({name : 'Home'}).catch(err => {});
    },


    isActiveTab(val) {
      this.is_admin = val !== 'crew';
      this.username='';
      this.password=''

      this.isSelected = val;
    },


  },


  /** computed **/
  computed: {
    ...mapGetters(
        [
          'isReloading',
          'authUser',
          'authData'
        ],
    ),
  },



}
</script>

<style scoped>
.mt-0 {
  margin-top: 50px !important;
}

.nav-pills > li > a {
  color: #6c757d;
}

.nav-pills > li > a.active {
  background-color: #6c757d !important;
  color: white;
}


* {
  box-sizing: border-box;
}

/*body {*/
/*  background: #f6f5f7;*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  flex-direction: column;*/
/*  font-family: 'Montserrat', sans-serif;*/
/*  height: 100vh;*/
/*  margin: -20px 0 50px;*/
/*}*/

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #614385;
  background: linear-gradient(to right, #272467 , #425a94);
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.password-container{
  width: 100%;
  position: relative;
}
.password-container input[type="password"],
.password-container input[type="text"]{
  width: 100%;
  padding: 12px 36px 12px 12px;
  box-sizing: border-box;
}

.fa-eye{
  position: absolute;
  top: 40%;
  right: 4%;
  cursor: pointer;
  color: #272467;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container{
  transform: translateX(-100%);
}

.overlay {
  /*background: #FF416C;*/
  /*background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);*/
  /*background: linear-gradient(to right, #FF4B2B, #FF416C);*/
  background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
  background: linear-gradient(to right, #272467 , #425a94);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}

.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

</style>