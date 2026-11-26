<script>
  export default{

    data(){
      return{
        client:null
      }
    },

    //check if user is logged in if not redirect to login page
    async beforeRouteEnter(to,from,next){
      try{
        const res = await fetch("http://localhost:3000/dashboard/health", {
        credentials: "include",
      });
      const data = await res.json();
      //console.log(data.client)
      if (!res.ok) return "/login";
      next((vm) =>{
        vm.client = data.client
      })
      }catch(err){
        return '/login'
      }
    }
}

</script>

<template>
  <div>
    <h1 v-if='client'>welcome {{client.username}}</h1>
  </div>
</template>

<style>
</style>
