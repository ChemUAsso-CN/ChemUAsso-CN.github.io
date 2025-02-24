---
name: 文章投稿
about: 使用此模板提交新文章
title: "[文章] 在此输入标题"
labels: article
---

<!--
请按照以下格式填写文章内容。
请不要修改 "---" 标记和字段名称。
只需修改引号内的内容和正文部分。
-->

---

title: "文章标题"
date: {{ now.Format "2006-01-02" }}
description: "描述"
categories: ["announcement"] # 分类：announcement(公告), product(产物制作), theory(理论), experiment(实验)
tags: ["auth: 你的名字", "标签 1", "标签 2"] # 至少包含 auth 标签
author: "你的名字"
draft: false

---

在此处写入文章正文...

<!--
支持 Markdown 格式：
- 使用 # 表示标题
- 使用 ** ** 表示粗体
- 使用 * * 表示斜体
- 使用 ``` ``` 表示代码块
- 使用 $ $ 表示公式
- 更多格式请参考：https://www.markdownguide.org/basic-syntax/
-->
