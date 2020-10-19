<template>
  <div class="demo-image__preview">
    <el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="urlList"></el-image>
  </div>
</template>

<script>
export default {
  props: {
    imgkey: {
      type: String,
      default: () => ''
    },

    imgkeys: {
      type: String,
      default: () => ''
    }
  },

  computed: {
    url() {
      return this.$store.getters.baseSrc + this.imgkey
    },

    urlList() {
      const tempList = []

      if (this.imgkeys) {
        this.imgkeys.split(',').forEach((item) => {
          tempList.push(this.$store.getters.baseSrc + item)
        })
      } else {
        tempList.push(this.$store.getters.baseSrc + this.imgkey)
      }
      console.log(tempList)
      return tempList
    }
  }
}
</script>

<style>
</style>
