<template>
  <v-app>
    <mcity-toolbar
      fullname="fullname"
      username="username"
      presentation-text="Presentation Mode"
      :isUserAdmin="true"
      title="Vuetify 1.5 Dev Environment"
    >
      <template v-slot:buttons >
      </template>
    </mcity-toolbar>
  </v-app>
</template>

<script>
import McityToolbar from '@mcity/mcity-vue-shared/components/McityToolbarVuetify1.5'

export default {
  name: 'App',
  components: {
    McityToolbar,
  },
};
</script>
