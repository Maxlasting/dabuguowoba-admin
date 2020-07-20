<template>
  <div class="login__page">
    <Card class="login__page-card" title="后台管理系统">
      <Form :form="form">
        <FormItem>
          <Input type="text" placeholder="用户名"
            v-decorator="[
              'username',
              {rules: [{ required: true, message: 'Please input your username!' }]}
            ]"
          >
            <Icon class="light" slot="prefix" type="user"/>
          </Input>
        </FormItem>
        <FormItem>
          <Input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: 'Please input your password!' }] }
            ]"
            type="password"
            autocomplete
            placeholder="密码"
          >
            <Icon class="light" slot="prefix" type="lock"/>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" style="width: 100%;" :loading="pending" @click="onClickLoginFn">登陆</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { Card, Form, Input, Button, Icon } from 'ant-design-vue'
import request from '@request'

export default {
  components: {
    Card,
    Form,
    FormItem: Form.Item,
    Input,
    Button,
    Icon,
  },
  data () {
    return {
      form: this.$form.createForm(this),
      pending: false,
    }
  },
  methods: {
    onClickLoginFn () {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.pending = true
          const res = await request.post('/api/userLogin', { ...values })
          this.pending = false
          if (res.success) {
            localStorage.setItem('x_blog_token', res.data.token)
            this.$router.replace('/')
          }
        }
      })
    },
  },
}
</script>

<style lang="scss">
.login__page {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #e0e0e0;

  .login__page-card {
    background-color: #ffffff;
    border-radius: 6px;
    width: 420px;
  }
}
</style>
