<template>
  <div class="create_or_update_tag__page invert">
    <div class="funs">
      <Button class="mr8" @click="createTagItemFn">新建</Button>
      <Button class="mr8">删除</Button>
      <Button class="mr8">冻结</Button>
      <div class="mr16">
        <InputSearch style="width: 400px; margin-right: 4px;" placeholder="输入标签名字" loading></InputSearch>
      </div>
      <div>
        <Checkbox>未冻结</Checkbox>
        <Checkbox>已冻结</Checkbox>
      </div>
    </div>
    <Table
      :columns="columns"
      :data-source="data"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    >
      <div class="action" slot="action" slot-scope="text, record">
        <a>修改</a>
        <a>冻结</a>
        <a>删除</a>
      </div>
    </Table>
  </div>
</template>

<script>
import { Table, Button, Input, Checkbox } from 'ant-design-vue'

const InputSearch = Input.Search

const columns = [
  {
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  },
  {
    title: '标签名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    key: 'createAt',
  },
  {
    title: '修改时间',
    dataIndex: 'updateAt',
    key: 'updateAt',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: '20%',
  }
]

const data = [
  {
    key: 1,
    name: '前端',
    _id: 'asdasdasd12314dsad34',
    createAt: '2020-7-1 18:00',
    updateAt: '2020-7-3 07:20'
  },
  {
    key: 2,
    name: 'Vue',
    _id: 'asdasdasd12314dsad34',
    createAt: '2020-7-1 18:00',
    updateAt: '2020-7-3 07:20'
  },
  {
    key: 3,
    name: '后端',
    _id: 'asdasdasd12314dsad34',
    createAt: '2020-7-1 18:00',
    updateAt: '2020-7-3 07:20'
  }
]

export default {
  components: {
    InputSearch,
    Checkbox,
    Table,
    Button,
  },
  data () {
    return {
      columns,
      data,
      selectedRowKeys: [],
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log(this.selectedRowKeys, selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    createTagItemFn () {
      this.$router.push('/tag-manager/create-or-update-tag')
    },
  },
}
</script>

<style lang="scss">
.create_or_update_tag__page {
  min-height: 100%;

  .mr8 {
    margin-right: 8px;
  }

  .mr16 {
    margin-right: 16px;
  }

  .action a + a {
    margin-left: 8px;
  }
}

.create_or_update_tag__page .funs {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}
</style>
