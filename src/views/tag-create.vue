<template>
  <div class="tag_create__page invert">
    <Form :label-col="{ span: 1 }" :wrapper-col="{ span: 5 }">
      <FormItem label="标签">
        <Input type="text" placeholder="名称"/>
      </FormItem>
      <FormItem label="属性">
        <RadioGroup :default-value="true">
          <Radio :value="true">启用</Radio>
          <Radio :value="false">禁用</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :wrapperCol="{ span: 8, offset: 1 }">
        <Button style="margin-right: 16px;">取消</Button>
        <Button>确定</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, Button, Input, Icon, Radio } from 'ant-design-vue'

export default {
  components: {
    Form,
    FormItem: Form.Item,
    Button,
    Icon,
    Input,
    Radio,
    RadioGroup: Radio.Group,
  }
}
</script>

<style lang="scss">
.tag_create__page {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  min-height: 100%;
}
</style>
