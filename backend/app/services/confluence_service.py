from typing import Dict, List
import requests
from bs4 import BeautifulSoup
from datetime import datetime

class ConfluenceService:
    def __init__(self, base_url: str, username: str, api_token: str):
        self.base_url = base_url.rstrip('/')
        self.auth = (username, api_token)
        self.session = requests.Session()
        self.session.auth = self.auth

    def get_page_content(self, page_id: str) -> Dict:
        """Get content from a Confluence page without external API dependency"""
        url = f"{self.base_url}/rest/api/content/{page_id}?expand=body.storage"
        response = self.session.get(url)

        if response.status_code != 200:
            raise Exception(f"Failed to fetch Confluence page: {response.status_code}")

        data = response.json()
        html_content = data.get("body", {}).get("storage", {}).get("value", "")

        # Convert HTML to plain text without external dependencies
        soup = BeautifulSoup(html_content, 'html.parser')
        text_content = soup.get_text(separator='\n', strip=True)

        return {
            "content": text_content,
            "title": data.get("title", ""),
            "last_updated": data.get("version", {}).get("when", datetime.now().isoformat())
        }

    def search_pages(self, query: str, limit: int = 10) -> List[Dict]:
        """Search Confluence pages"""
        url = f"{self.base_url}/rest/api/content/search"
        params = {
            "cql": f'text ~ "{query}"',
            "limit": limit
        }

        response = self.session.get(url, params=params)
        if response.status_code != 200:
            raise Exception(f"Failed to search Confluence: {response.status_code}")

        results = response.json().get("results", [])
        return [
            {
                "id": result.get("id"),
                "title": result.get("title"),
                "type": result.get("type"),
                "url": f"{self.base_url}/pages/viewpage.action?pageId={result.get('id')}"
            }
            for result in results
        ]
