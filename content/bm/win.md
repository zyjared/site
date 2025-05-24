# Windows

## WinGet

- [WinGet](https://learn.microsoft.com/zh-cn/windows/package-manager/winget/)

应该默认安装了。

## Scoop

- [Scoop](https://scoop.sh/)

命令行安装工具，如果以下特点是需要的就可以安装：

- 无权限弹窗
- 隐藏安装向导
- 避免安装大量软件带来的环境变量污染
- 方便卸载
- 自动查找和安装依赖

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

## VSCode

- [VSCode](https://code.visualstudio.com/)
- [Download](https://code.visualstudio.com/Download)

## Git

- [Git](https://git-scm.com)
- [Download](https://git-scm.com/downloads/win)

## nvm-windows

- [nvm-windows](https://github.com/coreybutler/nvm-windows)

node.js 版本管理工具。

- [Releases](https://github.com/coreybutler/nvm-windows/releases)

## PowerShell

- [PowerShell](https://github.com/PowerShell/PowerShell)

文档注意时效，选择最新的文档。

- [优化 shell 体验](https://learn.microsoft.com/zh-cn/powershell/scripting/learn/shell/optimize-shell?view=powershell-7.6)

### 创建 profile

确保 `$PROFILE` 变量存在，如果不存在则创建。

```bash
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
```

### 配置 profile

```bash
code $PROFILE
```

```psl
# Set-PSReadLineKeyHandler -Chord "Tab" -Function ForwardChar
Set-PSReadLineKeyHandler -Chord "Ctrl+l" -Function ForwardWord
Set-PSReadLineKeyHandler -Chord "Ctrl+j" -Function NextSuggestion
Set-PSReadLineKeyHandler -Chord "Ctrl+k" -Function PreviousSuggestion

Invoke-Expression (&starship init powershell)
Import-Module PSReadLine
Set-PSReadLineKeyHandler -Chord Tab -Function MenuComplete

Set-Alias -Name ls -Value lsd
Set-Alias -Name touch -Value New-Item
```

## PSReadLine

- [PSReadLine](https://github.com/PowerShell/PSReadLine)

```bash
# Prerelease
Install-Module PSReadLine -Repository PSGallery -Scope CurrentUser -AllowPrerelease -Force

# 稳定版本
# Install-Module PSReadLine -Repository PSGallery -Scope CurrentUser -Force
```

```bash
# 如果使用 Emacs 键
# Set-PSReadLineOption -EditMode Emacs

# 查看快捷键：
Get-PSReadLineKeyHandler
```

## vim

- [vim](https://www.vim.org/download.php)

配置文件 `vim ~/.vimrc`

```
" ========== 初始化设置 ==========
set nocompatible              " 禁用兼容模式，启用 Vim 完整功能
filetype off                  " 临时关闭文件类型检测（Vundle 需要）

" ========== Vundle 插件管理 ==========
set rtp+=~/.vim/bundle/Vundle.vim  " 添加 Vundle 到运行时路径
call vundle#begin()           " 初始化 Vundle

" 必须安装 Vundle 自身
Plugin 'VundleVim/Vundle.vim'

" 添加其他插件
Plugin 'preservim/nerdtree'   " 文件浏览器
Plugin 'ryanoasis/vim-devicons' " 文件图标支持

call vundle#end()            " 结束 Vundle 初始化
filetype plugin indent on     " 重新启用文件类型检测和插件
syntax enable                 " 启用语法高亮

" ========== 显示设置 ==========
set number                    " 显示行号
set showcmd                   " 显示正在输入的命令
set laststatus=2              " 总是显示状态栏
set ruler                     " 显示光标位置信息

" ========== 缩进设置 ==========
set autoindent                " 自动缩进
set smartindent               " 智能缩进
set expandtab                 " 将制表符转换为空格
set tabstop=4                 " 制表符等于4个空格
set shiftwidth=4              " 自动缩进使用的空格数
set softtabstop=4             " 退格键一次删除4个空格

" ========== 搜索设置 ==========
set incsearch                 " 增量搜索
set hlsearch                  " 高亮搜索结果
set ignorecase                " 搜索时忽略大小写
set smartcase                 " 如果有大写字母则区分大小写

" ========== 其他实用设置 ==========
set backspace=indent,eol,start " 允许退格键删除缩进、换行等
set wildmenu                  " 命令行自动补全
set encoding=utf-8            " 使用 UTF-8 编码
set fileencoding=utf-8        " 文件编码
set nobackup                  " 不创建备份文件
set nowritebackup             " 不创建写入备份
set noswapfile                " 不创建交换文件

" ========== 颜色方案 ==========
try
    colorscheme desert        " 使用 desert 颜色方案
catch
endtry

" ========== Windows 风格快捷键 ==========
" 复制 (Ctrl+C)
vnoremap <C-c> "+y
nnoremap <C-c> "+yy

" 粘贴 (Ctrl+V)
inoremap <C-v> <Esc>"+gpa
nnoremap <C-v> "+gp
vnoremap <C-v> d"+gp

" 剪切 (Ctrl+X)
vnoremap <C-x> "+d
nnoremap <C-x> "+dd

" 撤销 (Ctrl+Z)
nnoremap <C-z> u
inoremap <C-z> <C-o>u

" 重做 (Ctrl+Y)
nnoremap <C-y> <C-r>
inoremap <C-y> <C-o><C-r>

" 全选 (Ctrl+A)
nnoremap <C-a> ggVG
inoremap <C-a> <C-o>gg<C-o>VG

" 保存 (Ctrl+S)
nnoremap <C-s> :w<CR>
inoremap <C-s> <C-o>:w<CR>

" 查找 (Ctrl+F)
nnoremap <C-f> /
inoremap <C-f> <C-o>/

" 替换 (Ctrl+H)
nnoremap <C-h> :%s/
inoremap <C-h> <C-o>:%s/

" ========== 文件类型特定设置 ==========
autocmd FileType javascript,typescript,html,css setlocal ts=2 sts=2 sw=2    " JS/HTML/CSS 使用2空格
autocmd FileType yaml setlocal ts=2 sts=2 sw=2                              " YAML 文件使用2空格缩进

" ========== 插件配置 ==========
" NERDTree 配置
nnoremap <leader>n :NERDTreeToggle<CR>  " 设置快捷键切换文件浏览器

" 基础自动补全
inoremap ( ()<Left>
inoremap [ []<Left>
inoremap { {}<Left>
inoremap ' ''<Left>
inoremap " ""<Left>
inoremap ` ``<Left>

" 智能跳过已闭合符号
inoremap <expr> ) strpart(getline('.'), col('.')-1, 1) == ")" ? "\<Right>" : ")"
inoremap <expr> ] strpart(getline('.'), col('.')-1, 1) == "]" ? "\<Right>" : "]"
inoremap <expr> } strpart(getline('.'), col('.')-1, 1) == "}" ? "\<Right>" : "}"
inoremap <expr> ' strpart(getline('.'), col('.')-1, 1) == "'" ? "\<Right>" : "'"
inoremap <expr> " strpart(getline('.'), col('.')-1, 1) == "\"" ? "\<Right>" : "\""
inoremap <expr> ` strpart(getline('.'), col('.')-1, 1) == "`" ? "\<Right>" : "`"
```

## curl

- [curl](https://curl.se/)

```bash
scoop install main/curl
```

## Starship

- [starship](https://starship.rs/zh-CN/)

轻量、迅速、客制化的高颜值终端！

```bash
scoop install starship

Invoke-Expression (&starship init powershell)
```

## lsd

- [lsd](https://github.com/lsd-rs/lsd)

同 `ls` 命令，但是做了更多的美化。

```bash
scoop install lsd
```

```bash
code $PROFILE
```

```psl
Set-Alias -Name ls -Value lsd
```

## gsudo

- [gsudo](https://github.com/gerardog/gsudo)

```bash
scoop install gsudo
```

## AutoHotKey

- [AutoHotKey](https://www.autohotkey.com/)

`win + R` 输入 `shell:startup` 打开启动文件夹，创建一个 `.ahk` 文件。

```ahk
#Requires AutoHotkey v2.0

; win + T 终端
#t::{
    if WinExist("ahk_exe WindowsTerminal.exe")
        WinActivate
    else
        Run "wt"
}

; win + c 代码编辑器
#c::{
    if WinExist("ahk_exe Code.exe")
        WinActivate
    else
        Run "code"
}

; win + b 浏览器 (Edge)
#b::{
    if WinExist("ahk_exe msedge.exe")
        WinActivate
    else
        Run "msedge"
}
```

## Snipaste

- [Snipaste](https://zh.snipaste.com/)
