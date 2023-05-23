<template>
  <div id="layoutAuthentication">
    <div id="layoutAuthentication_content">
      <main>
        <div class="container mt-0">

          <div class="row">
            <div class="col">
              <ul class="nav nav-pills justify-content-center">
                <li class="nav-item">
                  <a class="nav-link" :class="{active: isSelected === 'user' }" href="#" @click="isActiveTab('user')">
                    <font-awesome-icon icon="user-shield"/>
                    User</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" :class="{active: isSelected === 'admin' }" href="#" @click="isActiveTab('admin')">
                    <font-awesome-icon icon="lock"/>
                    Admin</a>
                </li>
              </ul>
            </div>

          </div>

          <div class="row justify-content-center">
            <div class="col-lg-5">
              <div class="card shadow-lg border-0 rounded-lg mt-5">
                <div class="card-header badge-dark">
                  <p style="font-size:30px;font-weight:bold;">My Project</p>
                  <!--                  <p style="font-size:15px;">CREW LOGIN</p>-->
                  <span class="badge badge-pill badge-primary" v-show="isSelected=='user'"
                        >USER LOGIN</span>
                  <span class="badge badge-pill badge-warning" v-show="isSelected=='admin'"
                        >ADMIN LOGIN</span>
                </div>

                <form @submit.prevent="login">
                  <div class="card-body">
                    <div class="form-group" v-if="is_admin">
                      <label class="small mb-1" for="username-staff">
                        <font-awesome-icon icon="user"/>
                        USERNAME </label>
                      <input class="form-control py-2"
                             id="username-staff"
                             type="text"
                             placeholder="Enter Username"
                             v-model="authData.username"
                      />
                    </div>
                    <div class="form-group" v-else>
                      <label class="small mb-1" for="username-user">
                        <font-awesome-icon icon="user"/>
                        USER ID</label>
                      <input class="form-control py-2"
                             id="username-user"
                             type="text"
                             placeholder="Enter User ID"/>
                    </div>
                    <div class="form-group">
                      <label class="small mb-1 mt-3" for="input-password">
                        <font-awesome-icon icon="lock"/>
                        PASSWORD</label>
                      <div class="input-group">
                        <input class="form-control py-2"
                               id="input-password"
                               name="inputPassword"
                               type="password"
                               placeholder="Enter Password"
                               v-model="authData.password"
                               autocomplete="on"
                               required
                        />
                        <div class="input-group-append">
                          <button class="btn btn-secondary" type="button" title="Show Password" @click="showPassword">
                            <font-awesome-icon :icon="this.icon"/>
                          </button>
                        </div>
                      </div>
                    </div>

<!--                    <div class="form-group mt-3" v-show="isSelected=='user'">-->
<!--                      <small class="text-right">-->
<!--                        <strong>Note:</strong> Default password is numerical birth date format: "ddmmyyyy"-->
<!--                      </small>-->
<!--                      <br>-->
<!--                      <small>-->
<!--                        <strong>Ex:</strong> 18 December 1999 → <span style="color: red ">18121999</span>-->
<!--                      </small>-->
<!--                    </div>-->

                    <div class="form-group">
                      <button class="btn btn-outline-dark mt-3">
<!--                        <font-awesome-icon v-if="!isLoading" icon="arrow-right-to-bracket"/>-->
<!--                        <font-awesome-icon v-if="isLoading" icon="spinner" spin/>-->
<!--                        <font-awesome-icon icon="circle-notch" spin class="ml-1" v-if="isReloading"/>-->
                        Login
                      </button>
                    </div>
                  </div>

                </form>


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
</style>