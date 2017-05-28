<template>
</template>

<script>
import auth from '../service/auth-service'

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
