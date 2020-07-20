<template>
  <div class="enter__layout">
    <Layout style="height: 100%;">
      <Sider class="enter__aside" v-model="collapsed" :trigger="null" collapsible>
        <h1 class="enter__aside-title">
          <a href="/" class="title__link">
            <img class="title__link-image" :class="{ collapsed }" src="@assets/logo.png"/>
            <span class="title__link-text" :class="{ collapsed }">博客管理系统 </span>
          </a>
        </h1>
        <Menu class="menu" mode="inline" :defaultOpenKeys="defaultOpenedSubMenus" :selectedKeys="[$route.path]" @click="onMenuClickFn">
          <template v-for="item of routes">
            <SubMenu v-if="item.children && item.children.length" :key="item.name">
              <span slot="title">
                <Icon :type="item.icon"></Icon>
                <span>{{ item.name }}</span>
              </span>
              <MenuItem v-for="route in item.children" :key="route.to">{{ route.name }}</MenuItem>
            </SubMenu>
            <MenuItem v-else :key="item.to">
              <Icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </MenuItem>
          </template>
        </Menu>
      </Sider>
      <Layout>
        <Header class="enter__header">
          <Icon
            class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="enter__header-user">
            <User></User>
            <div class="write" @click="clickToWriteFn">写笔记</div>
          </div>
        </Header>
        <Content class="enter__content">
          <div class="main">
            <router-view></router-view>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<style lang="scss" src="@styles/enter-layout.scss"></style>

<script>
import { routes, routesObject } from '@config'
import { Menu, Icon, Layout, Button } from 'ant-design-vue'
import User from '@components/user.vue'

const { Sider, Header, Content } = Layout
const { SubMenu, Item: MenuItem } = Menu

export default {
  components: {
    Layout,
    Sider,
    Header,
    Content,
    Menu,
    MenuItem,
    SubMenu,
    Icon,
    Button,
    User,
  },
  data () {
    return {
      routes,
      collapsed: false,
    }
  },
  computed: {
    defaultOpenedSubMenus () {
      return this.routes.filter(_ => _.children && _.children.length).map(_ => _.name)
    }
  },
  methods: {
    onMenuClickFn (e) {
      this.$router.push(e.key)
    },
    clickToWriteFn () {
      this.$router.push('/write')
    }
  },
}
</script>
