# 更新记录

## 0.7.7 (2026-10-30)

- 重整中英文首页：用途、三步流程图、安装入口与操作示例；详细配置与边界集中到完整说明。
- 保留下载统计、独立更新选择、问题反馈和贡献入口；原封面与运行功能保留。
- Refresh bilingual landing pages, workflow artwork, quick starts and reference navigation.


## 0.7.6 (2026-10-30)

- 原生插件列表与详情新增专门生成的鲸鱼娘图标：大头像、独立功能符号、透明留白，适合 30 / 36 px 显示；原封面保留。
- Add purpose-made whale-girl artwork with a distinct function emblem, transparent padding and small-size readability; preserve the original cover.


[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

[历史英文记录](docs/CHANGELOG.en.md)

## 0.7.5 (2026-10-29)

- 补齐中英文使用流程：准备、入口、具体操作与结果核对；新增累计 npm 下载徽章并保留月统计。
- Add practical getting-started workflows and lifetime npm download badges alongside monthly counts.

## 0.7.4 (2026-10-29)

- 同步仓库与 npm 的简明介绍、中英文 README 和反馈入口；本次为文档与包元数据更新。
- Sync npm descriptions and both README guides with the repository, including issue and pull-request links.

## 0.7.3 (2026-10-27)

- 修复分批更新时的新旧更新控件混用：保留原页面、草稿与安装保护，空闲后接管旧控制器，兼容旧入口。

## 0.7.2 (2026-10-27)

- 更新控件移至原有工作台或原生插件详情页底部；更新记录与选项原地展开，移除独立更新菜单与页面。
- 保留原页面操作与草稿，自动安装默认关闭；安装前确认，遇到未保存修改或运行任务时暂停。

## 0.7.1 (2026-10-27)

- Keep this component's own update entry visible when installed transitively through Suite. Confirm whole-Suite update scope before opening its controls.
- Keep automatic installation off by default and preserve independent installation behavior.

## 0.7.0 (2026-10-26)

- Add this plugin’s own update controls and independent preferences. Automatic installation stays off until explicitly enabled.
- Confirm manual installs, preserve local sources and disabled state, pause for tasks or unsaved changes, and use native DSH recovery without forced restarts.
- Require the public DSH 0.2.1-rc.3 update APIs; Suite components remain managed through Suite.

## 0.6.1（2026-10-26）

- 文献正文与标识符分开规范化：保留数学比较符、SICI DOI 和 URL 中的特殊字符。只在明确的元数据入口处理已知格式标签，BibTeX 导出可再次导入。
- Windows 回归 47 项通过、0 项跳过；宿主与未验收范围见[本次记录](docs/validation-0.6.1.md)。

## 0.6.0（2026-10-25）

- 引文主工作台，文献列表、元数据、来源与引文预览分栏；搜索与导入后的选中状态一致。
- 提供 DSH 原生侧栏入口，保留设置页；统一中英、深浅色、窄屏、键盘焦点与真实空/失败状态。
- 浏览器源码移至 templates/client.js、templates/panels/ 与共享组件，独立构建为 lib/client.js；移除重复的首次引导。
- 官方 DSH 0.2.1-rc.3 Web 逐项实际操作验收，账户模拟和未验收范围见 [工作台说明](docs/WORKBENCH.md)。

## 0.5.0（2026-10-17）

- 设置面板顶部新增「首次使用」分步引导：一次只讲一步，支持上一步/下一步/跳过，看完记在本机不再出现。
- 引导内容与该插件的实际用法一致；可在开发者工具里清掉 `dsh-first-run:dsh-cite:v1` 重新查看。
## 0.4.2 (2026-10-05)

- 保留 DOI 内合法的成对括号，正确剥除正文外层标点；Crossref 响应读取也受取消与超时控制。

## 0.4.1 (2026-10-03)

- 修复含多个出版社名称的 BibTeX 导出后再导入失败，保留出版社名称及原始来源。41 项 Windows 测试与真实下载文件的再导入通过。

## 0.4.0 (2026-10-03)

- 新增中文 / English 文献工作台和 `cite_batch`：DOI / BibTeX 批量导入、本地预览、选择保存、搜索及格式切换。原有五个工具保留。
- DOI 精确去重，缺少 DOI 时提示可能重复；原始来源随完整备份保留，BibTeX 导出使用唯一引用键。
- 在线补全需明确操作，只补空字段并保留差异；支持进度、取消及失败重试，文献库修订检查避免覆盖其他窗口的修改。
- 使用 Citation.js 的本地 BibTeX 解析器，限制输入和解析时间，不自动请求输入中的链接。
- 修复 MLA 机构名称与复合姓氏被按空格拆分的问题；Chicago note 保留名字、姓氏边界，英文缺失信息提示不再混入中文。
- 官方 DSH RC2 / 0.2.1-alpha.1 SDK、Windows 测试及真实浏览器导入、Crossref 查询、中英文切换和下载通过。原生桌面新界面尚未实际操作验收，见[验证记录](docs/VALIDATION.md)。

## 0.3.5 (2026-09-28)

- 更新官方 Harness 0.2.0-rc.1 的兼容声明和共同加载验证；运行时代码未变。验证范围见[验证记录](docs/VALIDATION.md)。

## 0.3.4 (2026-09-27)

修复 BibTeX 作者姓名顺序，保留复合姓氏；机构作者使用独立括号，避免被拆成人名。

## 更早的改动

完整历史可查阅 [GitHub 提交记录](https://github.com/STARDUSTLC666/dsh-cite/commits/master)。
