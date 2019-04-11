<template>
  <div v-if="svg" v-html="svg" :style="cssProps" :class="size"></div>
</template>

<script>
import axios from "axios"
export default {
  props: {
    color: {
      type: String,
      default: '#00274c'
    },
    url: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  data () {
    return {
      svg: null,
      instance: axios.create() // Need new instance so Auth header is not attached
    }
  },
  computed: {
    cssProps () { return {
        '--fill-color': this.color
      }
    }
  },
  created () {
    this.instance
      .get(this.url)
      .then(response => (this.svg = response.data))
      .catch(e => console.log(e + ""))
  }
}
</script>

<style scoped lang="scss">
div {
  color: var(--fill-color);

  .sm {
    width: 1em;
  }
  .md {
    width: 1.5em;
  }
  .lg {
    width: 3em;
  }
  .xl {
    width: 4em;
  }
}
</style>
