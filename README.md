# chrome-utils-plugin

基于 **React**、**TypeScript** 与 **Ant Design** 打造的 Chrome 自定义工具插件，
依托 Chrome **Side Panel** 集成多种常用小工具。

## 功能

- **URL 格式化**：支持解码、参数排序以及去除 hash，可一键复制结果。
- **Cookie 设置**：将粘贴的 Cookie 字符串解析为表格，一键写入当前标签页。
- **JSON 格式化**：提供编辑器和树状视图，可折叠并实时同步。
- **图片上传**：拖拽、粘贴或选择图片后上传至 CDN（默认 ImgBB），并自动复制外链。
- **工具搜索**：在 side panel 中快速按关键字定位所需工具。

## 安装与使用

1. 执行 `npm install` 安装依赖（必要时配置 npm 镜像）。
2. 运行 `npm run dev`，启动 webpack dev server 并自动打开 sidepanel 页面。
3. 使用 `npm run build` 生成生产包，结果输出至 `dist/` 目录。
4. 在 Chrome 扩展管理页选择“加载未解压的扩展”，指向 `dist/` 目录调试。

建议在发布前运行 `npm run lint` 与 `npm run type-check`，以保证代码质量和类型安全。

## 项目目录结构

```
chrome-utils-plugin/
├── public/            扩展静态文件（图标、HTML 等）
├── src/               React 源码
│   ├── pages/         页面组件
│   ├── tools/         具体工具
│   └── background.ts  Chrome MV3 service worker
├── manifest.json      Chrome 扩展描述文件
└── webpack.config.js  打包配置
```

更多细节请查阅源代码，欢迎 Issue 与 PR。

## License

ISC
