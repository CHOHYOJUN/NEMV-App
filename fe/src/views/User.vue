<template>
  <div
    id="e3"
    style="max-width: 1200px; margin: auto;"
    class="grey lighten-3"
  >
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout >
          <v-flex xs12>
            <v-card color="cyan darken-2" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout>
                  <v-flex>
                      <div class="headline">CRUD Api Test</div>
                       <template
                        v-for="(user, index) in users"
                        >
                        <v-chip
                          class="mx-auto title"
                          align-start
                          label
                          :key="index"
                        >{{ user.name }} / [{{ user.age }}]
                        <v-spacer></v-spacer>
                        <v-flex>
                            <v-btn
                            small
                            flat
                            icon
                            @click="deleteReq(user._id)"
                            >
                              <v-icon
                              color="red lighten-6"
                              >delete</v-icon>
                          </v-btn>

                           <v-btn
                            small
                            flat
                            icon
                            @click="modalUp(user)"
                            >
                              <v-icon
                              color="purple darken-3"
                              >create</v-icon>
                          </v-btn>
                         </v-flex>
                       </v-chip>
                    </template>
                  </v-flex>
                 <v-btn
                  absolute
                  dark
                  fab
                  top
                  right
                  small
                  color="warning"
                  @click="modalUp()"
                >
                <v-icon>add</v-icon>
               </v-btn>

                </v-layout>
              </v-container>
            </v-card>
          </v-flex>

           <v-flex xs12>
            <v-card color="purple darken-2" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Post Api</div>
                      <div>{{ postMsg }}</div>
                    </div>
                  </v-flex>
                  <v-btn
                    absolute
                    dark
                    fab
                    top
                    right
                    small
                    color="warning"
                    @click="modalUp()"
                  >
                  <v-icon>add</v-icon>
                </v-btn>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>

          <v-flex xs12>
            <v-card color="lime lighten-1" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Put Api</div>
                      <div>{{ putMsg }}</div>
                    </div>
                  </v-flex>
                  <v-btn
                  absolute
                  dark
                  fab
                  top
                  right
                  small
                  color="warning"
                  @click="putReq(user._id)"
                >
                <v-icon>add</v-icon>
               </v-btn>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>

          <v-flex xs12>
            <v-card color="orange lighten-1" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Delete Api</div>
                      <div>{{ deleteMsg }}</div>
                    </div>
                  </v-flex>
                  <v-btn
                    absolute
                    dark
                    fab
                    top
                    right
                    small
                    color="warning"
                    @click="deleteReq()"
                  >
                  <v-icon>add</v-icon>
                </v-btn>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>

        </v-layout>

       <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline"
              v-if="!this.upDateId"
              >User SignUp</span>
              <span class="headline"
              v-else
              >User Update</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>

                  <v-flex xs12>
                    <v-text-field
                    label="Name"
                    required
                    v-model="inputName"
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 >
                    <v-select
                      label="Age"
                      required
                      :items="ages"
                      v-model="inputAge"
                    ></v-select>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
              <v-btn
              v-if="!this.upDateId"
              color="green darken-1"
              flat
              @click="postReq()"
              >Save</v-btn>
               <v-btn
              v-else
              color="purple darken-1"
              flat
               @click="putReq()"
              >Update</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>

      <v-snackbar
          top
          :timeout="3000"
          :color="snColor"
          v-model="snackbar"
        >{{ postCheck }}
        <v-btn
        dark
        flat
        @click.native="snackbar = false"
        >Close</v-btn>
      </v-snackbar>

      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
  data(){
    return {
      dialog: false,
      users : [],
      getMsg: '',
      postMsg: '',
      putMsg: '',
      deleteMsg: '',
      ages : [],
      inputName: '',
      inputAge: 0,
      snColor: '',
      snackbar: false,
      postCheck: '',
      upDateId: ''
    }
  },
  mounted() {
    for(let i = 20 ; i<40 ; i++) this.ages.push(i)

     this.$nextTick(() => {
      return this.getReq()
    })
  },
  created() {

  },
  methods: {
    getReq () {
      this.$axios.get('http://localhost:3000/api/user').then((result) => {
      this.users = result.data.users;
    })
    .catch((err) => {
      console.error(err.message);
    })
    },
    postReq () {
      this.$axios.post('http://localhost:3000/api/user', {
        name: this.inputName, age: this.inputAge
      })
      .then((result) => {
      console.log(result.data);
      this.postMsg = result.data
      this.dialog = false
      this.pop(result.data.success)
      this.getReq()
    })
    .catch((err) => {
      console.error(err.message);
      this.pop(false)
    })
    },
    putReq () {
      // this.modalUp()
      this.$axios.put(`http://localhost:3000/api/user/${this.upDateId}`, {
        name: this.inputName, age: this.inputAge
      }).then((result) => {
      this.dialog = false
      this.pop(result.data.success)
      this.getReq()
    })
    .catch((err) => {
      console.error(err.message);
    })
    },
    deleteReq (_id) {
      this.$axios.delete(`http://localhost:3000/api/user/${_id}`, {
      }).then((result) => {
      this.pop(result.data.success)
      this.getReq()
    })
    .catch((err) => {
      console.error(err.message);
    })
    },
    modalUp (user) {
      if(user){
        this.upDateId = user._id
        this.inputName = user.name
        this.inputAge = user.age
      }else{
        this.inputName = ""
        this.inputAge = ""
      }
       this.dialog = true
    },
    pop (result) {
      this.snackbar = true
      if(result){
      this.postCheck = "성공"
      this.snColor = "success"
      return
      }
      this.postCheck = "실패"
      this.snColor = "error"
    },
  }
  }
</script>

<style scoped>

</style>