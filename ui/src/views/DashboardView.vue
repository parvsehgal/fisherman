<script>
  export default{
    //check if user is logged in if not redirect to login page
    async beforeRouteEnter(to,from){
      try{
        const res = await fetch("http://localhost:3000/dashboard/health", {
        credentials: "include",
      });
      if (!res.ok) return "/login";
      }catch(err){
        return '/login'
      }
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
