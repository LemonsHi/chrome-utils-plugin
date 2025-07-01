# chrome-utils-plugin

Chrome 自定义工具插件，使用 React 和 Ant Design 开发。该插件使用了 Chrome Side Panel，提供 URL 格式化、Cookie 设置等工具。

## 功能

- **URL 格式化**：支持解码、参数排序以及去除 hash 部分，且可一键复制结果。
- **Cookie 设置**：将粘贴的 Cookie 字符串解析为表格，并一键写入当前标签页。
- **JSON 格式化**：暂无实现，将在以后的版本中支持。

## 安装与使用

1. 使用 `npm install` 安装依赖（需要可以自行配置 npm 镜像）。
2. 开发时执行 `npm run dev`，开启 webpack dev server 并自动打开 sidepanel 页面。
3. 生产构建使用 `npm run build`，结果会输出到 `dist/`目录。
4. 在 Chrome 扩展管理页面中选择“加载未解压的扩展”，指向 `dist/` 目录即可测试。

推荐在插件发布前运行 `npm run lint` 和 `npm run type-check`，展示以保证代码质量和类型程度正确。

## 项目目录结构

```
chrome-utils-plugin/
├── public/            扩展静态文件（图标、HTML 等）
├── src/               代码主体，主要为 React 项目
│   ├── pages/         页面组件
│   ├── tools/         具体工具展示
│   └── background.ts  Chrome MV3 service worker
├── manifest.json      Chrome 扩展描述文件
└── webpack.config.js  打包配置
```

更多详情请查看代码源文件。
