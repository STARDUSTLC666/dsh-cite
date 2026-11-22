# dsh-cite 工作台 / Workbench

引文库默认以**「文献引力星图画布」**呈现：整库文献以无重叠节点分布在点阵星域画布上，自动绘制同作者、同刊物、同期（±2 年）与 Crossref 聚类 SVG 引力连线，支持指针拖拽实时联动、左上悬浮控制台（引文格式切换 `GB/T 7714 / APA / IEEE / MLA / Chicago`、即时高亮搜索、质量筛选与 `星图 / 列表` 切换）以及右下悬浮 Zettelkasten 索引卡（一键复制引文、复制 BibTeX、Crossref 补全、编辑元数据、查看原始来源与删除）。通过顶栏或悬浮胶囊可 1 键切回经典三栏「列表」视图进行批量选择与可拖拽分栏浏览。

The library opens by default in the **Spatial Citation Constellation** canvas: non-overlapping pointer-draggable paper nodes connected by live curved SVG relationship filaments (shared authors, venues, ±2-year eras, Crossref/quality clusters), paired with a top-left Floating Control Capsule (citation format switcher `GB/T 7714 / APA / IEEE / MLA / Chicago`, instant search highlighting, quality filters, and `Constellation / List` toggle) and a bottom-right Floating Zettelkasten Index Card HUD (Copy citation, Copy BibTeX, Enrich from Crossref, Edit metadata, Raw source, and Remove). Switch to the classic 3-pane **List** view in 1 click anytime for multi-select batch operations and resizable split-pane inspection.

## 使用 / Use

更新插件并重启 DSH，在原生左侧栏打开工作台；没有固定时可在“更多”中找到。原有“设置”入口继续可用。侧栏排序和固定由 DSH 管理。

Update the plugin, restart DSH and open its native sidebar panel (or More if it is not pinned). The existing Settings entry remains available. DSH owns sidebar order and pinning.

界面跟随宿主中英文和深浅色，保留用户内容原文。窄窗口中先显示列表，打开详情后可返回；编辑器按可用宽度分栏或顺序排列。危险操作需要明确确认，未保存内容不会因切页而静默丢失。

The UI follows host language and theme without translating user content. Narrow master/detail views have a Back action; editors adapt their columns to available space. Destructive actions require confirmation and edits are protected.

## 导出前检查与冲突 / Export checks and conflicts

「导出备份」支持切换「全部文献 / 仅所选」。切换范围会更新文献条数、引文预览，以及缺少标题、作者或年份的条目数。完整备份始终包含全库与原始输入。

The downloads tab shows a pre-export check before the links: switch between the entire library and the current selection, read the entry count, citation style, counts of entries missing title/authors/year, and the note that full backup always covers the whole library with original sources. Counts come from the local library and recompute when the scope changes; an empty library explains itself instead of showing inert buttons.

并发保存冲突以错误状态呈现，说明库已在别处更新、当前输入仍保留，并只提供「重新预览当前输入」一条恢复路径；冲突期间「保存所选」禁用并说明原因，不会重复提交同一个过期修订。

A concurrent-save conflict is shown as an error status that names what happened, keeps the input, and offers one recovery path (preview the current input again). Saving stays disabled with a stated reason, so the same stale revision cannot be resubmitted.

「DOI 核查」页复用 `cite_check` 的校验逻辑。点击核查后，按首次出现顺序向 Crossref 查询前 50 个唯一 DOI。核查以只读方式运行。

The DOI check tab uses the same validation as `cite_check` to look up the first 50 unique DOIs in order of appearance. Checking is read-only.

## 源码 / Source

编辑 templates/client.js、templates/panels/*.js 和 templates/workbench.css，运行 pnpm run build。lib/client.js 是确定性产物，请随源码提交。公共组件的规范源位于 dsh-suite/ui/workbench-ui.js，Suite 的同步脚本显式分发副本；单个仓库可独立构建和安装。

Edit the template sources and run pnpm run build. Commit generated lib/client.js with source changes. The vendored UI has no Suite runtime dependency.

## 验收范围 / Validation boundary

当前版本要求宿主 DSH `>=0.2.2-rc.3`。工作台顶部提供 `? 引导`（`? Tour`）交互式聚光灯导览与一键复制的核验对话指令，文献库支持带修订冲突保护的单条与批量确认删除。历史回归基线：Windows 后台 Chrome/Playwright 实际点击和输入；覆盖中英文、浅深色、1536px 与 390px、状态读回与控制台。Browser plugin 不可用，因此使用本地 Playwright。

邮件使用受控 AgentMail HTTP 服务，日历使用受控 CalDAV 协议传输；插件处理器、存储、校验和原生宿主均实际运行。未使用真实邮箱、真实日历账号或付费模型。RSS 访问 Node.js 官方公开来源。PPT 实际生成并渲染 PPTX、下载 ZIP；两个视频插件实际运行官方引擎并播放 MP4。

这些是 Web 共用界面的验收结果，不代表已验收 Electron 专属菜单、系统权限、真实账号、全部外部来源或所有可选模型/引擎。Docker、Slack、钉钉继续按用户约定搁置。

## 仅使用模型工具 / Tools without a sidebar panel

在 cite 行的 config 中设置 `hideWorkbench: true`，保存配置并刷新界面，可隐藏原生侧栏入口和主面板。默认 false。设置页、更新页脚、cite 工具、本地文献库和导出接口保留；不需要修改已安装的 package.json。

Set `hideWorkbench: true` in the cite row's config and refresh the client. It hides the sidebar/main workbench while preserving Settings, update controls, model tools and stored references. The default is false.
