# Assets 截图清单（详细版）

> 目标：保障微信窗口识别、按钮定位与状态回传稳定性。

## A. 锚点模板（必须）
1. `assets/smile_icon.png`
   - 用途：主锚点（心跳检测），判断是否成功锁定微信聊天窗口。
   - 建议：仅截取图标本体，去掉多余背景，尺寸约 18~40 px。

2. `assets/tab_chat.png`
   - 用途：定位“聊天”Tab，辅助判断当前页面是否为会话视图。
   - 建议：保证文字和图标同时包含，避免夜间模式误匹配。

3. `assets/input_box_anchor.png`
   - 用途：输入框区域锚点，供消息粘贴与发送前定位。
   - 建议：截取输入框左上角稳定区域，避免动态提示文案。

## B. 动作按钮模板（建议）
4. `assets/btn_send.png`
   - 用途：发送按钮识别（点击发送 or 校验可发送状态）。

5. `assets/btn_more.png`
   - 用途：更多功能入口（图片、文件等）。

6. `assets/btn_emoji.png`
   - 用途：表情面板定位，兼容某些皮肤下布局偏移。

## C. 窗口状态模板（建议）
7. `assets/window_title_wechat.png`
   - 用途：窗口标题关键字定位，配合 `pywin32` 增强唤醒准确率。

8. `assets/unread_dot.png`
   - 用途：未读红点提示识别，判断是否有新消息待处理。

## D. OCR 调试样本（必须）
9. `assets/samples/chat_crop_01.png`
10. `assets/samples/chat_crop_02.png`
11. `assets/samples/chat_crop_03.png`
   - 用途：OCR阈值、预处理参数调优（亮色/暗色/缩放比例）。

## E. 质量标准（采集规范）
- 分辨率：优先使用实际运行机器的 100% 缩放截图。
- 格式：PNG，无损压缩。
- 命名：小写下划线风格，避免中文和空格。
- 版本：建议按 `v1`, `v2` 留档，例如 `smile_icon_v2.png`。
- 校验：每个模板至少在 20 张截图中验证匹配率，目标 > 95%。
