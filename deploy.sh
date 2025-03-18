#!/bin/bash

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# 输出函数
log() {
    local type="$1"
    local message="$2"
    case "$type" in
        "info")
            echo -e "${BLUE}📝 $message${NC}"
            ;;
        "success")
            echo -e "${GREEN}✨ $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
        *)
            echo -e "$message"
            ;;
    esac
}

# 配置
PROJECT_NAME="site"
DOCKER_REGISTRY="zyjared"
GITHUB_REPO="zyjared/site"
BRANCH="main"

# 版本标签
VERSION=$(date +%Y%m%d_%H%M)
IMAGE_NAME="$DOCKER_REGISTRY/$PROJECT_NAME:$VERSION"

# 检查必要命令
command -v docker >/dev/null 2>&1 || { log "error" "错误: 需要 docker"; exit 1; }
command -v git >/dev/null 2>&1 || { log "error" "错误: 需要 git"; exit 1; }

# 创建日志目录
mkdir -p logs

log "info" "开始部署..."

# 拉取最新代码
if [ -d .git ]; then
    log "info" "更新代码..."
    git remote set-url origin https://github.com/$GITHUB_REPO.git || git remote add origin https://github.com/$GITHUB_REPO.git
    git fetch origin $BRANCH
    git reset --hard origin/$BRANCH
else
    log "info" "初始化仓库..."
    git init
    git remote add origin https://github.com/$GITHUB_REPO.git
    git fetch origin $BRANCH
    git reset --hard origin/$BRANCH
fi

function docker_build_with_retry() {
    local max_attempts=2
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        log "info" "构建镜像尝试 $attempt/$max_attempts..."
        if docker build -t $IMAGE_NAME .; then
            return 0
        fi
        attempt=$((attempt + 1))
        log "info" "重试..."
        sleep 3
    done
    return 1
}

# 构建并推送镜像
log "info" "构建镜像 $IMAGE_NAME"
if ! docker_build_with_retry; then
    log "error" "构建镜像失败"
    exit 1
fi
docker tag $IMAGE_NAME $DOCKER_REGISTRY/$PROJECT_NAME:latest

# 使用新版本
echo "→ 部署新版本..."
export TAG=$VERSION

# 停止并移除旧容器
echo "→ 清理旧容器..."
docker compose down

# 启动新容器
docker compose up -d --force-recreate

# 清理
echo "→ 清理旧版本..."
docker images "$DOCKER_REGISTRY/$PROJECT_NAME" --format "{{.ID}}" | tail -n +3 | xargs -r docker rmi
docker image prune -f

# 检查服务状态
echo "→ 检查服务状态..."
sleep 10
docker compose ps
docker compose logs --tail=50

log "success" "部署完成！版本: $VERSION"