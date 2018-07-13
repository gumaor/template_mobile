<template>
  <div>
    <div class="content row-flex">
      <span>古猫技术部</span>
    </div>
    <demo></demo>
  </div>
</template>

<script>
import Demo from '../components/Demo'
export default {
  components: {Demo},
  data () {
    return {}
  }
}
</script>

<style scoped>
.content {width:100%; height:100%; font-size:28px; padding-top:20px;}
</style>
