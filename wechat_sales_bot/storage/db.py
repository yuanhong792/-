from __future__ import annotations

import sqlite3
from pathlib import Path


SCHEMA_SQL = """
CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  wx_name TEXT NOT NULL,
  remark_name TEXT,
  avatar_hash TEXT,
  source TEXT,
  city TEXT,
  car_model TEXT,
  customer_level TEXT NOT NULL DEFAULT 'B',
  sales_stage TEXT NOT NULL DEFAULT '新加好友',
  last_topic TEXT,
  last_interaction_at TEXT,
  last_private_chat_at TEXT,
  last_moment_interaction_at TEXT,
  next_followup_at TEXT,
  private_chat_disabled INTEGER NOT NULL DEFAULT 0,
  blacklisted INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  chat_type TEXT NOT NULL,
  raw_ocr_text TEXT,
  parsed_message TEXT,
  direction TEXT,
  intent TEXT,
  hit_rule TEXT,
  generated_reply TEXT,
  send_status TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS followup_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  stage TEXT NOT NULL,
  task_type TEXT NOT NULL,
  scheduled_at TEXT NOT NULL,
  executed_at TEXT,
  result TEXT,
  private_chat_disabled INTEGER NOT NULL DEFAULT 0,
  next_action TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS moments_interactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER NOT NULL,
  moment_author_name TEXT,
  customer_level TEXT,
  content_type TEXT,
  liked INTEGER NOT NULL DEFAULT 0,
  commented INTEGER NOT NULL DEFAULT 0,
  comment_text TEXT,
  result TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS rules_keywords (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  keyword TEXT NOT NULL,
  match_type TEXT NOT NULL,
  reply_text TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  priority INTEGER NOT NULL DEFAULT 100
);

CREATE TABLE IF NOT EXISTS prompts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prompt_type TEXT NOT NULL,
  prompt_name TEXT NOT NULL,
  content TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
"""


class Database:
    def __init__(self, db_path: str = "wechat_sales_bot.db") -> None:
        self.db_path = Path(db_path)
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row

    def init_schema(self) -> None:
        self.conn.executescript(SCHEMA_SQL)
        self.conn.commit()

    def close(self) -> None:
        self.conn.close()
