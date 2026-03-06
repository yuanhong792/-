from __future__ import annotations

import logging
from pathlib import Path


class BotLogger:
    def __init__(self, log_dir: str = "logs") -> None:
        Path(log_dir).mkdir(parents=True, exist_ok=True)
        self.logger = logging.getLogger("wechat_sales_bot")
        self.logger.setLevel(logging.INFO)
        if not self.logger.handlers:
            fh = logging.FileHandler(Path(log_dir) / "bot.log", encoding="utf-8")
            formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(message)s")
            fh.setFormatter(formatter)
            self.logger.addHandler(fh)

    def info(self, msg: str) -> None:
        self.logger.info(msg)

    def error(self, msg: str) -> None:
        self.logger.error(msg)
