from __future__ import annotations

from wechat_sales_bot.storage.repositories import CustomerRepository


class CustomerManager:
    def __init__(self, repo: CustomerRepository) -> None:
        self.repo = repo

    def reactivate_if_customer_spoke(self, customer_id: int) -> None:
        customer = self.repo.get_customer(customer_id)
        if customer and customer.private_chat_disabled:
            self.repo.mark_private_chat_disabled(customer_id, False)
