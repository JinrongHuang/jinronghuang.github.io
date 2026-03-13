# 个人学术主页

这是一个基于静态页面的个人学术主页项目，适合展示个人简介、论文、项目、获奖等信息。

## 模板来源与使用声明

本项目灵感/模板来自：

- https://github.com/senli1073/academic-homepage-template

欢迎自由使用、修改和二次开发。

## 项目结构

```text
.
├── index.html
├── contents/
│   ├── home.md
│   ├── publications.md
│   ├── projects.md
│   ├── awards.md
│   └── config.yml
└── static/
	├── css/
	├── js/
	└── assets/
```

## 如何修改内容

- 个人信息与页面配置：编辑 `contents/config.yml`
- 首页内容：编辑 `contents/home.md`
- 论文列表：编辑 `contents/publications.md`
- 项目列表：编辑 `contents/projects.md`
- 获奖信息：编辑 `contents/awards.md`

## 本地预览

建议用任意静态服务器预览，例如：

```bash
# Python 3
python -m http.server 8000
```

然后在浏览器打开：

```text
http://localhost:8000
```

## 部署

可直接部署到 GitHub Pages。

---

如果你也在做个人主页，欢迎直接 Fork 后按需修改。
