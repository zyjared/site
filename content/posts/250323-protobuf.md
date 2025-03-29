---
title: protobuf 爬虫记录
date: 2025-03-23
---

# protobuf 爬虫记录

这两天做爬虫，解析 protobuf 数据，因为是“爬”，所以需要反推，记录一下。~~因为实在不知道写什么~~

本篇内容场景：爬取某网站数据，得到的是 protobuf 文件，需要解析，并重现完整的请求流程。

## 认识 protobuf

我一直觉得有文档就看文档会好有些：[Protocol Buffers Documentation](https://protobuf.dev/)。

看完后，需要知道以下内容:

- 是什么：一种对数据进行序列化的机制。
- 为什么：` smaller, faster, and simpler`
- 如何做：[工作流程](https://protobuf.dev/overview/#work)

多看几遍关于工作流程内容，我觉得关键点在字段的定义，以及[.proto 文件会生成了什么](https://protobuf.dev/programming-guides/editions/#generated)

之后，就可以使用 ai 了 ~\_~

## 逆向

~~我对逆向认识也不够，只是感觉这标题高大上~~

如果没有数据定义，只能拿到 `ArrayBuffer`，应该如何做。

- 直接复制响应
- `protoc` 解码
- 查看结果

关键命令 `protoc --help`，我觉得这是最好的方法。

应该可以看到类似

```txt
1: ...
2: ...
3: {
    1: ...
}
```

我自己在做的时候，会编写几个辅助工具，比如下面这个。
这个脚本可以读取文件夹下的文本，逐个解码到另一个文件夹下。

```bash
pnpm add colorette commander
```

```ts
import { Buffer } from 'node:buffer'
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { blue, bold, green, red, underline } from 'colorette'
import { program } from 'commander'

const resolve = (p: string) => path.resolve(process.cwd(), p)

program
  .option('-i, --input <dir>', '输入目录', resolve('./data'))
  .option('-o, --output <dir>', '输出目录', resolve('./.result'))
  .option('-c, --clean', '清空输出目录', true)
  .parse(process.argv)

const options = program.opts()
processDirectory(options.input, options.output, options.clean)

function checkProtoc() {
  try {
    execSync('protoc --version ', { stdio: 'ignore' })
  }
  catch {
    console.error(bold(red('错误：未找到 protoc 命令')))
    console.error('', '请先安装 Protocol Buffers')
    console.error('', underline('https://github.com/protocolbuffers/protobuf/releases'))
    process.exit(1)
  }
}

function parseProtobufResponse(inputFile: string): string {
  const response = fs.readFileSync(inputFile, 'utf-8')
  const base64Start = response.indexOf('base64,')
  if (base64Start === -1)
    throw new Error(`找不到 base64 数据: ${inputFile}`)

  const base64Data = response.slice(base64Start + 7)
  const binaryData = Buffer.from(base64Data, 'base64')

  const result = execSync('protoc --decode_raw', {
    input: binaryData,
  })

  return result.toString()
}

/**
 * 解析目录下的所有 protobuf 响应。
 *
 * 在存储的时候，我是直接复制响应粘进去的，
 * 读取完其内容再做 base64 解码，然后再交给 protoc 解析。
 *
 * @param inputDir 数据目录
 * @param outputDir 输出目录
 * @param force 如果输出目录已存在，是否强制覆盖
 */
function processDirectory(inputDir: string, outputDir: string, clean = false) {
  console.log(bold(blue('解析 protobuf 数据')))
  console.log('', blue('输入目录:'), inputDir)
  console.log('', blue('输出目录:'), outputDir)
  console.log('', blue('清空目录:'), clean ? bold(green('是')) : bold(red('否')))
  console.log()

  checkProtoc()

  if (fs.existsSync(outputDir)) {
    if (!clean) {
      console.error('输出目录已存在。如果要清空目录，请添加 --clean 参数')
      process.exit(1)
    }
    fs.rmSync(outputDir, { recursive: true })
  }

  fs.mkdirSync(outputDir, { recursive: true })

  const files = fs.readdirSync(inputDir)

  for (const file of files) {
    const inputPath = path.join(inputDir, file)
    // .txt 是为了方便查看
    const outputPath = path.join(outputDir, `${path.parse(file).name}_Result.txt`)

    try {
      const result = parseProtobufResponse(inputPath)
      fs.writeFileSync(outputPath, result)
      console.log(`${bold(green('✓'))} ${file} \t${bold(blue('->'))} ${underline(path.basename(outputPath))}`)
    }
    catch (error) {
      console.error(`${bold(red('✗'))} ${file}`, error)
    }
  }
}
```

## 确定字段

如果[认识了 protobuf](#认识 protobuf)，应该能理解其字段名其实也并没有那么重要，你甚至可以为其取名为 `a`、`b`、`c` 等等，重要的是确定其类型、在网站的代码文件中，哪些值是被如何的（比如把其中一个值传给了一个函数，找出这个值是谁）。

## 技巧

- ai
- 搜索
- 抓包
- 断点
- `ctrl + f`
- 看调用栈
- ~~眼睛疼的时候，代码复制到编辑器，然后脑袋疼...~~

## 编写脚本

如果要尝试编写 `.proto` 文件，也就是复原，在数据量比较多的时候，可以找找规律，用脚本来提取。

1. 找到有映射关系的 `.js` 文件；
2. 尝试手动还原几个
3. 找到规律
4. 写代码
   1. 确定 message：识别函数与作用域（嵌套的是过滤还是追加）
   2. 确定字段：作用域 + 正则
   3. 保存文本

这种文件太规律了，只需要细心和时间就好。

## 总结

踩过坑，下次再踩一次就好了，反正后面还会踩，不要对自己有太高要求。

困了，睡觉 ~\_~
