<script>
  export default{
    //check if user is logged in if not redirect to login page
    beforeRouteEnter(to,from){
      console.log("about to enter dashbaord")
      //forced failure of redirection to this page need to chech for auth status
      return '/register'
    }
  }
</script>

<template>
  <div>
    <h1>Dashboard view</h1>
  </div>
</template>

<style>
</style>
