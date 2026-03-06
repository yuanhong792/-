from __future__ import annotations

from datetime import datetime
from typing import Optional

from .db import Database
from .models import Customer, CustomerLevel


class CustomerRepository:
    def __init__(self, db: Database) -> None:
        self.db = db

    def upsert_by_name(self, wx_name: str, level: CustomerLevel = CustomerLevel.B) -> int:
        row = self.db.conn.execute("SELECT id FROM customers WHERE wx_name = ?", (wx_name,)).fetchone()
        if row:
            return int(row["id"])

        cursor = self.db.conn.execute(
            "INSERT INTO customers(wx_name, customer_level) VALUES(?, ?)",
            (wx_name, level.value),
        )
        self.db.conn.commit()
        return int(cursor.lastrowid)

    def get_customer(self, customer_id: int) -> Optional[Customer]:
        row = self.db.conn.execute("SELECT * FROM customers WHERE id = ?", (customer_id,)).fetchone()
        if not row:
            return None
        return Customer(
            id=row["id"],
            wx_name=row["wx_name"],
            remark_name=row["remark_name"] or "",
            avatar_hash=row["avatar_hash"] or "",
            source=row["source"] or "",
            city=row["city"] or "",
            car_model=row["car_model"] or "",
            customer_level=CustomerLevel(row["customer_level"]),
            sales_stage=row["sales_stage"],
            last_topic=row["last_topic"] or "",
            private_chat_disabled=bool(row["private_chat_disabled"]),
            blacklisted=bool(row["blacklisted"]),
        )

    def mark_private_chat_disabled(self, customer_id: int, disabled: bool) -> None:
        self.db.conn.execute(
            "UPDATE customers SET private_chat_disabled = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (1 if disabled else 0, customer_id),
        )
        self.db.conn.commit()

    def update_last_interaction(self, customer_id: int, when: datetime) -> None:
        self.db.conn.execute(
            "UPDATE customers SET last_interaction_at = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (when.isoformat(), customer_id),
        )
        self.db.conn.commit()
