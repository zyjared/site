---
title: Linux
description: 初始化 Linux
---

# linux

```bash
sudo apt update
```

## git

- [git](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)

```bash
sudo apt install git-all
```

## node

### nvm

- [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

nvm install node

node -v
```

如果要保持最新版本：

```bash
(
  cd "$NVM_DIR"
  git fetch --tags origin
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)`
) && \. "$NVM_DIR/nvm.sh"
```

默认会使用最新版的 node，指定特定版本

```bash
nvm install 20
```

### pnpm

- [pnpm](https://pnpm.io/zh/installation#%E5%9C%A8-posix-%E7%B3%BB%E7%BB%9F%E4%B8%8A)

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

或者使用 Corepack

```bash
npm install --global corepack@latest

corepack enable pnpm
corepack use pnpm@latest-10
```

### ni

- [ni](https://github.com/antfu-collective/ni#ni)

```bash
npm i -g @antfu/ni
```

## docker

- [Installation methods](https://docs.docker.com/engine/install/ubuntu/#installation-methods)

1. 设置 `apt` 仓库

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

2. 安装最新版本

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. 验证

```bash
sudo docker run hello-world
```
