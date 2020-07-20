export const routes = [
  {
    name: '笔记列表',
    icon: 'unordered-list',
    to: '/note-list-editor'
  },
  {
    name: '标签分类',
    icon: 'profile',
    to: '/tag-manager'
  },
  {
    name: '系统设置',
    icon: 'setting',
    children: [
      {
        name: 'OSS管理',
        to: '/oss-manager'
      },
      // {
      //   name: '广告图片',
      //   to: 'banner'
      // },
      // {
      //   name: '站点公告',
      //   to: 'notice'
      // },
      // {
      //   name: '个人资料',
      //   to: 'user'
      // }
    ]
  }
]
