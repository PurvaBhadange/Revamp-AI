import os
from pathlib import Path
from typing import Optional
from app.core.config import settings


class LocalStorageManager:
    def __init__(self, base_path: Optional[str] = None):
        self.base_path = Path(base_path or settings.STORAGE_PATH).resolve()
        self.base_path.mkdir(parents=True, exist_ok=True)

    def get_path(self, category: str, filename: str) -> str:
        """Returns the full path for a file inside a category directory, ensuring parent exists."""
        dir_path = self.base_path / category
        dir_path.mkdir(parents=True, exist_ok=True)
        return str(dir_path / filename)

    def save_bytes(self, category: str, filename: str, content: bytes) -> str:
        """Saves byte content to a file inside the category directory and returns its full path."""
        file_path = self.get_path(category, filename)
        with open(file_path, "wb") as f:
            f.write(content)
        return file_path

    def save_text(self, category: str, filename: str, content: str) -> str:
        """Saves text content to a file inside the category directory and returns its full path."""
        file_path = self.get_path(category, filename)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        return file_path

    def read_bytes(self, category: str, filename: str) -> bytes:
        """Reads byte content of a file inside the category directory."""
        file_path = self.get_path(category, filename)
        with open(file_path, "rb") as f:
            return f.read()


storage_manager = LocalStorageManager()
