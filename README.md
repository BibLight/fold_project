# FOLD PROJECT

独立游戏 `FOLD PROJECT` 的官方网站骨架，可直接部署至 GitHub Pages。

## 本地预览

这是一个无构建依赖的静态站点。直接打开 `index.html`，或在项目目录运行任意静态文件服务器即可预览。

例如：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000`。

## 后续替换

- 在 `index.html` 中修改游戏名称、介绍、平台和联系方式。
- 用真实游戏截图替换 `gallery` 区域的抽象占位画面。
- 将邮件订阅表单接入 Buttondown、Mailchimp 或其他邮件服务。
- 在 GitHub 仓库设置中启用 Pages，并选择从 `main` 分支根目录部署。

## 项目结构

```text
index.html   页面结构与文案
styles.css   视觉、动画与响应式布局
script.js    移动端导航、滚动显现与演示表单
```
