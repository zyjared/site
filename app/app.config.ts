export default defineAppConfig({
  nickname: '应风',
  github: 'https://github.com/zyjared',
  navbar: [
    {
      text: '主页',
      icon: 'i-carbon:home',
      link: '/',
    },
    {
      text: '书签',
      icon: 'i-carbon:bookmark',
      link: '/bookmarks',
    },
  ],
  socials: [
    { text: 'github', icon: 'i-carbon:logo-github', link: 'https://github.com/zyjared' },
    { text: 'email', icon: 'i-carbon:email', link: 'mailto:zyjared@outlook.com' },
  ],

  // 首页的链接
  links: [
    {
      title: '书签',
      link: '/bookmarks',
      icon: 'i-carbon:bookmark',
    },
    {
      title: '笔记本',
      link: 'https://notes.zyjared.com',
      icon: 'i-carbon:notebook',
    },
    {
      title: 'error',
      link: '/error',
      icon: 'i-memory:pound',
    },
  ],
})
