<template>
  <v-app>
    <mcity-toolbar
      fullname="fullname"
      username="username"
      presentation-text="Presentation Mode"
      :isUserAdmin="true"
      title="title"
    >
      <template v-slot:buttons >
        <v-btn text>
          test button
        </v-btn>
      </template>
    </mcity-toolbar>
  </v-app>
</template>

<script>
import McityToolbar from '@mcity/mcity-vue-shared/components/McityToolbar'

export default {
  name: 'App',
  components: {
    McityToolbar,
  },
};
</script>
