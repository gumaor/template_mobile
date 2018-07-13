<template>
  <div class="wrapper">
    <mt-button type="primary" @click="loading">Loading</mt-button>
    <mt-button type="primary" @click="toast">Toast</mt-button>
    <mt-button type="primary" @click="alert">Alert</mt-button>
    <mt-button type="primary" @click="confirm">Confirm</mt-button>
    <mt-button type="primary" @click="prompt">Prompt</mt-button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    loading() {
      common.showLoading();
      setTimeout(() => {
        common.hideLoading();
      }, 3000);
    },
    toast() {
      common.toast('toast');
    },
    alert() {
      common.alert('alert');
    },
    confirm() {
      common.confirm('confirm', () => {
        common.toast('ok');
      }, () => {
        common.toast('cancel');
      });
    },
    prompt() {
      common.prompt('prompt', val => {
        common.toast(val);
      })
    }
  }
}
</script>

<style scoped>
.wrapper {padding:20px;}
.wrapper>button {width:100%; margin-top:20px;}
</style>
