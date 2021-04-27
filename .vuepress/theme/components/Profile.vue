<template>
  <v-card class="profile" raised>
    <img class="d-block" :src="mainImage" alt="Main Image" width="100%" />
    <div>
      <v-btn v-if="email" :href="`mailto:${email}`" icon>
        <v-icon>mdi-email</v-icon>
      </v-btn>
      <v-btn v-if="githubProfile" :href="githubProfile" target="_blank" icon>
        <v-icon>mdi-github</v-icon>
      </v-btn>
      <v-menu v-if="wechatOfficialAccountCode"
        :close-delay="100" rounded="xl" transition="scale-transition" offset-y open-on-hover>
        <template #activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-wechat</v-icon>
          </v-btn>
        </template>
        <img class="d-block" :src="wechatOfficialAccountCode" alt="Wechat Official Account" width="100%" />
      </v-menu>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'Profile',
  props: {
    mainImage: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    githubProfile: {
      type: String
    },
    wechatOfficialAccountCode: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
.profile
  width: 20rem
</style>
