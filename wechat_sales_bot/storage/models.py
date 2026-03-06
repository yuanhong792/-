from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from typing import Optional


class ChatType(str, Enum):
    SINGLE = "single"
    GROUP = "group"


class CustomerLevel(str, Enum):
    S = "S"
    A = "A"
    B = "B"


@dataclass(slots=True)
class Customer:
    id: Optional[int]
    wx_name: str
    remark_name: str = ""
    avatar_hash: str = ""
    source: str = ""
    city: str = ""
    car_model: str = ""
    customer_level: CustomerLevel = CustomerLevel.B
    sales_stage: str = "新加好友"
    last_topic: str = ""
    last_interaction_at: Optional[datetime] = None
    last_private_chat_at: Optional[datetime] = None
    last_moment_interaction_at: Optional[datetime] = None
    next_followup_at: Optional[datetime] = None
    private_chat_disabled: bool = False
    blacklisted: bool = False


@dataclass(slots=True)
class ConversationRecord:
    id: Optional[int]
    customer_id: int
    chat_type: ChatType
    raw_ocr_text: str
    parsed_message: str
    direction: str
    intent: str
    hit_rule: str
    generated_reply: str
    send_status: str
