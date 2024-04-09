<template>
    <div class="hello">
      <FwTurn class="magazine" :options="bookOptions">
        <div v-for="i in 6" :key="i">
          <img
            :src="`https://raw.githubusercontent.com/Reidond/vue-turnjs/develop/static/turn/0${i}.jpg`"
            alt="image${i}"
          />
        </div>
      </FwTurn>
    </div>
  </template>
  
  <script>
  import { FwTurn } from "vue-turnjs";
  
  export default {
    name: "HelloWorld",
    components: {
      FwTurn,
    },
    props: {
      msg: String,
    },
    data() {
      return {
        bookOptions: {
          display: "double",
          acceleration: true,
          elevation: 50,
        },
      };
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .magazine {
    width: 1152px;
    height: 752px;
  }
  .magazine .turn-page {
    background-color: #ccc;
    background-size: 100% 100%;
  }
  </style>
  