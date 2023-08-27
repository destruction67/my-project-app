<template>
  <div class="container-fluid">
    <div class="row py-4">
      <div class="col-md-12">

        <div class="row">
          <div class="col-md-4">
            <div class="row">

              <div class="form-inline mb-3">
                <div class="form-group mb-2 mr-5">
<!--                  {{ receivedValue }}-->
                  <span class="ml-4 font-weight-bold lead" style="font-size: 22px;">Users</span>
                </div>
                <div class="form-group ">
                  <button type="button" class="btn btn-xs btn-success"
                          data-toggle="modal"
                          data-target="#new-user-modal"
                          data-backdrop="static"
                          data-keyboard="false"
                  >
                    <font-awesome-icon icon="plus"/>
                    Add User
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div class="col-sm-3">
            <div class="input-group mb-2 mr-sm-2">
              <input
                  type="text"
                  class="form-control form-control-sm"
                  id="formdata-searchvalue"
                  placeholder="Search User"
                  v-model="userFormParam.searchValue"
                  @keypress.enter="searchUser"
              >

              <button class="btn btn-sm btn-primary"  @click="searchUser">
                <font-awesome-icon icon="search"/>
                search
              </button>
            </div>
          </div>

<!--           status -->
<!--                    <div class="col-sm-2">-->
<!--                      <div class="form-group row">-->
<!--                        <label for="list-stat" class="col-sm-3 col-form-label">Status</label>-->
<!--                        <span class="col-form-label">:</span>-->
<!--                        <div class="col-sm-7 text-left">-->
<!--                          <select name="listCount" id="list-stat" class="form-control custom-select-sm"-->
<!--                                  @change="on_change_status">-->
<!--                            <option :value="null">&#45;&#45;select&#45;&#45;</option>-->
<!--                            <option :value="status.key" v-for="(status,index) in statuses" :key="status.id">-->
<!--                              {{ status.placeholder }}-->
<!--                            </option>-->
<!--                          </select>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->

          <!-- count -->
          <div class="col-sm-2">
            <div class="form-group row">
              <label for="list-count" class="col-sm-3 col-form-label">Count</label>
              <span class="col-form-label">:</span>
              <div class="col-sm-7 text-left">
                <select name="listCount" id="list-count" class="form-control custom-select-sm"
                        v-model="userFormParam.count"
                        @change="on_change_count"
                >
                  <option :value="count" v-for="(count ,index ) in counts">{{ count }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!--  pagination      -->
        <div class="row py-1">
          <div class="col-md-9">
            <div class="row">
              <div class="col-5">
                <myapp-pagination :page-object="userPagination" @settingPage="set_this_page"></myapp-pagination>
              </div>
            </div>
          </div>
        </div>




        <!-- table  -->
        <div id="table-section" class="py-3">
          <div class="row justify-content-center">
            <div class="col col-md">
              <div class="table table-responsive pmc-table border-top"
                   style="overflow-x: hidden !important; height: 350px">
                <table class="table table-bordered table-sm text-center small sticky-header table-hover">
                  <thead>
                  <tr>
                    <th style="width: 5%;">
                      #
                    </th>
                    <th style="width: 20%;" class="text-center align-middle p-1">Username</th>
                    <th style="width: 20%;" class="text-center align-middle p-1">Email Address</th>
                    <th style="width: 10%;" class="text-center align-middle p-1">Phone Number</th>
                    <th style="width: 10%;" class="text-center align-middle p-1">Status</th>
                    <th style="width: 10%;" class="text-center align-middle p-1">Role</th>
                    <th style="width: 10%;" class="text-center align-middle p-1">Created at</th>
                    <th style="width: 10%;" class="text-center align-middle p-1">Action</th>
                  </tr>
                  </thead>
                  <tbody>


                  <tr v-if="isReloading">
                    <td colspan="100%">
                      <span class="spinner-border spinner-border text-primary"
                            role="status" aria-hidden="true">
                      </span>
                      <h1>
                        Loading...
                      </h1>
                    </td>
                  </tr>

                  <tr v-for="(user, index) in users" v-if="!isReloading">
                    <td class="text-center align-middle p-0">{{ index + 1 }}</td>
                    <td class="text-center align-middle p-0">
                      {{ user.username }}
                    </td>

                    <td class="text-center align-middle p-0">
                      {{ user.email }}
                    </td>

                    <td>
                      {{ user.contact }}
                    </td>

                    <td>
                      <template v-if="user.active == 1">
                        <font-awesome-icon icon="check" style="transform: scale(1.7); color:#28a745;" title="ACTIVE"/>
                      </template>

                      <template v-if="user.active == 0">
                        <font-awesome-icon icon="minus" style="transform: scale(1.7); color:#DC4C64;" title="INACTIVE"/>
                      </template>
                    </td>

                    <td>
                      {{ user.userPosition }}
                    </td>

                    <td>
                      {{ user.created_at }}
                    </td>

                    <td>
                      <button
                          class="btn btn-xs btn-primary ml-2"
                          data-toggle="modal"
                          data-target="#view-user-modal"
                          data-backdrop="static"
                          data-keyboard="false"
                          @click="viewUser(user.id)"
                      >
                        <font-awesome-icon icon="bars"/>
                        view
                      </button>
                      <button
                          class="btn btn-xs btn-danger ml-2"
                          @click="delete_user(user.id)"
                          v-if="user.id != authUser.id"
                      >
                        <font-awesome-icon icon="trash"/>
                        delete
                      </button>
                    </td>
                  </tr>

<!--                  <tr>-->
<!--                    <td colspan="100%" class="bg-light-danger font-weight-bolder">-->
<!--                      <p class="text-center mt-3">No Results</p>-->
<!--                    </td>-->
<!--                  </tr>-->

                  </tbody>


                </table>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <!--  new user modal   -->
    <div class="modal fade" id="new-user-modal" tabindex="-1" role="dialog" aria-labelledby="newPrincipalModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="newPrincipalModalLabel">NEW USER</h5>
          </div>

          <div class="modal-body">
            <div class="row ml-1">
              <div class="col-md-12 text-left ml-2">
                <!-- new username -->
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">USERNAME</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input type="text"
                           v-model="newUser.username"
                           class="form-control form-control-sm"
                           placeholder="---"
                    />
                  </div>
                </div>


                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">PASSWORD</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input type="password"
                           v-model="newUser.password"
                           class="form-control form-control-sm"
                           placeholder="---"
                    />
                  </div>
                </div>

                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">CONFIRM PASSWORD</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input type="password"
                           v-model="newUser.password_confirmation"
                           class="form-control form-control-sm"
                           placeholder="---"
                    />
                  </div>
                </div>

                <!-- new  email -->
                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">EMAIL ADDRESS</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input
                        v-model="newUser.email"
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="---"
                    />
                  </div>
                </div>

                <!-- new  contact-->
                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">CONTACT NO#</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input
                        v-model="newUser.contact"
                        type="number"
                        class="form-control form-control-sm"
                        placeholder="---"
                    />
                  </div>
                </div>


                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">USER ROLE</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <select name="listCount" id="list-stat" class="form-control custom-select-sm"
                            v-model="newUser.user_position_id"
                          >
                      <option :value="null">--select--</option>
                      <option :value="userPos.id" v-for="(userPos,index) in objUserPositions" :key="userPos.id">
                        {{ userPos.name }}
                      </option>
                    </select>
                  </div>
                </div>


                <!--   status -->
                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">STATUS</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input
                        v-model="newUser.active"
                        type="checkbox"
                        class="form-check form-check-inline ml-2 mt-2"
                        style="transform: scale(1.5);"
                        placeholder="---"
                    />
                    <span> ACTIVE</span>
                  </div>
                </div>


              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
                v-show="!isEditable"
                type="button"
                class="btn btn-sm btn-success"
                @click="save"
            >
              <font-awesome-icon icon="save"/>
              SAVE
            </button>

            <button
                v-show="!isEditable"
                type="button"
                class="btn btn-sm btn-secondary"
                data-dismiss="modal">
              <font-awesome-icon icon="undo"/>
              CLOSE
            </button>

          </div>
        </div>
      </div>
    </div>


    <!-- modal view Replace  -->
    <div class="modal fade" id="view-user-modal" tabindex="-1" role="dialog"
         aria-labelledby="viewPrincipalModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="view-Replace-modal-label">EDIT USER</h5>
          </div>

          <div class="modal-body">
            <div class="row ml-1">
              <div class="col-md-12 text-left ml-2">
                <!-- new username -->
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">USERNAME</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input type="text"
                           v-model="userData.username"
                           class="form-control form-control-sm"
                           placeholder="---"
                           :disabled="!isEditable"
                    />
                  </div>
                </div>


                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">CHANGE PASSWORD</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input type="password"
                           v-model="userData.password"
                           class="form-control form-control-sm"
                           placeholder="---"
                           :disabled="!isEditable"
                    />
                  </div>
                </div>

                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">CONFIRM PASSWORD</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input type="password"
                           v-model="userData.password_confirmation"
                           class="form-control form-control-sm"
                           placeholder="---"
                           :disabled="!isEditable"
                    />
                  </div>
                </div>

                <!-- new  email -->
                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">EMAIL ADDRESS</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input
                        v-model="userData.email"
                        type="text"
                        class="form-control form-control-sm"
                        placeholder="---"
                        :disabled="!isEditable"
                    />
                  </div>
                </div>

                <!-- new  contact-->
                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">CONTACT NO#</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input
                        v-model="userData.contact"
                        type="number"
                        class="form-control form-control-sm"
                        placeholder="---"
                        :disabled="!isEditable"
                    />
                  </div>
                </div>


                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">USER ROLE</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <select name="listCount" id="list-stat" class="form-control custom-select-sm"
                            v-model="userData.userPositionId"
                            :disabled="!isEditable"
                    >
                      <option :value="null">--select--</option>
                      <option :value="userPos.id" v-for="(userPos,index) in objUserPositions" :key="userPos.id">
                        {{ userPos.name }}
                      </option>
                    </select>
                  </div>
                </div>


                <!--   status -->
                <div class="form-group row mt-2">
                  <label class="col-sm-3 col-form-label">STATUS</label>
                  <span class="col-form-label">:</span>
                  <div class="col-sm-5">
                    <input
                        v-model="userData.active"
                        type="checkbox"
                        class="form-check form-check-inline ml-2 mt-2"
                        style="transform: scale(1.5);"
                        placeholder="---"
                        :disabled="!isEditable"
                    />
                    <span> ACTIVE</span>
                  </div>
                </div>


              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button"
                    class="btn btn-sm btn-warning"
                    v-show="!isEditable"
                    @click="set_edit"
            >
              <font-awesome-icon icon="edit"/>
              EDIT
            </button>

            <button type="button"
                    class="btn btn-sm btn-secondary"
                    data-dismiss="modal"
                    v-show="!isEditable">
              <font-awesome-icon icon="undo"/>
              CLOSE
            </button>

            <button type="button"
                    class="btn btn-sm btn-success"
                    v-show="isEditable"
                    @click="update"
            >
              <font-awesome-icon icon="save"/>
              SAVE
            </button>

            <button type="button" class="btn btn-sm btn-danger"
                    v-show="isEditable"
                    @click="set_cancel"
            >
              <font-awesome-icon icon="times"/>
              CANCEL
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {AlertService} from "@/service/AlertService";
import {vueAppMixin} from "@/mixins/vueAppMixin";

export default {
  name: "User",

  mixins:[vueAppMixin],

  data(){
    return{
      counts: [
        5, 10, 15, 20, 30, 40, 50, 100, 200,
      ],

      statuses: [
        {
          id: 1,
          key: '',
          placeholder: 'All',
        },
        {
          id: 2,
          key: 1,
          placeholder: 'Active',
        },
        {
          id: 3,
          key: 0,
          placeholder: 'Inactive',
        },
      ],

      isEditable: false,

      pageLastLeft: 1,

      newUser: {},
      userData: {},

      receivedValue: '',

    }

  },


  /** methods**/
  methods: {
    ...mapActions([
      'set_users',
      'getuserPositionKeys',
      'create_user',
      'set_user',
      'update_user',
      'delete_user',

    ]),

    set_this_page(e) {
      this.userFormParam.searchValue = ''
      this.userPagination.currentPage = e
      this.userFormParam.page = e
      this.pageLastLeft = e
      this.set_users(this.userFormParam)
    },

    on_change_count(e) {
      this.userFormParam.page = 1
      this.userFormParam.searchValue = ''
      this.pageLastLeft = 1
      this.userFormParam.count = e.target.value
      this.set_users(this.userFormParam)
    },

    searchUser() {
      if (this.userFormParam.searchValue === '') {
        this.userFormParam.page = this.pageLastLeft
        this.set_users(this.userFormParam)
      }

      if (this.userFormParam.searchValue) {
        this.userFormParam.page = 1
      }

      this.set_users(this.userFormParam)

    },

    set_edit() {
      this.isEditable = true
    },

    set_cancel(e) {
      this.isEditable = false
      this.userData = Object.assign({}, this.user);
    },

    viewUser(userId) {
      this.set_user(userId);
    },

    async save() {
      let __create = AlertService.questionAlertService('Are you sure you want to add this record', 'Create User', 'question')
      if (await __create) {

        let params = {
          username: this.newUser.username ? this.newUser.username : '',
          password: this.newUser.password ? this.newUser.password : '',
          password_confirmation: this.newUser.password_confirmation ? this.newUser.password_confirmation : '',
          email: this.newUser.email ? this.newUser.email : '',
          user_position_id: this.newUser.user_position_id ? this.newUser.user_position_id : '',
          contact: this.newUser.contact ? this.newUser.contact : '',
          active: this.newUser.active ? 1 : 0,
        };

        let user = await this.create_user(params);

        if (user) {
          AlertService.successAlert('Create user record successful', 'Create user');
          this.hideModal('new-user-modal')
          this.newUser = {};
          this.set_users();
        }

      }

    },

    async update() {
      let __update = AlertService.questionAlertService("Do you want to save changes that you made.", 'Update User', 'question');
      if (await __update) {
        let params = {
          id: this.userData.id ? this.userData.id : '',
          username: this.userData.username ? this.userData.username : '',
          password: this.userData.password ? this.userData.password : '',
          password_confirmation: this.userData.password_confirmation ? this.userData.password_confirmation : '',
          email: this.userData.email ? this.userData.email : '',
          user_position_id: this.userData.userPositionId ? this.userData.userPositionId : '',
          contact: this.userData.contact ? this.userData.contact : '',
          active: this.userData.active ? 1 : 0,
        };

        let user = await this.update_user(params);
        if (user) {
          AlertService.successAlert("Updated successfully", 'Update User');
          this.hideModal('view-user-modal')
          this.isEditable = false
        }
      }
    },

  },

  /** watch **/
  watch: {
    'user'() {
      this.userData = Object.assign({}, this.user);
    },

    'receivedValue'(){
      if(this.receivedValue == true){
        this.set_users();
      }
    },

  },

  mounted() {
    window.Echo.channel('channel').listen('Hello', (e) => {
      console.log(e.message);
      this.receivedValue = e.message;
    });
  },

  /**  computed  **/
  computed: {
    ...mapGetters(
        [
          'isReloading',
          'users',
          'user',
          'userFormParam',
          'userPagination',
          'objUserPositions',
          'authUser',
        ],
    ),
  },

  /**  created  **/
  async created() {
    await this.set_users();
    await this.getuserPositionKeys();
  },


}
</script>

<style scoped>

</style>