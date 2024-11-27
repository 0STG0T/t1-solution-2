from typing import Dict, List
import requests
from datetime import datetime

class NotionService:
    def __init__(self, auth_token: str):
        self.base_url = "https://api.notion.com/v1"
        self.headers = {
            "Authorization": f"Bearer {auth_token}",
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json"
        }

    def get_page_content(self, page_id: str) -> Dict:
        """Get content from a Notion page without external API dependency"""
        response = requests.get(
            f"{self.base_url}/blocks/{page_id}/children",
            headers=self.headers
        )
        if response.status_code != 200:
            raise Exception(f"Failed to fetch Notion page: {response.status_code}")

        blocks = response.json().get("results", [])
        return self._process_blocks(blocks)

    def _process_blocks(self, blocks: List[Dict]) -> Dict:
        """Process Notion blocks into plain text"""
        content = []
        for block in blocks:
            block_type = block.get("type")
            if block_type in ["paragraph", "heading_1", "heading_2", "heading_3"]:
                text = self._extract_text_from_block(block[block_type])
                if text:
                    content.append(text)

        return {
            "content": "\n".join(content),
            "last_edited": datetime.now().isoformat()
        }

    def _extract_text_from_block(self, block_content: Dict) -> str:
        """Extract text from a Notion block"""
        if not block_content.get("rich_text"):
            return ""

        return " ".join(
            text.get("plain_text", "")
            for text in block_content["rich_text"]
        )
