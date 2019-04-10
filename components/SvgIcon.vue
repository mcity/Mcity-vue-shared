<template>
    <div v-if="svg" v-html="svg" :style="cssProps"></div>
</template>

<script>
import axios from "axios"
export default {
  props: ["color", "url"],
  data () {
    return {
      svg: null
    }
  },
  computed: {
    cssProps () { return {
        '--fill-color': this.color
      }
    }
  },
  created () {
    axios
      .get(this.url)
      .then(response => (this.svg = response.data))
      .catch(e => console.log(e + ""))
  }
}
</script>

<style scoped>
div {
  color: var(--fill-color)
}
</style>
