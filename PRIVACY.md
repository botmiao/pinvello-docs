# Pinvello 隐私政策 / Privacy Policy

生效日期 / Effective Date: 2026-11-24  
开发者 / Developer: iori  

---

## 中文声明

Pinvello 是一款运行在 Windows 11 本地桌面壁纸层的开源字体兼容闭源商业桌面便笺应用。我们高度重视您的隐私，**Pinvello 坚持完全离线优先，不采集、不上传、也不出售您的任何个人数据或便笺内容。**

### 1. 本地存储与便笺数据
- 您的所有便笺正文、位置坐标、颜色、外观配置与扩展文件仅保存于您本地计算机的用户目录（`%LOCALAPPDATA%\Pinvello\notes.json` 及 `extensions\`、`cache\`、`logs\` 子目录），不会向开发者或任何第三方服务器发送。
- 日志文件仅包含运行诊断与错误排障信息，且默认存放于 `%LOCALAPPDATA%\Pinvello\logs\`；不会记录您的便笺私有文本用于上传或分析。

### 2. 无遥测、无账号、无云同步
- Pinvello 不要求注册或登录开发者账号。
- 应用内部不包含任何第三方分析 SDK、广告 SDK 或行为埋点。

### 3. Microsoft Store 内购与离线授权缓存
- 当您在偏好设置中购买或恢复「Pinvello Pro」买断解锁（Product ID: `pinvello_pro_lifetime`）时，支付流程与订单校验完全由 Windows 系统的 `Windows.Services.Store` 接口与微软官方商店托管。Pinvello 无法获取也不会保存您的银行卡号、账单地址或付款凭据。
- 为支持断网环境下离线正常使用 Pro 权益，应用会在本地 `%LOCALAPPDATA%\Pinvello\extensions\license.bin` 中保存经当前 Windows 用户 DPAPI（`CryptProtectData`）加密后的授权状态标记，仅包含包身份标识、Pro 附加组件编号、授权等级与校验时间戳。

### 4. 桌面交互与权限说明（`runFullTrust`）
- Pinvello 通过 Windows `WH_MOUSE_LL` 与 `WH_KEYBOARD_LL` 低级钩子在壁纸层实现便笺的点击识别、拖拽、框选、倾角微调及 `Win+D` 返回桌面恢复。
- 上述桌面交互信号仅在本地内存中即时处理用于判断命中目标窗口与热键动作；**Pinvello 不会记录您的键盘击键历史（无键盘记录），也不会录制屏幕内容或通过网络传送输入事件。**

### 5. 数据删除
- 您可随时删除 `%LOCALAPPDATA%\Pinvello\` 目录以彻底清除所有本地便笺记录、日志与离线授权缓存。

---

## English Policy

Pinvello is a Windows 11 desktop sticky-notes application pinned directly to your wallpaper layer. We respect your privacy: **Pinvello operates offline-first and does not collect, upload, track, or sell your personal data or note contents.**

### 1. Local Storage & Note Data
- All note contents, positions, tints, visual preferences, and optional user extensions remain solely on your device inside `%LOCALAPPDATA%\Pinvello\` (`notes.json`, `extensions\`, `cache\`, and `logs\`).
- Local diagnostic logs stored in `%LOCALAPPDATA%\Pinvello\logs\` remain exclusively on your computer.

### 2. Zero Telemetry & No Developer Account
- Pinvello does not require creating a developer account and embeds no analytics, advertising, or behavioral tracking SDKs.

### 3. Microsoft Store Purchases & Offline Cache
- In-app purchases and purchase restoration for Pinvello Pro (`pinvello_pro_lifetime`) are handled entirely by the Windows operating system via `Windows.Services.Store` and Microsoft Store. Pinvello never accesses or stores payment card details or personal Microsoft billing data.
- To preserve Pro access offline, Pinvello stores a Windows DPAPI-encrypted (`CryptProtectData`, bound to your local Windows user profile) entitlement marker at `%LOCALAPPDATA%\Pinvello\extensions\license.bin`.

### 4. Desktop Interaction & `runFullTrust` Disclosure
- Pinvello uses local Windows hooks (`WH_MOUSE_LL` and `WH_KEYBOARD_LL`) strictly to hit-test, drag, marquee-select, tilt-adjust (`Ctrl+Alt+Arrow`), and recover wallpaper-layer sticky notes after `Win+D`.
- All input events are evaluated transiently in local memory only; **Pinvello does not log keystrokes, capture screenshots for upload, or transmit input events over any network.**

### 5. Data Removal
- You may permanently erase all local notes, preferences, logs, and cached license state at any time by deleting `%LOCALAPPDATA%\Pinvello\`.
