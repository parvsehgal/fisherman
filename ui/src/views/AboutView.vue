<script>
  export default   {
    data(){
      return {
        count:0
      }
    },

    methods:{
      increment(){
        this.count++
      }
    },

    mounted(){
      console.log("this component is mounted")
    },
    updated(){
      console.log("this component updated")
    },
    unmounted(){
      console.log("this component is un-mounted")
    }
  }
</script>

<template>
  <div class="about">
    <h1>this is an about page</h1>
    <button @click="increment">this is a button</button>
    <h1>{{count}}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
