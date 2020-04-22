# Mcity-vue-shared
Common vue files/themed components used across projects

# Usage
## Toolbar
1. Import the `McityToolbar` component with
`import McityToolbar from 'mcity-vue-shared/components/McityToolbar'`
2. Include the toolbar component in the template for `app.vue` with `<mcity-toolbar><mcity-toolbar/>`
3. Pass the following required props
    - fullname
    - username
    - presentation-text
    - isUserAdmin
    - title
4. There is a named slot available titled "buttons" when any app-specific toolbar buttons can be placed (see example below).

### Example:
```
<mcity-toolbar
  :fullname="fullname"
  :username="username"
  :presentation-text="presentationText"
  :isUserAdmin="isUserAdmin"
  title="Project Tracking"
>
  <template slot="buttons">
    <v-btn
      v-if="isUserAdmin"
      flat
      :to="{name: 'New'}"
      data-cy="new-project-btn">
      New Project
    </v-btn>
  </template>
</mcity-toolbar>
```