# ssh

## 本地密钥

```bash
ssh-keygen -t ed25519 -f <路径> -C "注释"
```

## 服务器配置

```bash
cat <路径.pub> | ssh <用户名>@<ip> "cat >> .ssh/authorized_keys"
```

如果 `authorized_keys` 不存在，确保目录和权限：

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
vim ~/.ssh/authorized_keys
```

## 本地配置

```bash
Host 自定义名
  HostName <ip>
  User <用户名>
  IdentityFile <路径>
```
