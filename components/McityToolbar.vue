<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      persistent
      :clipped="true"
      enable-resize-watcher
      fixed
      app
      width="220"
    >
      <v-list>
        <v-list-item
          v-for="(item, ind) in sidebarLinks"
          :key="ind"
          :href="(isUserAdmin || !item.lock) ? item.link : ''"
          target="_blank"
          rel="noopener"
        >
          <v-list-item-action>
            <svg-icon
              v-if="item.lock"
              url="https://static.um.city/icons/lock-solid.svg"
            />
            <svg-icon
              v-else
              :url="item.svg"
            />
          </v-list-item-action>
          <v-list-item-content color="primary--text">
            {{ item.text }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      dark
      color="primary"
      :clipped-left="true"
    >
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"/>
      <router-link
        to="/"
        class="hidden-sm-and-down"
      >
        <mcity-logo class="logo-padding-top" />
      </router-link>
      <v-toolbar-title
        class="subtitle"
        role="button"
        @click="goHome"
      >
        {{ title }}
      </v-toolbar-title>

      <v-spacer />
      <v-toolbar-items>
        <slot name="buttons" />
        <v-menu
          left
          v-if="showUserMenu"
          v-model="avatarMenu"
          :close-on-content-click="false"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="primary"
              dark
              v-on="on"
            >
              <svg-icon
                color="white"
                size="sm"
                class="mt-1"
                url="https://static.um.city/icons/user-circle-solid.svg"
              />
            </v-btn>
          </template>
            <v-list class="min-content">
              <v-list-item>
                <v-list-item-content class="no-padding">
                  <v-list-item-title>
                    <a
                      href="https://keys.um.city"
                      target="_blank"
                      rel="noopener"
                    >
                      {{ fullname }}
                    </a>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ username }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider />
            <v-list>
              <v-list-item>
                  <v-btn
                    text
                    class="no-padding"
                    href="https://keys.um.city/password"
                    v-on="on"
                  >
                    Change Password
                    <svg-icon
                      :color="gray"
                      class="ml-2"
                      size="sm"
                      url="https://static.um.city/icons/fingerprint-solid.svg"
                    />
                  </v-btn>
              </v-list-item>
              <v-list-item>
                  <v-btn
                    text
                    class="no-padding"
                    href="https://keys.um.city/logout"
                    v-on="on"
                  >
                    Logout
                    <svg-icon
                      :color="gray"
                      class="ml-2"
                      size="sm"
                      url="https://static.um.city/icons/sign-out-alt-solid.svg"
                    />
                  </v-btn>
              </v-list-item>
            </v-list>
        </v-menu>
      </v-toolbar-items>

        <v-menu
          open-on-hover
          class="ml-3"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="primary"
              dark
              v-on="on"
            >
              <svg-icon
                color="white"
                size="xxs"
                class="mt-1 mx-1"
                url="https://static.um.city/icons/ellipsis-v-solid.svg"
              />
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-if="showPresentationButton"
              @click="$store.commit('updatePresentationMode')"
            >
              <v-list-item-action>
                <svg-icon
                  :color="gray"
                  size="sm"
                  url="https://static.um.city/icons/text-height-solid.svg"
                />
              </v-list-item-action>
              <v-list-item-content>
                {{ presentationText }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              :href="'/apidocs'"
              target="_blank"
            >
              <v-list-item-action>
                <svg-icon
                  :color="gray"
                  size="sm"
                  url="https://static.um.city/icons/brackets-curly-solid.svg"
                />
              </v-list-item-action>
              <v-list-item-content>
                API Docs
              </v-list-item-content>
            </v-list-item>

            <v-list-item @click="getHelp">
              <v-list-item-action>
                <svg-icon
                  :color="gray"
                  size="sm"
                  url="https://static.um.city/icons/question-circle-solid.svg"
                />
              </v-list-item-action>
              <v-list-item-content>
                Help
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <slot name="overflow-buttons" />
          </v-list>
        </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import McityLogo from './McityLogo.vue'
import SvgIcon from './SvgIcon'
export default {
  name: 'McityToolbar',
  components: {
    'mcity-logo': McityLogo,
    'svg-icon': SvgIcon,
  },
  props: {
    fullname: {
      required: false,
      type: String,
      default: '',
    },
    username: {
      required: false,
      type: String,
      default: '',
    },
    presentationText: {
      required: false,
      type: String,
      default: '',
    },
    isUserAdmin: {
      required: false,
      type: Boolean,
      default: false,
    },
    title: {
      required: false,
      type: String,
      default: '',
    },
    showUserMenu: {
      type: Boolean,
      default: true,
    },
    showPresentationButton: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      drawer: false,
      clipped: false,
      avatarMenu: false,
      sidebarLinks: [],
      gray: '#606060',
      on: {},
    }
  },
  mounted () {
    this.setSidebarLinks()
  },
  methods: {
    getHelp () {
      window.location.href = 'mailto:mcity-engineering@umich.edu'
    },
    setSidebarLinks () {
      const req = new XMLHttpRequest()
      req.onreadystatechange = function (vue) {
        if (this.readyState === XMLHttpRequest.DONE) {
          vue.sidebarLinks = JSON.parse(req.responseText)
        }
      }.bind(req, this)
      req.open('GET', 'https://static.um.city/menu.json')
      req.send()
    },
    goHome () {
      this.$router.push('/')
    },
  },
}
</script>

<style>
.subtitle {
  font-weight: 500;
  padding-left: 20px;
}
.no-padding {
  padding: 0 0 0 0 !important;
  letter-spacing: inherit !important  ;
}
.min-content {
  min-width: 204px;
  width: min-content;
}
.logo-padding-top {
  padding-top: 4px;
}
</style>
