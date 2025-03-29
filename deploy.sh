#!/bin/bash

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# 配置
PROJECT_NAME="site"
DOCKER_REGISTRY="zyjared"
GITHUB_REPO="zyjared/site"
BRANCH="main"

# 版本标签
VERSION=$(date +%Y%m%d_%H%M)
IMAGE_NAME="$DOCKER_REGISTRY/$PROJECT_NAME:$VERSION"

log() {
    local type="$1"
    local message="$2"
    case "$type" in
        "info")
            echo -e "\n${BLUE}[i]  $message${NC}\n"
            ;;
        "success")
            echo -e "\n${GREEN}✓ $message${NC}\n"
            ;;
        "error")
            echo -e "\n${RED}✗ $message${NC}\n"
            ;;
        *)
            echo -e "\n$message\n"
            ;;
    esac
}

handle_error() {
    log "error" "发生错误: $1"
    exit 1
}

trap 'handle_error $LINENO' ERR

check_deps() {
    local deps=("docker" "git")
    for dep in "${deps[@]}"; do
        if ! command -v $dep >/dev/null 2>&1; then
            log "error" "缺少必要依赖: $dep"
            exit 1
        fi
    done
}

update_code() {
    if [ -d .git ]; then
        git remote set-url origin https://github.com/$GITHUB_REPO.git || git remote add origin https://github.com/$GITHUB_REPO.git
        git fetch origin $BRANCH
        git reset --hard origin/$BRANCH
        log "success" "已拉取最新代码"
    else
        git init
        git remote add origin https://github.com/$GITHUB_REPO.git
        git fetch origin $BRANCH
        git reset --hard origin/$BRANCH
        log "success" "已初始化代码仓库"
    fi
}

build_image() {
    local max_attempts=2
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        log "info" "构建镜像 $attempt/$max_attempts..."
        if docker build -t $IMAGE_NAME .; then
            docker tag $IMAGE_NAME $DOCKER_REGISTRY/$PROJECT_NAME:latest
            return 0
        fi
        attempt=$((attempt + 1))
        log "info" "重试..."
        sleep 3
    done
    return 1
}

deploy_service() {
    log "info" "将部署新版本 $VERSION"
    export TAG=$VERSION

    docker compose down
    log "success" "已停止旧容器"
    
    docker compose up -d --force-recreate
    log "success" "已启动新容器"
}

cleanup() {
    docker images "$DOCKER_REGISTRY/$PROJECT_NAME" --format "{{.ID}}" | tail -n +3 | xargs -r docker rmi
    docker image prune -f
    log "success" "已清理旧版本"
}

check_service() {
    sleep 10
    if docker compose ps --format "{{.State}}" | grep -q "Up"; then
        log "success" "服务已成功启动"
    else
        local container_logs=$(docker compose logs --tail=50)
        log "error" "服务启动异常，最近的日志："
        echo "$container_logs"
        exit 1
    fi
}

main() {
    log "info" "开始部署"
    check_deps
    update_code
    build_image || handle_error "镜像构建失败"
    deploy_service || handle_error "服务部署失败"
    cleanup
    check_service || handle_error "服务检查失败"
    log "success" "部署完成 [版本: $VERSION]"
}

main