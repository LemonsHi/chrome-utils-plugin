/** @type {import('prettier').Config} */
module.exports = {
  printWidth: 100, // 每行最大长度，官方默认 80，可按团队习惯调整 :contentReference[oaicite:2]{index=2}
  tabWidth: 2, // 一个缩进 = 2 空格
  useTabs: false, // 不使用制表符缩进
  semi: true, // 语句末尾自动加分号
  singleQuote: true, // 使用单引号
  trailingComma: "es5", // ES5 中允许的尾逗号（对象、数组、函数参数） :contentReference[oaicite:3]{index=3}
  arrowParens: "avoid", // 单参数箭头函数省略括号
  endOfLine: "lf", // 统一使用 LF 换行（跨系统一致）
  overrides: [
    // Less / CSS 文件换行长度放宽，避免对样式类名强制换行
    {
      files: ["*.less", "*.css"],
      options: { printWidth: 120 },
    },
  ],
};
