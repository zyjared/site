import { defineSidebar } from '../defineSidebar'

export const docker = defineSidebar({
  base: '/docker/',
  items: [
    { text: 'Docker 介绍', link: '/' },
    { text: 'Docker 基础概念', link: 'basics' },
    { text: 'Docker 安装与环境配置', link: 'installation-and-setup' },
    { text: 'Docker 命令行基础', link: 'cli-basics' },
    { text: 'Docker 镜像管理', link: 'image-management' },
    { text: 'Docker 容器管理', link: 'container-management' },
    { text: 'Docker 网络管理', link: 'networking' },
    { text: 'Docker 数据卷与存储', link: 'volumes-and-storage' },
    // { text: '多容器编排', link: 'multi-container-orchestration' },
    // { text: 'Docker Registry 与 Docker Hub', link: 'docker-registry-and-hub' },
    // { text: '高级应用', link: 'advanced-applications' },
    // { text: '安全性、性能调优与故障排查', link: 'security-performance-troubleshooting' },
  ],
})
