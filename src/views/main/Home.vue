<template>
  <div class="container bg-white" style="height: 100vh;">

     <span class="my-4" style="font-size: 30px">
      <code style="color: black;"> Welcome,</code> <code> {{ authUser.username }} {{ receivedValue }}</code>
    </span>


    <div class="row">
      <div class="col-12 font-weight-bold">

        <router-link class="btn btn-xs btn-primary"
                     :to="{name:'UserList'}"
                     v-if="isSystemAdmin || isStaff">
          <font-awesome-icon icon="users"/>
          View User Records
        </router-link>
        &nbsp;

        <button type="button" class="btn btn-xs btn-warning"
                v-if="isGuest"
                @click="update"
        >
          <font-awesome-icon icon="plus"/>
          Unsubscribe
        </button>
        &nbsp;

        <button type="button" class="btn btn-xs btn-secondary"
                @click="logout_user"
        >
          <font-awesome-icon icon="sign-out-alt"/>
          Logout
        </button>

      </div>
    </div>


  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {gateMixin} from "@/mixins/gateMixin";
import {AlertService} from "@/service/AlertService";

export default {
  name: "Home",

  mixins: [gateMixin],

  data() {
    return {
      receivedValue: '',
    };
  },

  computed: {
    ...mapGetters([
      'authUser',
    ]),
  },

  methods: {
    ...mapActions([
      'logoutUser',
      'update_userUnsubscribe',
    ]),

    async logout_user() {
      if (await AlertService.questionAlertService('Are you sure you want to logout', 'Logout')) {
        this.logoutUser().then((r) => {
          if (r) {
            this.$router.push({name: 'Login'});
          }
        });
      }
    },

    async update() {
      let __update = AlertService.questionAlertService("Are you sure you want to unsubscribe?", 'Unsubscribe', 'question');
      if (await __update) {
        let params = {
          id: this.authUser.id,
          active: 0,
        };

        let user = await this.update_userUnsubscribe(params);
        if (user) {
          AlertService.successAlert("You have successfully unsubscribed", 'User Unsubscribed');
          location.reload();
        }
      }
    },

  },

  mounted() {
    window.Echo.channel('channel').listen('Hello', (e) => {
      console.log(e.message);
      this.receivedValue = e.message;
    });
  },


}
</script>

<style scoped>

</style>