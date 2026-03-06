from __future__ import annotations

from dataclasses import dataclass


@dataclass(slots=True)
class SendResult:
    success: bool
    reason: str = ""


class Sender:
    def send_text(self, text: str, current_target_ok: bool, input_cleared: bool, right_bubble_seen: bool) -> SendResult:
        if not current_target_ok:
            return SendResult(success=False, reason="TARGET_NOT_CONFIRMED")
        if not text.strip():
            return SendResult(success=False, reason="EMPTY_TEXT")
        if not input_cleared or not right_bubble_seen:
            return SendResult(success=False, reason="SEND_VERIFY_FAILED")
        return SendResult(success=True)
