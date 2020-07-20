<template>
  <div class="write__page">
    <div class="write__page-block">
      <component
        :is="aceMarkdownEditor"
        :value="savedValue"
        title=""
        @submit="clickToSubmitFn"
        @save="saveFn"
        autosave
        ref="editor"
      >
        <div slot="header">
          <Button class="submit_btn" @click="clickToSubmitFn">提交</Button>
          <Button class="back_btn" @click="clickToBackPageFn">返回</Button>
        </div>
        <div slot="footer" style="margin-left: 8px;">
          <Upload
            :show-upload-list="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            style="display: flex; align-items: center;"
            :before-upload="beforeUploadFn"
            @change="uploaderChangeFn"
          >
            <div class="upload__img"></div>
          </Upload>
        </div>
      </component>
    </div>
    <div class="write__page-loading" v-show="loading"></div>
  </div>
</template>

<style lang="scss" src="@styles/write.scss"></style>

<script>
import { Upload, message, Button } from 'ant-design-vue'
import progress from '@components/progress'

let aceMarkdownEditor = null

export default {
  components: {
    Upload,
    Button
  },
  data () {
    return {
      aceMarkdownEditor: null,
      savedValue: '',
      loading: false,
    }
  },
  mounted () {
    this.initEditor()
  },
  async asyncData () {
    aceMarkdownEditor = await import('ace-vue-editor')
    aceMarkdownEditor = aceMarkdownEditor.default
  },
  methods: {
    initEditor () {
      this.aceMarkdownEditor = aceMarkdownEditor
    },
    clickToSubmitFn () {
      const data = this.$refs.editor.$submit()
      console.log(data)
    },
    saveFn (data) {

    },
    beforeUploadFn(file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      if (!isType) {
        message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      if (isType && isLt2M) {
        progress.start()
        return true
      }
      return false
    },
    uploaderChangeFn (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.$refs.editor.$insertImage(info.file.response.url)
        this.loading = false
        progress.finish()
      }
    },
    clickToBackPageFn () {
      this.$router.back()
    },
  },
}
</script>
