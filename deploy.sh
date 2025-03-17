#!/bin/bash

set -e

# 配置
PROJECT_NAME="site"
DOCKER_REGISTRY="zyjared"
GITHUB_REPO="zyjared/site"
BRANCH="main"

# 版本标签
VERSION=$(date +%Y%m%d_%H%M)
IMAGE_NAME="$DOCKER_REGISTRY/$PROJECT_NAME:$VERSION"

# 检查必要命令
command -v docker >/dev/null 2>&1 || { echo "错误: 需要 docker"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "错误: 需要 git"; exit 1; }

# 创建日志目录
mkdir -p logs

echo "→ 开始部署..."

# 拉取最新代码
if [ -d .git ]; then
  echo "→ 更新代码..."
  git remote set-url origin https://github.com/$GITHUB_REPO.git || git remote add origin https://github.com/$GITHUB_REPO.git
  git fetch origin $BRANCH
  git reset --hard origin/$BRANCH
else
  echo "→ 克隆仓库..."
  git clone -b $BRANCH https://github.com/$GITHUB_REPO.git . --depth 1
fi

function docker_build_with_retry() {
  local max_attempts=3
  local attempt=1
  
  while [ $attempt -le $max_attempts ]; do
    echo "→ 构建镜像尝试 $attempt/$max_attempts..."
    if docker build -t $IMAGE_NAME .; then
      return 0
    fi
    attempt=$((attempt + 1))
    echo "→ 等待 30 秒后重试..."
    sleep 30
  done
  return 1
}

# 构建并推送镜像
echo "→ 构建镜像 $IMAGE_NAME"
if ! docker_build_with_retry; then
  echo "错误: 构建镜像失败"
  exit 1
fi
docker tag $IMAGE_NAME $DOCKER_REGISTRY/$PROJECT_NAME:latest

# 使用新版本更新服务
echo "→ 部署新版本..."
export TAG=$VERSION
docker compose pull
docker compose up -d --force-recreate

# 清理
echo "→ 清理旧版本..."
docker image prune -f

# 检查服务状态
echo "→ 检查服务状态..."
sleep 10
docker compose ps
docker compose logs --tail=50

echo "✅ 部署完成！版本: $VERSION"