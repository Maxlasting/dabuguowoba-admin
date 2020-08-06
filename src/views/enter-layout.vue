<template>
  <div class="enter__layout">
    <Layout style="height: 100%;">
      <Sider class="enter__aside invert" v-model="collapsed" :trigger="null" collapsible>
        <h1 class="enter__aside-title">
          <a href="/" class="title__link">
            <img class="title__link-image" :class="{ collapsed }" src="@assets/logo.png"/>
            <span class="title__link-text" :class="{ collapsed }">博客管理系统 </span>
          </a>
        </h1>
        <Menu class="menu" mode="inline" :defaultOpenKeys="defaultOpenedSubMenus" :selectedKeys="[$route.name]" @click="onMenuClickFn">
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
        <Header class="enter__header invert">
          <Icon
            class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="enter__header-title">{{ curtRouteName }}</div>
          <div class="enter__header-user">
            <user/>
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
      routes: [
        {
          name: '笔记列表',
          to: 'note',
          icon: 'unordered-list',
        },
        {
          name: '标签分类',
          to: 'tag',
          icon: 'profile',
        },
        // {
        //   name: '系统设置',
        //   icon: 'setting',
        //   children: [
        //     {
        //       name: 'OSS管理', to: 'oss'
        //     },
        //   ]
        // }
      ],
      collapsed: false,
    }
  },
  computed: {
    defaultOpenedSubMenus () {
      return this.routes.filter(_ => _.children && _.children.length).map(_ => _.name)
    },
    curtRouteName () {
      const target = this.routes.filter(item => item.to === this.$route.name)
      return target.length ? target[0].name : ''
    },
  },
  mounted () {
    // console.log(this.$route)
  },
  methods: {
    onMenuClickFn (e) {
      this.$router.push({ name: e.key })
    },
    clickToWriteFn () {
      this.$router.push('/write')
    }
  },
}
</script>
