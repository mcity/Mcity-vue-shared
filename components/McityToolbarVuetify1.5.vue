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
        <slot name="overflow-buttons" />
        <v-divider />
        <v-list-tile
          v-if="showPresentationButton"
          @click="$store.commit('updatePresentationMode')"
        >
          <v-list-tile-action>
            <svg-icon
              size="sm"
              url="https://static.um.city/icons/text-height-solid.svg"
            />
          </v-list-tile-action>
          <v-list-tile-content>
            {{ presentationText }}
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          :href="'/apidocs'"
          target="_blank"
        >
          <v-list-tile-action>
            <svg-icon
              size="sm"
              url="https://static.um.city/icons/brackets-curly-solid.svg"
            />
          </v-list-tile-action>
          <v-list-tile-content> API Docs </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="getHelp">
          <v-list-tile-action>
            <svg-icon
              size="sm"
              url="https://static.um.city/icons/question-circle-solid.svg"
            />
          </v-list-tile-action>
          <v-list-tile-content> Help </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile>
          <v-list-tile-action>
            <svg-icon
              :color="gray"
              size="sm"
              url="https://static.um.city/icons/applicationMoved.svg"
            />
          </v-list-tile-action>
          <v-list-tile-content>
            Apps have moved to the top right.
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      dark
      color="primary"
      :clipped-left="true"
    >
      <v-toolbar-side-icon
        id="nav-toggle-btn"
        @click="drawer = !drawer"
      />

      <router-link
        to="/"
        class="hidden-sm-and-down"
      >
        <mcity-logo class="mcity-logo-padding-top" />
      </router-link>
      <v-toolbar-title
        class="mcity-subtitle"
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
          v-if="showApplicationMenu"
          v-model="appMenu"
          offset-y
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
                url="https://static.um.city/icons/th-solid.svg"
              />
            </v-btn>
          </template>
          <v-list
            style="max-height: 80vh; min-width: 800px"
            class="overflow-y-auto"
          >
            <v-container
              fluid
              grid-list-sm
            >
              <div
                v-for="(itemCat, indCat) in applicationCategories"
                :key="indCat"
              >
                <v-subheader v-if="itemCat">
                  <b>{{ itemCat }}</b>
                  <v-divider />
                </v-subheader>
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    v-for="(item, ind) in listApplications(itemCat)"
                    :key="ind"
                    xs3
                  >
                    <v-list-tile
                      :href="isUserAdmin || !item.lock ? item.link : ''"
                      target="_blank"
                      rel="noopener"
                    >
                      <v-list-tile-action>
                        <svg-icon
                          v-if="item.lock"
                          url="https://static.um.city/icons/lock-solid.svg"
                        />
                        <svg-icon
                          v-else
                          :url="item.svg"
                        />
                      </v-list-tile-action>
                      <v-list-tile-content color="primary--text">
                        {{ item.text }}
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-flex>
                </v-layout>
              </div>
            </v-container>
          </v-list>
        </v-menu>
        <v-menu
          left
          v-if="showUserMenu"
          v-model="avatarMenu"
          offset-y
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
          <v-list class="mcity-min-content">
            <v-list-tile>
              <v-list-tile-content class="mcity-no-padding">
                <v-list-tile-title>
                  <a
                    href="https://keys.um.city"
                    target="_blank"
                    rel="noopener"
                  >
                    {{ fullname }}
                  </a>
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ username }}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider />
          <v-list>
            <v-list-tile>
              <v-btn
                flat
                class="mcity-no-padding"
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
            </v-list-tile>
            <v-list-tile>
              <v-btn
                flat
                class="mcity-no-padding"
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
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import McityLogo from "./McityLogo.vue";
import SvgIcon from "./SvgIcon";
export default {
  name: 'McityToolbar',
  components: {
    'mcity-logo': McityLogo,
    'svg-icon': SvgIcon
  },
  props: {
    fullname: {
      required: false,
      type: String,
      default: ''
    },
    username: {
      required: false,
      type: String,
      default: ''
    },
    presentationText: {
      required: false,
      type: String,
      default: ''
    },
    isUserAdmin: {
      required: false,
      type: Boolean,
      default: false
    },
    title: {
      required: false,
      type: String,
      default: ''
    },
    showUserMenu: {
      type: Boolean,
      default: true
    },
    showPresentationButton: {
      type: Boolean,
      default: true
    },
    showApplicationMenu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      drawer: false,
      appMenu: false,
      clipped: false,
      avatarMenu: false,
      applicationLinks: [],
      applicationCategories: [],
      gray: '#606060',
      on: {}
    }
  },
  mounted () {
    this.setapplicationLinks()
  },
  methods: {
    listApplications (category) {
      return this.applicationLinks.filter(function (e) {
        return e.category === category
      })
    },
    getHelp () {
      window.location.href = 'mailto:mcity-engineering@umich.edu'
    },
    setapplicationLinks () {
      const req = new XMLHttpRequest()
      req.onreadystatechange = function (vue) {
        if (this.readyState === XMLHttpRequest.DONE) {
          vue.applicationLinks = JSON.parse(req.responseText)
        }
        // Set Category list
        vue.applicationCategories = [
          ...new Set(vue.applicationLinks.map((item) => item.category))
        ]
      }.bind(req, this)
      req.open('GET', 'https://static.um.city/menu.json')
      req.send()
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.mcity-subtitle {
  font-weight: 500;
  padding-left: 20px;
}
.mcity-no-padding {
  padding: 0 0 0 0;
  letter-spacing: inherit;
}
.mcity-min-content {
  min-width: 204px;
  width: min-content;
}
.mcity-logo-padding-top {
  padding-top: 4px;
}
svg-icon {
  height: 22px;
}
</style>
