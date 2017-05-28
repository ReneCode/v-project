<template>
</template>

<script>
import auth from '../service/auth'

export default {
  name: '',

  mounted() {
    this.$nextTick(() => {
      auth.setAccessToken();
      auth.setIdToken();
      window.location.href = '/';
    })
  }
}
</script>
