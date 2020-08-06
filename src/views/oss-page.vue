<template>
  <div class="oss_page">
    <div class="oss_controls invert">
      <span class="item">操作:</span>
      <Button class="item" ghost type="primary" @click="selectedListFn">全选</Button>
      <Button class="item" ghost type="primary" :disabled="!checkedList.length"  @click="unselectedListFn">反选</Button>
      <Button class="item" ghost type="primary" :disabled="!checkedList.length" @click="removeItemsFn">删除</Button>
    </div>
    <div class="oss_content">
      <List :grid="{ gutter: 16, column: 6 }" :data-source="imgList" :loading="loading" style="min-height: 400px">
        <div
          slot="loadMore"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
          <Spin v-if="!marker && loading" />
          <Button v-if="marker" @click="requestOssImgListFn">
            loading more
          </Button>
        </div>
        <ListItem slot="renderItem" slot-scope="item, index">
          <Card :title="'图片：' + (index + 1)" :loading="!item.loaded">
            <div slot="extra">
              <Checkbox v-model="checkedItems[item.key]"></Checkbox>
            </div>
            <div style="width: 100%; text-align: center; overflow: hidden;">
              <img :src="domain + '/' + item.key" height="120px"/>
            </div>
          </Card>
        </ListItem>
      </List>
    </div>
  </div>
</template>

<style lang="scss" src="@styles/oss-page.scss"></style>

<script>
import Vue from 'vue'
import request from '@request'
import { List, Card, Checkbox, Button, Modal, Spin } from 'ant-design-vue'

const ListItem = List.Item

Vue.use(Modal)

export default {
  components: {
    List,
    ListItem,
    Card,
    Checkbox,
    Button,
    Spin,
  },
  data () {
    return {
      imgList: [],
      limit: 10,
      marker: '',
      domain: '',
      checkedItems: {},
      loading: false,
    }
  },
  computed: {
    checkedList () {
      const arr = []
      for (let key in this.checkedItems) {
        if (this.checkedItems[key]) {
          arr.push(key)
        }
      }
      return arr
    }
  },
  mounted () {
    this.requestOssImgListFn()
  },
  methods: {
    async requestOssImgListFn () {
      this.loading = true
      const params = {
        limit: this.limit,
      }
      if (this.marker) params.marker = this.marker
      const res = await request.get('/api/imageList', { params })
      this.marker = res.data.marker
      this.domain = res.data.domain
      let items = res.data.items
      items.forEach(item => item.loaded = false)
      this.imgList = [...this.imgList, ...items]
      this.imgList.forEach((item) => {
        // if (typeof item.loaded == 'boolean') return
        const img = new Image()
        img.src = this.domain + '/' + item.key
        img.onload = () => item.loaded = true
      })
      const checkedItems = {}
      this.imgList.forEach((item) => checkedItems[item.key] = false)
      this.checkedItems = checkedItems
      this.loading = false
    },

    selectedListFn () {
      for (let key in this.checkedItems) {
        this.checkedItems[key] = true
      }
    },

    unselectedListFn () {
      for (let key in this.checkedItems) {
        this.checkedItems[key] = false
      }
    },

    removeItemsFn () {
      Modal.confirm({
        title: '警告', content: '确定删除么？', okText: '确认', cancelText: '取消',
        centered: true,
        onOk: this._removeItemsFn,
      })
    },

    async _removeItemsFn () {
      this.loading = true
      await request.post('/api/deleteImages', { imgs: this.checkedList })
      // this.checkedList.forEach((key) => this.)
      this.loading = false
    }
  },
}
</script>
