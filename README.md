# chrome-utils-plugin

基于 **React**、**TypeScript** 和 **Ant Design** 开发的浏览器工具集合插件。利用 Chrome **Side Panel** 汇聚常用小工具，后台通过 Manifest V3 Service Worker 与页面协作。

## 功能特点

- **URL 格式化**：支持解码、参数排序并移除 hash，一键复制结果。
- **Cookie 设置**：粘贴 Cookie 字符串即可解析成表格并写入当前标签页。
- **JSON 格式化**：编辑器与树状视图实时同步，可折叠数据。
- **图片上传**：拖拽、粘贴或选择图片后上传至 CDN（默认 ImgBB），自动复制外链。
- **二维码生成**：将当前或自定义链接转换为二维码，可复制与下载。
- **工具搜索**：在 side panel 中快速按关键字定位工具。

## 开发与使用

### 环境要求
- Node.js >= 20

### 本地调试
1. `npm run bootstrap` 安装依赖。
2. `npm run dev` 启动开发环境并自动打开 side panel。
3. 在 `chrome://extensions` 中选择「加载未解压的扩展」，指向 `dist/chrome`。
4. 使用 `BROWSER=firefox npm run dev` 构建 `dist/firefox` 后，在 `about:debugging#/runtime/this-firefox` 中点击「加载临时附加组件」。

### 构建
- `npm run build:chrome` 生成 Chrome 包。
- `npm run build:firefox` 生成 Firefox 包。

发布前建议运行 `npm run lint:fix` 与 `npm run type-check`，确保代码质量与类型安全。

## 项目结构

```
chrome-utils-plugin/
├── public/                 扩展静态文件
├── src/                    React 源码
│   ├── pages/              页面组件
│   ├── tools/              具体工具
│   └── background.ts       MV3 service worker
├── manifest.chrome.json    Chrome 描述文件
├── manifest.firefox.json   Firefox 描述文件
└── webpack.config.js       打包配置
```

更多细节请参阅源码，欢迎 Issue 与 PR。

## License

ISC
