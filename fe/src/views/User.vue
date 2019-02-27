<template>
  <div
    id="e3"
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3"
  >
    <v-card>
      <v-container
        fluid
        style="min-height: 0;"
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="cyan darken-2" class="white--text">
              <v-container fluid grid-list-lg>
                <v-layout row>
                  <v-flex xs7>
                    <div>
                      <div class="headline">Get Api</div>
                      <div>{{ getMsg }}</div>
                    </div>
                  </v-flex>
                <v-btn
                fluid
                 left
                 @click="getReq()"
                 >get Btn</v-btn>
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
                 left
                 @click="postReq()"
                 >post Btn</v-btn>
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
                 left
                 @click="putReq()"
                 >put Btn</v-btn>
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
                 left
                 @click="deleteReq()"
                 >delete Btn</v-btn>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
  data(){
    return {
      users : [],
      getMsg: '',
      postMsg: '',
      putMsg: '',
      deleteMsg: '',
    }
  },
  mounted() {

  },
  methods: {
    getReq() {
      this.$axios.get('http://localhost:3000/api/user').then((result) => {
      console.log(result.data);
      this.getMsg = result.data
    })
    .catch((err) => {
      console.error(err.message);
    })
    },
    postReq() {
      this.$axios.post('http://localhost:3000/api/user').then((result) => {
      console.log(result.data);
      this.postMsg = result.data
    })
    .catch((err) => {
      console.error(err.message);
    })
    },
    putReq() {
      this.$axios.put('http://localhost:3000/api/user').then((result) => {
      console.log(result.data);
      this.putMsg = result.data
    })
    .catch((err) => {
      console.error(err.message);
    })
    },
    deleteReq() {
      this.$axios.delete('http://localhost:3000/api/user').then((result) => {
      console.log(result.data);
      this.deleteMsg = result.data
    })
    .catch((err) => {
      console.error(err.message);
    })
    }
  }
  }
</script>

<style scoped>

</style>