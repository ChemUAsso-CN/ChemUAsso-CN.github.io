---
title: "如何参与化联网站：从投稿到编辑"
date: 2025-02-23
description: "化学联合协会网站参与指南，包括文章投稿和环境配置"
categories: ["公告"]
tags: ["auth:Xingyuan55", "公告", "教程", "指南", "开发者"]
author: "Xingyuan55"
draft: false
math: true
---

# 如何协助化联网站

本指南将介绍两种参与化学联合协会网站的方式：

1. 通过投稿表单快速投稿（推荐）
2. 配置环境后直接编辑（进阶）

## 方式一：通过投稿表单参与

这是最简单的参与方式，适合所有用户。您可以选择以下任一方式投稿：

### 1. 通过表单投稿（最简单）

- 点击网站首页中间的绿色按钮["表单投稿"](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAATF_HxZUMTA0NlZJMkgxSVA1SkxBQU0yWVg2V0RWUy4u)
- 在表单中填写您的投稿内容
- 内容会由管理员处理并发布

### 2. 通过 GitHub Issues 投稿（推荐）

如果您有 GitHub 账号，可以使用这种方式：

1. 点击网站首页的["通过 GitHub 投稿"按钮](https://github.com/ChemUAsso-CN/ChemUAsso-CN.github.io/issues/new?labels=article&template=article.md)
2. 按照模板格式填写文章内容
3. 提交后会自动转换为文章并发布

优点：

- 全自动处理，无需等待人工审核
- 可以实时预览 Markdown 格式
- 可以追踪文章处理状态
- 支持更丰富的格式和互动
- 管理员不会累死

注意事项：

- 需要 GitHub 账号
- 请严格按照模板格式填写
- 使用英文标点符号（在 Front Matter 部分）
- 文章会在 1-2 分钟内发布

### 3. 通过微信投稿

如果您有图片等其他格式的化学资料，可以：

1. 添加 Xingyuan55 的微信
2. 直接发送资料给他
3. 由他代为提交

## 方式二：配置环境直接编辑（进阶）

如果您希望更深入地参与网站建设，可以配置环境后直接编辑文章。这可能需要一定的技术基础，但能够获得更好的编辑体验。

## 一、基础环境配置

### 1. Git 安装与配置

1. 下载安装包：

   - 访问 https://git-scm.com/downloads
   - 点击 "Download for Windows"
   - 等待下载完成

2. 安装步骤：

   - 双击运行下载的安装包
   - 点击 "Next" 直到看到 "Adjusting your PATH environment"
   - 选择 "Git from the command line and also from 3rd-party software"
   - 继续点击 "Next"，保持默认选项
   - 最后点击 "Install"

3. 配置个人信息：
   - 打开命令提示符（Win + R，输入 cmd）
   - 设置用户名：
     ```bash
     git config --global user.name "你的名字"
     ```
   - 设置邮箱：
     ```bash
     git config --global user.email "你的邮箱"
     ```

### 2. Hugo 安装与配置

1. 下载 Hugo：

   - 访问 https://github.com/gohugoio/hugo/releases
   - 找到 `hugo_extended_0.129.0_windows-amd64.zip`
   - 点击下载

2. 安装步骤：

   - 创建目录：`C:\Hugo`
   - 解压下载的文件到该目录
   - 确认 `C:\Hugo` 下有 `hugo.exe`

3. 配置环境变量：

   - 按 Win + X，选择"系统"
   - 点击"高级系统设置"
   - 点击"环境变量"
   - 在"系统变量"中找到"Path"
   - 点击"编辑"
   - 点击"新建"
   - 输入 `C:\Hugo`
   - 点击"确定"保存所有对话框

4. 验证安装：
   - 重新打开命令提示符
   - 输入：`hugo version`
   - 如果显示版本信息，说明安装成功

### 3. VS Code 安装与配置

1. 下载安装：

   - 访问 https://code.visualstudio.com/
   - 点击 "Download for Windows"
   - 运行安装包，保持默认选项

2. 安装必要扩展：
   - 打开 VS Code
   - 点击左侧扩展图标（或按 Ctrl+Shift+X）
   - 搜索并安装以下扩展：
     - Chinese (Simplified) - 中文语言包
     - Markdown All in One - Markdown 支持
     - markdownlint - Markdown 语法检查
     - GitHub Pull Requests - Git 集成

## 二、文章编写规范

### 1. 目录结构

网站内容按以下结构组织：

    content/
    ├── posts/           # 所有文章
    │   ├── announcement/# 公告类文章，分类名：公告
    │   └── product/     # 产物制作类文章，分类名：产物制作
    │   └── theory/      # 理论知识类文章，分类名：理论知识
    │   └── experiment/  # 实验技术类文章，分类名：实验技术
    │   └── uncategorized/ # 其他类文章，分类名：其他   （注意不要打错字）
    │                    注：这里的一个子文件夹就是一个分类，如需更多分类请您提交Issues或联系管理者
    ├── about.md         # 关于页面
    └── contact.md       # 联系方式页面

> issue-to-post.yml 中的分类映射：
>
> ```js
> const categoryMap = {
>   公告: "announcement",
>   产物制作: "product",
>   理论知识: "theory",
>   协会讨论: "discussion",
>   其他: "uncategorized",
> };
> ```

只有`content/`文件夹下的文件是网站内容，其他文件夹都是网站的配置文件。

您只需要在`content/posts/`文件夹的各个子文件夹内，按照格式创建文件并创作即可。

`static/`文件夹下是网站的静态资源，当您需要插入图片时候会涉及这里，您需要将图片放在`static/img/`文件夹下。图片名字应该是有意义的英文名称。

### 2. 文章格式

所有文章都需要包含以下部分：

1. 文件头（Front Matter）：

   ```yaml
   ---
   title: "文章标题"
   date: 2025-02-23
   description: "简短描述"
   categories: ["分类"] # 主分类，即相应文件夹名称的中文
   tags: ["auth:作者", "标签1", "标签2"] # 更细致的标签
   author: "作者名"
   draft: false # true 表示草稿，一般false即可
   ---
   ```

2. 分类说明：

   - `announcement`: 公告类文章，分类名：公告
   - `product`: 产物制作类文章，分类名：产物制作
   - `theory`: 理论知识类文章，分类名：理论知识
   - `experiment`: 实验技术类文章，分类名：实验技术
   - `uncategorized`: 其他类文章，分类名：其他
   - 如需更多分类请您提交 Issues 或联系管理者

3. 标签说明：
   - 必须包含 `auth:作者名` 标签（注意没有空格）
   - 标签之间使用逗号分隔，每个标签被英文引号`"`包裹
   - 其它标签您可以报备后根据文章内容自行创建，请注意：
      - 已存在的标签应优先选择
      - 使用有意义的关键词
      - 避免过于宽泛的标签
   - 由于技术原因，标签内请不要添加任何空格

### 3. 文章模板示例

根据不同类型的文章，我们有不同的模板：

1. 产物制作类文章：

   ```markdown
   ---
   title: "产物制作：化合物名称"
   date: 2025-02-23
   description: "化合物的简短描述，包括外观、性质等"
   categories: ["product"]
   tags: ["auth: 作者名", "无机合成", "具体类别"]
   author: "作者名"
   draft: false
   ---

   ### 反应方程式

   $\mathrm{ X + 4Y_5 \space \xlongequal [\Delta] {阿巴阿巴催化剂} \space Z_4 \uparrow + CCF_2 \downarrow }$

   ### 实验步骤

   1. 步骤一
   2. 步骤二

   ### 注意事项

   - 安全提示
   - 关键控制点
   ```

2. 理论知识类文章：

   ```markdown
   ---
   title: "理论知识：主题名称"
   date: 2025-02-23
   description: "知识点简述"
   categories: ["理论知识"]
   tags: ["auth: 作者名", "具体领域", "关键概念"]
   author: "作者名"
   draft: false
   ---

   ### 基本概念

   概念解释

   ### 详细说明

   具体内容

   ### 应用示例

   实际案例
   ```

3. 实验技术类文章：

   ```markdown
   ---
   title: "实验技术：操作名称"
   date: 2025-02-23
   description: "技术要点简述"
   categories: ["experiment"]
   tags: ["auth: 作者名", "实验技术", "具体操作"]
   author: "作者名"
   draft: false
   ---

   ### 原理说明

   基本原理

   ### 操作步骤

   1. 步骤一
   2. 步骤二

   ### 注意事项

   安全提示
   ```

以上只是示例，并没有涵盖所有分类。您模仿示例自行编写即可。

## 三、特殊语法说明

### 1. 数学公式

1. 行内公式：

   - 语法：`$公式$`
   - 示例：$1+1=2$

2. 独立公式：

   - 语法：`$$公式$$`
   - 示例：
     $$
     a^2+b^2=c^2
     $$

3. 化学方程式：

   请参见这篇文章：[Latex / Katex 编辑基础化学方程式 - CSDN](https://blog.csdn.net/m0_69702929/article/details/128348095)

### 2. 图片插入

所有图片应该放在`static/img/`文件夹下，然后您只需要在文章中像下面这样插入图片即可。图片名字应该是有意义的英文名称。

1. 基本语法：

   ```markdown
   ![图片描述](/img/文件名.jpg)
   ```

2. 带链接的图片：

   ```markdown
   [![图片描述](/img/文件名.jpg)](链接地址)
   ```

3. 图片尺寸控制：
   ```markdown
   ![图片描述](/img/文件名.jpg){width=300px}
   ```

## 四、工作流程

### 1. 创建新文章

1. 选择合适的目录：

   ```bash
   content/posts/
   ├── announcement/ # 公告类
   ├── product/      # 产物制作
   ├── theory/       # 理论知识
   ├── experiment/   # 实验技术
   └── uncategorized/ # 其他
   ```

2. 创建文件：
   - 使用有意义的英文名称
   - 使用 `.md` 后缀
   - 复制相应的模板内容

### 2. 本地预览

1. 启动 Hugo 服务器：

   ```bash
   cd 项目目录
   hugo server -D
   ```

2. 预览文章：
   - 访问 http://localhost:1313
   - 实时查看修改效果

### 3. 提交更改

1. 保存文件

2. 更新网站：

   - 提交到 Git 并推送：

     ```bash
     git add .
     git commit -m "添加新文章：xxx"  （自己写就行）
     git push    （推送，就是上传的意思）
     ```

     但是您需要向 Xingyuan55 申请项目协作者权限，才能使用`git push`进行推送。

   - 或者，您可以将修改好的.md 文件发送给 Xingyuan55，并注明文件夹，由他代为提交。（推荐这样做）

## 五、常见问题

> [!Tips]
> 请善用搜索引擎，您可以搜索到很多相关问题。

> [!Tips]
> 您可以从以下链接（不限于）学习相关知识
>
> - [HTML 教程 - W3School](https://www.w3school.com.cn/html/index.asp)
> - [HTML 教程 - 菜鸟教程](https://www.runoob.com/html/html-tutorial.html)
>
> - [Git 教程 - 菜鸟教程](https://www.runoob.com/git/git-tutorial.html)
>
> - [Markdown 教程 - 菜鸟教程](https://www.runoob.com/markdown/md-tutorial.html)
>
> - [Markdown 教程 - W3School](https://www.w3school.com.cn/markdown/index.asp)
>
> - [Hugo 教程 - 菜鸟教程](https://www.runoob.com/hugo/hugo-tutorial.html)
>
> - [VS Code 教程 - 菜鸟教程](https://www.runoob.com/vscode/vscode-tutorial.html)
>
> **世界上不只有菜鸟教程一个教程网站，您可以自己搜索到更多相关知识与解决方案。**

### 1. 环境相关

1. Git 配置问题：

   - 检查用户名和邮箱配置
   - 确认 GitHub 访问权限

2. Hugo 启动问题：
   - 确认环境变量设置
   - 检查主题文件是否完整

### 2. 编辑相关

1. 图片不显示：

   - 检查文件路径
   - 确认图片已上传

2. 公式渲染错误：
   - 检查公式语法
   - 确认是否启用了数学支持

### 3. 部署相关

1. 提交失败：

   - 先拉取最新更改
   - 解决冲突后重试

2. 部署失败：
   - 检查 GitHub Actions 日志
   - 确认文件格式正确

## 结语

本指南涵盖了参与化学联合协会网站编辑的主要内容。如果遇到问题：

1. 先查看本指南相关章节
2. 在评论区提问
3. 通过化联群联系管理员

记住：

- 保持文章格式规范
- 注意科学内容准确性
- 遵守安全信息发布规范

> [!Warning]
> 请您在编辑时，注意遵守中华人民共和国相关法律法规，以及社会主义核心价值观。

祝你编辑愉快！
