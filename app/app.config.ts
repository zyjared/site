export default defineAppConfig({

  nickname: '应风',
  github: 'https://github.com/zyjared',
  navbar: [
    // {
    //   text: '首页',
    //   link: '/',
    // },
    // {
    //   text: '关于',
    //   link: '/about',
    // },
  ] as Record<'text' | 'link', string>[],
  socials: [
    { text: 'github', icon: 'i-mdi:github', link: 'https://github.com/zyjared' },
    { text: 'email', icon: 'i-ic:round-email', link: 'mailto:zyjared@outlook.com' },
  ],
  links: [
    {
      title: '收藏',
      link: 'https://github.com/zyjared/zyjared/tree/main/docs',
      icon: 'i-ep:collection-tag',
    },
    {
      title: '笔记本',
      link: 'https://notes.zyjared.com',
      icon: 'i-solar:notes-minimalistic-line-duotone',
    },
    {
      title: 'error',
      link: '/error',
      icon: 'i-memory:pound',
    },
  ],
})
