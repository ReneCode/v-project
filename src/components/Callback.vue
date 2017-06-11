<template>
</template>

<script>
import auth from '../services/auth-service'

export default {
  name: '',

  mounted() {
    this.$nextTick(() => {
      auth.setIdTokenFromLocation();
    })
  }
}
</script>
