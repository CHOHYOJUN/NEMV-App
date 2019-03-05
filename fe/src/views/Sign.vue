<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field prepend-icon="person" v-model="form.id" label="아이디" type="text"></v-text-field>
              <v-text-field prepend-icon="lock" v-model="form.password" label="비밀번호" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="signIn">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


export default {
  data () {
    return {
      form: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      this.$axios.post(`${this.$apiRootPath}sign/in`, this.form) //get 은 헤더 옵션, post는 body
        .then((result) => {
          console.log(result.data)
            if(!result.data.success) return console.error(result.data.msg);
            localStorage.setItem('token', result.data.token)
            this.$router.push({name: 'home' }) //  == location.herf = '/headers'
       })
       .catch((error) => {
        console.error(error.message)
       })
    }
  }
}
</script>