<template>
  <div>
    <v-app-bar app dark color="primary" :clipped-left="true">
      <router-link to="/" class="hidden-sm-and-down">
        <slot name="logo">
          <mcity-logo class="logo-padding-top" />
        </slot>
      </router-link>
      <v-toolbar-title class="subtitle" role="button" @click="goHome">
        {{ title }}
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <slot name="buttons" />
        <v-menu left v-if="showApplicationMenu" v-model="appMenu" offset-y style="min-width:1000px">
          <template v-slot:activator="{ on }">
            <v-btn icon color="primary" dark v-on="on">
              <svg-icon
                color="white"
                size="sm"
                class="mt-1 sm"
                url="https://static.um.city/icons/bars-solid.svg"
              />
            </v-btn>
          </template>
          <v-list dense style="min-width: 800px; max-height: 100vh; background-color:#f5c400" class="overflow-y-auto">
            <v-container fluid grid-list-sm>
              <v-layout
                v-for="(itemCat, indCat) in applicationCategories"
                :key="indCat"
                xs4
                column
                wrap
              >
                <v-list-item
                    two-line
                    v-if="itemCat"
                >
                  <b>{{ itemCat.toUpperCase() }}</b>
                </v-list-item>

                <v-flex
                  v-for="(item, ind) in listApplications(itemCat)"
                  :key="ind"
                  xs3
                >
                  <v-list-item
                    :href="item.link"
                    target="_blank"
                    rel="noopener"
                  >
                    <v-list-item-action>
                      <v-list-item-content class="mcity-menu-category-member" color="primary--text">
                        {{ item.text }}
                      </v-list-item-content>
                    </v-list-item-action>
                  </v-list-item>
                </v-flex>
              </v-layout>
            </v-container>
          </v-list>
        </v-menu>
        <v-menu left v-if="showUserMenu" v-model="avatarMenu" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon color="primary" dark v-on="on">
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
                  <a href="https://keys.um.city" target="_blank" rel="noopener">
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
                  class="ml-2 invertible"
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
                  class="ml-2 invertible"
                  size="sm"
                  url="https://static.um.city/icons/sign-out-alt-solid.svg"
                />
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import McityLogo from "./McityLogo.vue";
import SvgIcon from "./SvgIcon";
export default {
  name: "McityToolbar",
  components: {
    "mcity-logo": McityLogo,
    "svg-icon": SvgIcon,
  },
  props: {
    fullname: {
      required: false,
      type: String,
      default: "",
    },
    username: {
      required: false,
      type: String,
      default: "",
    },
    presentationText: {
      required: false,
      type: String,
      default: "",
    },
    isUserAdmin: {
      required: false,
      type: Boolean,
      default: false,
    },
    title: {
      required: false,
      type: String,
      default: "",
    },
    showUserMenu: {
      type: Boolean,
      default: true,
    },
    showPresentationButton: {
      type: Boolean,
      default: true,
    },
    showApplicationMenu: {
      type: Boolean,
      default: true,
    },
    sidebarStartState: {
      type: Boolean,
      default: false,
    },
    width: {
      required: false,
      type: String,
      default: "220"
    },
  },
  data() {
    return {
      expandSiderbar: false,
      appMenu: false,
      clipped: false,
      avatarMenu: false,
      applicationLinks: [],
      applicationCategories: [],
      gray: "#606060",
      on: {},
    };
  },
  mounted() {
    this.expandSiderbar = this.sidebarStartState
    this.setApplicationLinks();
  },
  methods: {
    listApplications(category) {
      return this.applicationLinks.filter(function (e) {
        return e.category == category;
      });
    },
    getHelp() {
      window.location.href = "mailto:mcity-engineering@umich.edu";
    },
    setApplicationLinks() {
      const req = new XMLHttpRequest();
      req.onreadystatechange = function (vue) {
        if (this.readyState === XMLHttpRequest.DONE) {
          vue.applicationLinks = JSON.parse(req.responseText);
        }
        //Set Category list
        vue.applicationCategories = [
          ...new Set(vue.applicationLinks.map((item) => item.category)),
        ];
      }.bind(req, this);
      req.open("GET", "https://static.um.city/menu.json");
      req.send();
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.nav-toggle-btn {
  padding-left: 0px !important;
}
.mcity-menu-category-member {
  margin-left: 10px;
}
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
svg-icon {
  height: 22px;
}
</style>
