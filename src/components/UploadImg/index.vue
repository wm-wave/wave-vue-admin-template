<template>
  <div v-loading="uploadLoading">
    <el-upload
      action="#"
      :class="{hide: updateHide}"
      :on-change="handleChange"
      :file-list="fileList"
      list-type="picture-card"
      :limit="1"
      :auto-upload="false"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>

          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>

    <el-dialog :visible.sync="dialogImgVisible" append-to-body top="2vh">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UploadImg',

  props: {
    type: {
      type: String,
      default: () => ''
    },

    srcKey: {
      type: String,
      default: () => ''
    }
  },

  data() {
    return {
      updateHide: false,
      fileList: [],
      dialogImgVisible: false,
      dialogImageUrl: '',

      uploadLoading: false
    }
  },

  computed: {
    ...mapGetters(['baseSrc'])
  },

  created() {
    if (this.srcKey) {
      console.log(this.baseSrc + this.srcKey)
      this.fileList.push({
        url: this.baseSrc + this.srcKey
      })

      this.updateHide = true
    }
  },

  methods: {
    async handleChange(file) {
      this.uploadLoading = true

      this.updateHide = true
      const res = await this.$store.dispatch('upload/updateFile', file)
      const { code, data: id, msg } = res
      if (code === 0) {
        this.$emit('handleGetImgId', {
          type: this.type,
          id
        })
      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }

      this.uploadLoading = false
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogImgVisible = true
    },

    async handleRemove(file) {
      this.fileList = []

      this.$emit('handleDeleteImgId', this.type)

      this.$message({
        type: 'success',
        message: '删除成功~'
      })

      this.$nextTick(() => {
        this.updateHide = false
      })
    },

    clear() {
      this.fileList = []
      this.updateHide = false
    }
  }
}
</script>

<style scoped>
.hide >>> .el-upload--picture-card {
  display: none;
}

>>> .el-upload-list__item {
  transition: none !important;
}
</style>
