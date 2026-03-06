from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class MainState(str, Enum):
    MAIN_CHAT_LIST = "MAIN_CHAT_LIST"
    SINGLE_CHAT = "SINGLE_CHAT"
    GROUP_CHAT = "GROUP_CHAT"
    MOMENTS_LIST = "MOMENTS_LIST"
    MOMENT_DETAIL = "MOMENT_DETAIL"
    COMMENT_INPUT = "COMMENT_INPUT"
    SEARCH_PAGE = "SEARCH_PAGE"
    POPUP_BLOCKED = "POPUP_BLOCKED"
    UNKNOWN_STATE = "UNKNOWN_STATE"


class ChatSubState(str, Enum):
    CHAT_READY = "CHAT_READY"
    CHAT_SCROLLING = "CHAT_SCROLLING"
    INPUT_READY = "INPUT_READY"
    INPUT_BLOCKED = "INPUT_BLOCKED"
    MESSAGE_PARSE_UNSTABLE = "MESSAGE_PARSE_UNSTABLE"
    TARGET_NOT_CONFIRMED = "TARGET_NOT_CONFIRMED"
    SEND_WAIT_VERIFY = "SEND_WAIT_VERIFY"


@dataclass(slots=True)
class StateContext:
    main_state: MainState = MainState.UNKNOWN_STATE
    chat_sub_state: ChatSubState = ChatSubState.TARGET_NOT_CONFIRMED
    target_name: str = ""


class WeChatStateMachine:
    def __init__(self) -> None:
        self.ctx = StateContext()

    def identify_state(self, ocr_text: str) -> MainState:
        text = ocr_text or ""
        if "聊天" in text and "通讯录" in text:
            state = MainState.MAIN_CHAT_LIST
        elif "朋友圈" in text and "今天" in text:
            state = MainState.MOMENTS_LIST
        elif "发送" in text and "更多功能" in text:
            state = MainState.SINGLE_CHAT
        elif "搜索" in text:
            state = MainState.SEARCH_PAGE
        else:
            state = MainState.UNKNOWN_STATE
        self.ctx.main_state = state
        return state

    def can_execute(self, action: str) -> bool:
        allowed_map = {
            "scan_chat_list": {MainState.MAIN_CHAT_LIST},
            "read_messages": {MainState.SINGLE_CHAT, MainState.GROUP_CHAT},
            "send_reply": {MainState.SINGLE_CHAT, MainState.GROUP_CHAT},
            "like_moment": {MainState.MOMENTS_LIST, MainState.MOMENT_DETAIL},
            "comment_moment": {MainState.MOMENT_DETAIL, MainState.COMMENT_INPUT},
        }
        return self.ctx.main_state in allowed_map.get(action, set())

    def transit(self, target: MainState) -> None:
        self.ctx.main_state = target

    def rollback_to_main(self) -> None:
        self.ctx.main_state = MainState.MAIN_CHAT_LIST
        self.ctx.chat_sub_state = ChatSubState.CHAT_READY
