<template>
  <v-container>
    <v-alert type="error" :value="true">
      <h1>로그인이 필요한 페이지 입니다.{{$route.params.msg}}</h1>
    </v-alert>
  </v-container>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>