---
title: "化学工具开发指南"
date: 2025-03-07
description: "详细指导开发者如何在Hugo网站中添加新的化学工具"
tags: ["auth:Xingyuan55", "公告", "教程", "指南", "开发者"]
categories: ["公告"]
---


本指南将帮助你了解如何在本站的 Hugo 框架中开发和添加新的化学工具。即使你不熟悉 Hugo，按照以下步骤也能轻松添加自己的工具。

## 目录

1. [基础知识](#基础知识)
2. [工具开发流程](#工具开发流程)
3. [设计工具 html 页面实现](#设计工具-html-页面实现)
4. [添加内容文件](#添加内容文件)
5. [创建工具模板](#创建工具模板)
6. [测试与部署](#测试与部署)
7. [常见问题](#常见问题)
8. [完整示例](#示例完整的工具开发过程)
9. [结语](#结语)

## 基础知识

### 关键概念

- **内容文件**：Markdown 文件，存放在`content`目录中
- **布局模板**：HTML 模板文件，存放在`layouts`目录中
- **前置元数据**：Markdown 文件顶部的 YAML/TOML/JSON 格式配置，例如本篇的就是：
  ```yaml
  ---
  title: "化学工具开发指南"
  date: 2025-03-07
  description: "详细指导开发者如何在Hugo网站中添加新的化学工具"
  tags: ["auth:Xingyuan55", "公告", "教程", "指南", "开发者"]
  categories: ["公告"]
  ---
  ```
- **静态资源**：CSS、JavaScript 等文件，存放在`static`或`assets`目录中

### 工具开发流程

添加新工具的基本流程如下：

1. 设计工具 html 页面实现
2. 添加工具内容文件
3. 创建布局模板文件并将 html 转换为 Hugo 模板格式
4. 测试和部署

## 设计工具 html 页面实现

按照你自己的想法，先写出来 html 页面，只需要写出`<body>`内的内容和`<script>`代码即可。

## 添加内容文件

在`content/tools/`目录下创建一个新的 Markdown 文件，例如`my_new_tool.md`：

```yaml
---
title: "我的新工具"
layout: "my_new_tool"
date: 2025-03-07
---
```

这里的关键是：

- `title`: 工具的显示名称
- `layout`: 必须与你创建的布局模板文件名相同
- `date`: 创建日期，格式必须如此 YYYY-MM-DD

## 创建工具模板

在`layouts/_default/`目录下创建一个新的 HTML 文件，命名为你的工具名称，例如`my_new_tool.html`。

### 从普通 HTML 到 Hugo 模板

如果你已经熟悉 HTML，将普通 HTML 转换为 Hugo 模板只需要几个简单步骤：

- **添加模板文件头**:

  - 开头不使用`<html>`和`<head>`，而是使用如下格式（请阅读注释）:

    ```html
    {{ define "main" }}
    <!-- 定义此HTML块为主内容块，Hugo将把它插入到主题的基础模板中 -->

    {{ $style := resources.Get "css/common_html.css" | resources.Minify |
    resources.Fingerprint }}
    <!-- 获取CSS文件，保存到变量$style中 -->
    <link rel="stylesheet" href="{{ $style.Permalink }}" />
    <!-- 将处理后的CSS文件链接到页面，使用其永久链接 -->

    <article class="article single">
      <!-- 主文章容器开始，'single'类表示这是单页内容 -->

      <header class="article-header">
        <!-- 文章标题区域 -->
        <div class="article-details">
          <h1 class="article-title">{{ .Title }}</h1>
          <!-- 显示页面标题，.Title值来自内容文件(同名.md)的front matter -->
        </div>
      </header>

      <section class="article-content">
        <!-- 文章主体内容区域开始，实际工具内容将放在这里。-->
        <!-- 以下是正文，即<body>中的内容，记得使用变量，不要加<h1>标题 -->
      </section>
    </article>
    ```

    注意：

    - 使用 Hugo 变量：用 `{{ .Title }}` 等变量替换页面标题等静态内容
    - 使用 Hugo 资源管理：使用 `resources.Get` 等函数引入 CSS/JS 文件

- **正文部分使用式类**：

  正文部分就是原来`<body>`中的内容（但不含`<script>`的脚本）。每个内容块用 `<div class="..."> </div>`包裹，每个类所显示的样式不同。

  支持的类见[下文#添加样式](#添加样式)

- **添加 Js 脚本**

  将脚本部分放在文章最后，即`</article>`以后，并在文件最后添加 `{{ end }}`

如果您还是不能理解，以下是一个普通 HTML 页面转换为 Hugo 模板的对比：

**普通 HTML 页面**：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>我的化学工具</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>溶液浓度计算器</h1>
    <div class="content">
      <!-- 工具内容 -->
    </div>
    <script src="script.js">
      // js脚本代码
    </script>
  </body>
</html>
```

**转换为 Hugo 模板**：

```html
{{ define "main" }} {{ $style := resources.Get "css/common_html.css" |
resources.Minify | resources.Fingerprint }}
<link rel="stylesheet" href="{{ $style.Permalink }}" />

<article class="article single">
  <header class="article-header">
    <div class="article-details">
      <h1 class="article-title">{{ .Title }}</h1>
    </div>
  </header>

  <section class="article-content">
    <div class="card">
      <!-- card类可以替换成别的类 -->
      <!-- 原有的工具内容 -->
    </div>
  </section>
</article>

<script>
  // 原有的js脚本代码
</script>
{{ end }}
```

这是又一个完整的 Hugo 模板文件例子：

```html
{{ define "main" }}
<!-- 这行可以理解为Hugo布局模板文件的文件头 -->

{{ $style := resources.Get "css/common_html.css" | resources.Minify |
resources.Fingerprint }}
<link rel="stylesheet" href="{{ $style.Permalink }}" />

<article class="article single">
  <header class="article-header">
    <div class="article-details">
      <h1 class="article-title">{{ .Title }}</h1>
    </div>
  </header>

  <section class="article-content">
    <div class="card">
      <div id="tool-content">
        <!-- 工具的输入表单 -->
        <form id="toolForm">
          <label for="input1">输入参数1:</label>
          <input type="text" id="input1" required />

          <button type="button" onclick="calculateResult()">计算</button>
        </form>
        <div class="result" id="result"></div>
      </div>
    </div>
  </section>
</article>

<!-- JavaScript代码 -->
<script>
  function calculateResult() {
    // 在这里实现工具的功能逻辑
    const input = document.getElementById("input1").value;
    const result = document.getElementById("result");

    // 示例计算
    result.textContent = `计算结果: ${input}`;
  }
</script>
{{ end }}
```

### 添加样式

使用公共样式

网站已有一个公共 CSS 文件用于所有工具，位于`assets/css/common_html.css`。模板文件顶部这些行就是引入它：

```html
{{ define "main" }} {{ $style := resources.Get "css/common_html.css" |
resources.Minify | resources.Fingerprint }}
<link rel="stylesheet" href="{{ $style.Permalink }}" />

<!-- 工具内容 -->
{{ end }}
```

**common_html.css 支持的样式类**

我们的 `common_html.css` 文件提供了一组预定义的 CSS 类，你可以直接在工具中使用：

以`.`开头的类用于`<div class=...>`中，使用时将`.`去掉，如`<div class="card">`

不以`.`开头的类是对应标签的样式，如`<input type="text" ...>`

1. 布局类

   - `.card` - 创建一个最基础的带阴影和圆角的卡片容器
   - `.tips` - 提示信息容器（浅绿色背景），适合放置使用说明
   - `.examples` - 示例容器，使用网格布局，用于展示多个可点击的示例
   - `.example-item` - 单个示例项目，通常与 click 事件配合使用

2. 表单类

   - `.input-group` - 表单输入组，用于将相关的输入字段组合在一起
   - `form` - 表单元素默认样式（垂直布局），自动处理间距和排列
   - `label` - 标签样式，明确标识每个输入字段的用途
   - `input[type="text"]`, `input[type="number"]` - 输入框样式，有合适的内边距和边框
   - `button` - 按钮样式，有醒目的颜色和悬停效果

3. 结果显示类

   - `.result` - 计算结果的容器，用于显示简单的计算结果
   - `.output` - 输出内容的容器（类似结果，但用于更复杂的输出），适合多行输出
   - `.error` - 错误信息样式（红色文本），用于显示验证失败或计算错误

4. Hugo 文章模板相关类

   - `.article-content` - 文章主体内容区域
   - `.article-header` - 文章标题区域
   - `.article-title` - 文章标题样式

所有元素都有响应式设计，适应不同屏幕大小，您可以自行在本地尝试各个样式类。

**样式使用示例**

```html
<div class="card">
  <div class="input-group">
    <label for="input1">输入:</label>
    <input type="text" id="input1" placeholder="请输入..." />
  </div>

  <button onclick="calculate()">计算</button>

  <div class="result" id="result"></div>

  <div class="tips">
    <h3>使用提示</h3>
    <p>这里是一些使用说明...</p>
  </div>
</div>
<div class="examples">
  <div class="example-item" onclick="setExample('示例1')">示例1</div>
  <div class="example-item" onclick="setExample('示例2')">示例2</div>
</div>
```

### 添加 JavaScript 功能

在模板底部添加`<script>`标签实现工具的功能：

```html
<script>
  function myFunction() {
    // 获取输入值
    const input = document.getElementById("inputId").value;

    // 进行计算
    const result = performCalculation(input);

    // 显示结果
    document.getElementById("result").textContent = result;
  }

  function performCalculation(input) {
    // 实现你的计算逻辑
    return `计算结果: ${input}`;
  }
</script>
```

**验证与错误处理**

务必添加输入验证和错误处理，可以参照如下示例：

```javascript
function validate() {
  const input = parseFloat(document.getElementById("input").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(input) || input <= 0) {
    resultDiv.textContent = "请输入有效的正数！";
    resultDiv.classList.add("error");
    return false;
  }

  resultDiv.classList.remove("error");
  return true;
}

// 在计算函数中使用验证
function calculate() {
  if (validate()) {
    // 只有验证通过才执行计算
    ...
  }
}
```

### Hugo 模板高级语法

如果你有更高级的编写需求，可以参照以下语法

如果您只是将 html 转为 Hugo 模板，那么您需要了解的我已经写在上文 添加模板文件头 部分了

1. **变量**：使用 `{{ }}` 包裹变量和函数

   - `{{ .Title }}` - 页面标题（来自 Markdown 前置元数据）
   - `{{ .Content }}` - Markdown 内容
   - `{{ .Permalink }}` - 页面的完整 URL

2. **资源引用**：使用资源管理器

   ```html
   {{ $style := resources.Get "css/common_html.css" | resources.Minify |
   resources.Fingerprint }}
   <link rel="stylesheet" href="{{ $style.Permalink }}" />
   ```

3. **条件语句**：

   ```html
   {{ if .Description }}
   <p>{{ .Description }}</p>
   {{ else }}
   <p>没有描述</p>
   {{ end }}
   ```

4. **循环**：

   ```html
   {{ range .Site.RegularPages }}
   <a href="{{ .Permalink }}">{{ .Title }}</a>
   {{ end }}
   ```

5. **注释**：
   ```html
   {{/* 这是Hugo模板中的注释 */}}
   ```

## 测试与部署

### 本地测试

1. 在终端中运行`hugo server`启动本地服务器
2. 访问`http://localhost:1313/tools/my_new_tool/`测试你的工具
3. 检查各种输入条件下工具的表现
4. 测试移动设备上的显示效果

### 部署

当你确认工具正常工作后：

1. 提交你的变更到 Git 仓库
2. Hugo 网站将自动构建和部署

## 常见问题

### 工具不显示在列表中

1. 检查 Markdown 文件是否位于`content/tools/`目录下
2. 确保前置元数据格式正确
3. 检查`layout`值是否与模板文件名一致

### 样式问题

1. 确保正确引入了`common_html.css`
2. 使用浏览器开发者工具检查 CSS 问题
3. 遵循网站的设计风格

### JavaScript 不工作

1. 检查浏览器控制台是否有错误
2. 确保 HTML 元素 ID 与 JavaScript 中引用的一致
3. 使用`console.log()`调试问题

## 示例：完整的工具开发过程

以下是创建一个新工具"分子量计算器"的完整示例（可能不能工作，仅供示例）：

### 1. 创建内容文件

文件：`/content/tools/molecular_weight.md`

```markdown
---
title: "分子量计算器"
layout: "molecular_weight"
date: 2025-03-07
---
```

### 2. 创建布局模板

文件：`/layouts/_default/molecular_weight.html`

```html
{{ define "main" }} {{ $style := resources.Get "css/common_html.css" |
resources.Minify | resources.Fingerprint }}
<link rel="stylesheet" href="{{ $style.Permalink }}" />

<article class="article single">
  <header class="article-header">
    <div class="article-details">
      <h1 class="article-title">{{ .Title }}</h1>
    </div>
  </header>

  <section class="article-content">
    <div class="card">
      <div id="molecular-calc">
        <form id="molecularForm">
          <label for="formula">化学式:</label>
          <input
            type="text"
            id="formula"
            placeholder="例如: H2O, C6H12O6"
            required
          />

          <button type="button" onclick="calculateMolecularWeight()">
            计算分子量
          </button>
        </form>
        <div class="result" id="result"></div>
      </div>
    </div>
  </section>
</article>

<script>
  // 元素质量表
  const atomicWeights = {
    H: 1.008,
    He: 4.003,
    Li: 6.941,
    Be: 9.012,
    B: 10.811,
    C: 12.011,
    N: 14.007,
    O: 15.999,
    F: 18.998,
    Ne: 20.18,
    Na: 22.99,
    Mg: 24.305,
    Al: 26.982,
    Si: 28.086,
    P: 30.974,
    S: 32.065,
    Cl: 35.453,
    Ar: 39.948,
    K: 39.098,
    Ca: 40.078,
    // 可以继续添加其他元素
  };

  function calculateMolecularWeight() {
    const formula = document.getElementById("formula").value;
    const resultDiv = document.getElementById("result");

    if (!formula.trim()) {
      resultDiv.textContent = "请输入有效的化学式！";
      resultDiv.classList.add("error");
      return;
    }

    try {
      let totalWeight = 0;
      let i = 0;

      while (i < formula.length) {
        // 提取元素符号
        let symbol = formula[i++];
        if (i < formula.length && formula[i].match(/[a-z]/)) {
          symbol += formula[i++];
        }

        // 提取数量
        let count = "";
        while (i < formula.length && formula[i].match(/[0-9]/)) {
          count += formula[i++];
        }
        count = count ? parseInt(count) : 1;

        if (!atomicWeights[symbol]) {
          throw new Error(`未知元素: ${symbol}`);
        }

        totalWeight += atomicWeights[symbol] * count;
      }

      resultDiv.textContent = `分子量: ${totalWeight.toFixed(3)} g/mol`;
      resultDiv.classList.remove("error");
    } catch (error) {
      resultDiv.textContent = `错误: ${error.message}`;
      resultDiv.classList.add("error");
    }
  }
</script>
{{ end }}
```

这个完整示例展示了从设计、实现到部署的整个过程。

## 结语

按照本指南的步骤，你可以轻松地在网站中添加新的化学工具。记住，好的工具应该是：

- **简单直观**：用户界面清晰
- **功能明确**：解决特定问题
- **响应迅速**：计算快速高效
- **错误友好**：提供清晰的错误提示

如果你有任何问题或需要帮助，请联系网站管理员。

祝你开发顺利！
