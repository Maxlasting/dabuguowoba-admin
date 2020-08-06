<template>
  <div class="user-component">
    <Dropdown :trigger="['click']" placement="bottomCenter">
      <div class="dropdown_header">
        <Avatar :size="24" icon="user" :src="avatar"></Avatar>
        <div class="name">{{ username || 'admin' }}</div>
      </div>
      <Menu slot="overlay" class="invert">
        <MenuItem key="0" style="min-width: 180px; padding: 8px 0 8px 24px; display: flex; align-items: center;">
          <Icon type="setting"></Icon>
          <router-link to="/user">个人设置</router-link>
        </MenuItem>
        <MenuItem key="1" style="min-width: 180px; padding: 8px 0 8px 24px; display: flex; align-items: center;">
          <Icon type="tool"></Icon>
          <span>密码修改</span>
        </MenuItem>
        <MenuItem key="2" style="min-width: 180px; padding: 8px 0 8px 24px; display: flex; align-items: center; border-top: 1px solid #e8e8e8">
          <Icon type="logout"></Icon>
          <span @click="clickTouserLogouFn">退出登陆</span>
        </MenuItem>
      </Menu>
    </Dropdown>

  </div>
</template>

<script>
import { Avatar, Dropdown, Menu, Icon } from 'ant-design-vue'

export default {
  components: {
    Avatar,
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
    Icon,
  },
  props: {
    username: String,
    avatar: String,
  },
  methods: {
    clickTouserLogouFn () {
      localStorage.removeItem('x_blog_token')
      this.$router.replace('/login')
    }
  }
}
</script>

<style lang="scss">
.user-component {
  height: 100%;
  padding: 0 16px;
  &:hover {
    background-color: rgba($color: #e8e8e8, $alpha: 0.3);
  }
}

.user-component .dropdown_header {
  display: flex;
  align-items: center;
  cursor: pointer;
  .name {
    margin-left: 8px;
    font-size: 16px;
  }
}
</style>
