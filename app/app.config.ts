export default defineAppConfig({
  displayName: '应风',
  socials: [
    { text: 'github', icon: 'i-carbon:logo-github', link: 'https://github.com/zyjared', username: 'zyjared', featured: true },
    { text: 'email', icon: 'i-carbon:email', link: 'mailto:zyjared@outlook.com', username: 'zyjared@outlook.com' },
  ],
  navbar: [
    {
      text: '主页',
      icon: 'i-carbon:home',
      link: '/',
    },
    {
      text: '碎片',
      icon: 'i-mdi:feather',
      link: '/posts',
    },
    {
      text: '书签',
      icon: 'i-carbon:bookmark',
      link: '/bookmarks',
    },
  ],

  // 首页的链接
  links: [
    {
      text: '碎片',
      link: '/posts',
      icon: 'i-mdi:feather',
    },
    {
      text: '书签',
      link: '/bookmarks',
      icon: 'i-carbon:bookmark',
    },
    {
      text: '笔记本',
      link: 'https://notes.zyjared.com',
      icon: 'i-carbon:notebook',
    },
    // {
    //   title: 'error',
    //   link: '/error',
    //   icon: 'i-memory:pound',
    // },
  ],
})
