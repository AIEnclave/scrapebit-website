---
sidebar_position: 2
---

# Python SDK

The official Scrapebit SDK for Python.

## Installation

```bash
pip install scrapebit
```

## Quick Start

```python
from scrapebit import Scrapebit

client = Scrapebit(api_key="YOUR_API_KEY")

# Scrape a webpage
result = client.content.scrape(
    url="https://example.com",
    extract={
        "title": "The page title",
        "description": "The meta description"
    }
)

print(result.data)
```

## Configuration

```python
client = Scrapebit(
    api_key="YOUR_API_KEY",
    base_url="https://api.scrapebit.com/v1",  # Optional
    timeout=30,  # Request timeout in seconds
    max_retries=3  # Number of retries on failure
)
```

## Content API

### Scrape URL

```python
result = client.content.scrape(
    url="https://example.com/products",
    extract={
        "products": "List of all product names and prices"
    },
    pagination={
        "next_button_selector": ".load-more",
        "max_pages": 5
    }
)
```

### Extract Data

```python
result = client.content.extract(
    url="https://example.com/team",
    prompt="Extract all team members with names and roles"
)
```

### Get Scraped Data

```python
# List all
data_list = client.content.list(page=1, limit=20)

# Get specific
data = client.content.get("scrape_abc123")

# Delete
client.content.delete("scrape_abc123")
```

## PDF API

### Generate PDF

```python
pdf = client.pdf.generate(
    url="https://example.com/report",
    format="a4",
    orientation="portrait"
)

print(pdf.data.pdf_url)
```

### List PDFs

```python
pdfs = client.pdf.list()
```

## Screenshot API

### Capture Screenshot

```python
screenshot = client.screenshot.capture(
    url="https://example.com",
    full_page=True,
    type="png"
)

print(screenshot.data.image_url)
```

### Mobile Screenshot

```python
screenshot = client.screenshot.capture(
    url="https://example.com",
    viewport_preset="mobile"
)
```

## Scheduling API

### Create Schedule

```python
schedule = client.schedules.create(
    name="Daily Price Check",
    type="scrape",
    url="https://shop.example.com/product",
    frequency="daily",
    time="09:00",
    timezone="America/New_York",
    config={
        "extract": {
            "price": "Current product price"
        }
    }
)
```

### Manage Schedules

```python
# List all
schedules = client.schedules.list()

# Pause
client.schedules.pause("schedule_abc123")

# Resume
client.schedules.resume("schedule_abc123")

# Delete
client.schedules.delete("schedule_abc123")
```

## Deep Research API

### Create Research Session

```python
research = client.research.create(
    name="Competitor Analysis",
    data_sources=["scrape_abc123", "scrape_def456"]
)
```

### Ask Questions

```python
answer = client.research.ask(
    research_id="research_abc123",
    question="What are the main differences between competitors?"
)

print(answer.data.answer)
```

## User API

### Get Profile

```python
profile = client.user.profile()
print(profile.data.credits.balance)
```

### Get Usage

```python
usage = client.user.usage(period="month")
print(usage.data.summary.total_credits_used)
```

## Error Handling

```python
from scrapebit import Scrapebit, ScrapebitError

try:
    result = client.content.scrape(url="https://example.com")
except ScrapebitError as e:
    print(f"API Error: {e.code} - {e.message}")

    if e.code == "insufficient_credits":
        # Handle insufficient credits
        pass
```

## Async Support

```python
import asyncio
from scrapebit import AsyncScrapebit

async def main():
    client = AsyncScrapebit(api_key="YOUR_API_KEY")

    result = await client.content.scrape(
        url="https://example.com"
    )

    print(result.data)

asyncio.run(main())
```

## Examples

### Price Monitoring

```python
def monitor_price(product_url: str) -> dict:
    result = client.content.scrape(
        url=product_url,
        extract={
            "price": "The current price",
            "in_stock": "Whether the item is in stock"
        }
    )

    return {
        "price": result.data.extracted["price"],
        "in_stock": result.data.extracted["in_stock"],
        "scraped_at": datetime.now()
    }
```

### Bulk Scraping

```python
from concurrent.futures import ThreadPoolExecutor

def bulk_scrape(urls: list) -> list:
    with ThreadPoolExecutor(max_workers=5) as executor:
        results = list(executor.map(
            lambda url: client.content.scrape(url=url),
            urls
        ))
    return results
```

### Pandas Integration

```python
import pandas as pd

# Scrape data
result = client.content.extract(
    url="https://example.com/products",
    prompt="Extract all products with name, price, and rating",
    format="json"
)

# Convert to DataFrame
df = pd.DataFrame(result.data.extracted)
print(df.head())

# Export to CSV
df.to_csv("products.csv", index=False)
```

### Data Pipeline

```python
def scrape_and_store(url: str, output_file: str):
    # Scrape
    result = client.content.scrape(
        url=url,
        extract={"data": "All relevant data"}
    )

    # Process
    data = result.data.extracted

    # Store
    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)

    return output_file
```
