# 更新记录

## 0.11.5 (2026-11-20)

- DOI 查询和 Crossref 检索失败时主动释放未读取响应，避免批量错误查询占用连接；清理失败仍保留原始 HTTP 错误。
- Release unread Crossref error responses without masking their original HTTP status.
- 同步共享更新组件 0.2.9，修复取消窗口和失败响应清理，并确保运行中旧协调器在空闲后接管修复。

## 0.11.4 (2026-11-20)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.7`：对话页「有新版本」提醒浮卡支持无交互 15 秒自动收起（悬停、聚焦、查看记录或确认弹窗时自动暂停，安装成功提示 6 秒收起，安装中/失败/需要重启仍保持常驻不隐藏）。
- Upgrade `@stardustlc/dsh-updates` to `0.2.7`: auto-dismiss idle update reminder cards after 15s and silent complete cards after 6s while pausing on hover/focus/notes/dialogs and keeping active, failed, or restart-required cards pinned.

## 0.11.3 (2026-11-20)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.6`：端到端验收修复浮卡与日历按钮重叠、详情页/工作台挂载时瞬时让位及 `package-moved` / 包管理器报错诊断文案，继续保持过期检查自动刷新与 `bundle-in-use` 指导。
- Upgrade `@stardustlc/dsh-updates` to `0.2.6`: E2E-verified fixes for floating Calendar FAB clearance, immediate reminder yield on native detail/workbench mount, and clearer `package-moved` / package-manager error messages, alongside auto-refresh and `bundle-in-use` guidance.

## 0.11.2 (2026-11-20)

- 在备用弹窗中，子菜单优先处理 Escape，避免误关外层表单。
- Let nested controls consume Escape before closing a fallback dialog.

## 0.11.1 (2026-11-19)

- 修复首次未找到宿主控件后永久使用 fallback 的缓存问题；支持同一加载器下宿主迟到、卸载、替换与重载。
- Refresh cached controls when the host becomes available, unloads or is replaced.

## 0.11.0 (2026-11-18)

- **工作台 UI v3：13 套明亮风格 × 8 套双层中英文字体搭配（默认 `幼圆等宽 / YouYuan Mono`）**：
  - 在原有风格基础上新增 `晴昼琉璃 / Glass`、`护眼墨水屏 / E-Ink`、`工程晒图 / Blueprint`、`波普孔版 / Riso Zine`、`千禧复古 / Retro 98`、`宋韵朱砂 / Song Xuan`、`晴空水晶 / Aqua Gloss`、`铅字晨报 / Gazette` 等共 **13 套明亮工作台预设**，统一支持 48px 单行顶栏、可拖拽分栏分隔条（`DshSplitResizer`）、滑动 Tab 指示器、骨架屏微光加载、行悬停快捷操作与干净精简行复选框。
  - 新增独立 `FontSwitcher`（`字` / `Aa`），支持 8 套双层中英文排版（默认 `arcade` 幼圆等宽 + `auto` 跟随风格专属字 / `songkai` / `fangsong` / `poster` / `retro98` / `serif` / `modern`）并跨插件与弹窗同步。
- **Workbench UI v3: 13 Bright Presets × 8 Dual-Layer Chinese/Latin Font Pairings (default `arcade` YouYuan Mono)**:
  - Expand the theme system to **13 bright daylight presets** (adding `glass`, `eink`, `blueprint`, `risograph`, `win98`, `songhui`, `frutiger`, and `gazette`) alongside a unified 48px single-row header, resizable split pane (`DshSplitResizer`), sliding tab indicator, shimmer skeletons, row hover quick actions, and clean icon-only row checkboxes.
  - Add standalone `FontSwitcher` (`字` / `Aa`) with 8 Windows-verified Chinese/Latin font pairings (`arcade` YouYuan Mono default, `auto` match-style, `songkai`, `fangsong`, `poster`, `retro98`, `serif`, `modern`), synced across workbenches and portaled overlays.

## 0.10.4 (2026-11-18)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.5`：独立安装插件详情页底栏去重（保留组合包组件委派与对话页热更新卡片），补齐 `bundle-in-use` 组合包占用提示说明，并在检查结果过期或远端版本变更时自动刷新元数据，彻底消除 `check-first` 卡顿。
- Upgrade `@stardustlc/dsh-updates` to `0.2.5`: deduplicate standalone native plugin detail footers while keeping Suite delegation and in-chat reminder cards, surface clear `bundle-in-use` guidance, and automatically refresh expired update checks without `check-first` stalls.

## 0.10.3 (2026-11-18)

- 升级共享更新组件至 `@stardustlc/dsh-updates@0.2.4`：对话页新增一键热更新提醒卡片，自动检查周期缩短至 6 小时，手动热更新后可顺手开启包含兼容功能小版本的空闲自动更新。
- Upgrade `@stardustlc/dsh-updates` to `0.2.4`: add an actionable in-chat hot-update reminder card, 6-hour background update checks, compatible minor+patch idle auto-updates, and a post-update opt-in prompt.

## 0.10.2 (2026-11-18)

- **交互式聚光灯 + 自动转向箭头分步引导（Coachmark Tour）**：顶栏新增 `? 引导` 按钮，首次进入工作台温和引导一次（跳过或完成后写入 `localStorage` 永久不再打扰），支持真实按钮聚光灯高亮、视口边缘自动翻转小箭头、键盘 `←`/`→`/`Esc` 导航与气泡内一键复制对话指令；移除占高度的静态折叠流程说明框。
- **Interactive Spotlight + Directional Arrow Coachmark Tour**: add a header **? Tour** trigger with one-time non-intrusive first-visit onboarding (`localStorage` persisted), live target spotlighting, auto-flipping directional arrows, keyboard `←`/`→`/`Esc` navigation, and inline 1-click prompt copy, replacing the static collapsible workflow box.

## 0.10.1 (2026-11-18)

- 同步 `@stardustlc/dsh-updates` 0.2.3：侧边栏工作台平时默认隐藏底部更新栏（零高度占用），仅在检测到兼容新版本或执行更新时浮现单行精简提示条；完整更新设置与检查入口统一保留在 DSH「插件」详情页底部。
- Sync `@stardustlc/dsh-updates` 0.2.3: keep the sidebar workbench update footer hidden by default when up-to-date, surfacing a single-line compact strip only for actionable updates or active jobs while retaining full controls in native Plugin Details.

## 0.10.0 (2026-11-18)

- 新增文献条目安全删除（`remove` 操作，支持单条与批量删除、二次确认弹窗、修订号 `409` 冲突保护与孤立原始源清理，删除后可干净重导）。
- 打通「DOI 核查 → 一键送入导入预览」流转，导入页新增「填入示例 DOI / BibTeX」零门槛按钮，并补充可折叠四步论文引用工作流与一键复制对话指令。
- Add atomic citation removal (`remove` action/operation with single & batch delete confirmation, `409` revision guards, and orphan source pruning).
- Add 1-click verified-DOI handoff from DOI Check to Import preview, a sample BibTeX/DOI starter button, and a collapsible 4-step workflow guide with copyable chat prompt chips.

## 0.9.4 (2026-11-18)

- 更新区底部新增克制、无打扰的 GitHub 点赞与问题反馈快捷链接，并完善中英文检索关键词。
- Add subtle, non-intrusive GitHub Star and issue feedback links in the update footer, and expand search keywords.

## 0.9.3 (2026-11-18)

- 同步 `@stardustlc/dsh-updates` 0.2.1：恢复 Suite 整包统一更新（移除独立拆包迁移），保留整包与独立插件的原地热更新与失败自动回滚。
- Sync `@stardustlc/dsh-updates` 0.2.1: restore unified Suite bundle updates (removing standalone conversion) while retaining in-place hot reload and automatic rollback.

## 0.9.2 (2026-11-18)

- 同步发布 0.9.0 原生引文工作台 UI v2 增强版（保留原有三栏布局与交互流程，含 5 套界面风格切换、柔和岩板深色模式与 DSH `>=0.2.2-rc.3` 深度适配）。
- Publish the enhanced 0.9.0 native citation workbench UI v2 release (preserving the original three-pane layout and workflows with five switchable styles, soft-slate dark mode, and DSH `>=0.2.2-rc.3` host integration).

## 0.9.0 (2026-11-18)

- 升级引文工作台 UI v2 并深度适配 DeepSeek Harness `>=0.2.2-rc.3`：新增 5 套可切换界面风格（原生清透 / 米白纸感 / Claude 暖书卷 / 8-Bit 像素 / 晴空薄荷）并支持跨插件同步，深色模式采用柔和透气岩板色（告别纯黑背景）。
- 接入宿主原生控件（延迟按需解析与弹窗样式同步）、窗口顶栏与侧栏安全留白、按钮按压与小图标微交互动效，以及 Cordis 4 `ctx.effect` 热重载卸载清理。
- Upgrade the citation workbench to UI v2 with deep DeepSeek Harness `>=0.2.2-rc.3` integration: add five switchable visual themes (`harness`, `cream`, `claude`, `pixel8bit`, `mint`) synced across plugins and a soft breathable slate dark mode instead of pitch black.
- Wire lazy native host UI primitives with portaled overlay sync, window frame clearances, tactile button and SVG icon micro-animations, reduced-motion support, and Cordis 4 `ctx.effect` unload cleanup.

## 0.8.1 (2026-11-17)

- 在工作台单独检查和安装兼容版本。自动安装默认关闭，可为该插件开启空闲时的稳定补丁更新。
- Check and install compatible versions separately from the workbench. Automatic installation is off by default. Enable it for this plugin to apply stable patches while idle.

## 0.8.0 (2026-11-16)

- 新版原生引文工作台包含格式与状态筛选、文献列表和详情三栏，支持在详情复制当前格式的引文或 BibTeX。窄屏可以在列表和详情之间切换。
- 新增 DOI 核查页，按首次出现的顺序向 Crossref 查询前 50 个唯一 DOI。导入页保留去重预览和冲突恢复，导出页支持按范围检查和下载。
- The native workbench has panes for format and status filters, the reference list, and details. Copy a formatted citation or BibTeX from the details pane. Narrow layouts let you switch between the list and details.
- The DOI check tab queries Crossref for the first 50 unique DOIs in order of appearance. The import tab previews duplicates and recovers from save conflicts. The export tab checks and downloads the chosen scope.

## 0.7.10 (2026-11-14)

- 适配 DSH 0.2.2-rc.3：最低 Harness 版本声明提升至 0.2.2-rc.3，运行时代码未变。
- Support DSH 0.2.2-rc.3: raise the minimum Harness declaration to 0.2.2-rc.3; runtime code is unchanged.

## 0.7.9 (2026-11-04)

- 同步共享界面：嵌入设置时继承宿主底色，输入框跟随主题，空状态保持可读宽度；新版 DSH 可显示插件设置图标。
- Align embedded surfaces, themed inputs, readable empty states and optional native settings icons.
- 新增 hideWorkbench 选项，保留工具、设置与更新控制。
- Add hideWorkbench while retaining tools, Settings and update controls.


## 0.7.8 (2026-10-30)

- 引文工作台：「引文与下载」页新增导出前检查（可切换全部 / 仅所选范围，显示范围条数、引文格式、缺标题 / 作者 / 年份条目数与完整备份范围），下载按钮改为工作台按钮并在空库时给出说明；冲突提示改用工作台状态组件并只保留一条恢复路径，冲突期间「保存所选」禁用并说明原因；补全进度条补上标签和除零保护，键盘聚焦轮廓改用主题强调色。
- Pre-export checks with explicit scope, conflict recovery that cannot resubmit a stale revision, labelled progress and theme-based focus rings in the reference workbench.

- 同步共享 workbench-ui v1.1：Page 外的 Empty / Dialog / Status 自带样式与 `.dshw` 主题作用域，Status 新增 warn 色调。
- Sync workbench-ui v1.1: Empty / Dialog / Status now carry their own styles and `.dshw` theme scope outside Page, and Status gains a warn tone.

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
