from __future__ import annotations

from dataclasses import dataclass


@dataclass(slots=True)
class WindowRect:
    left: int
    top: int
    width: int
    height: int


class WindowManager:
    """占位实现：第一版提供接口，后续接入 win32gui/pygetwindow。"""

    def find_wechat_window(self) -> WindowRect:
        return WindowRect(left=0, top=0, width=1280, height=800)

    def ensure_foreground(self) -> bool:
        return True

    def capture_window(self) -> bytes:
        return b""
