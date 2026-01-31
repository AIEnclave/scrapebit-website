---
sidebar_position: 1
---

# Scrape URL

Scrape a webpage and extract content using AI.

## Endpoint

```
POST /v1/content/scrape
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | The URL to scrape |
| `extract` | object | No | Fields to extract with AI descriptions |
| `wait_for` | string | No | CSS selector to wait for before scraping |
| `timeout` | integer | No | Timeout in milliseconds (default: 30000) |
| `javascript` | boolean | No | Execute JavaScript (default: true) |
| `proxy` | boolean | No | Use rotating proxy (default: false) |

### Extract Object

Define the fields you want to extract using natural language:

```json
{
  "extract": {
    "title": "The main title of the page",
    "price": "The product price including currency",
    "description": "A brief product description",
    "images": "All product image URLs as an array"
  }
}
```

## Example Request

```bash
curl -X POST https://api.scrapebit.com/v1/content/scrape \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example-shop.com/product/123",
    "extract": {
      "title": "The product name",
      "price": "The price with currency symbol",
      "rating": "The average rating out of 5",
      "reviews_count": "Number of reviews",
      "in_stock": "Whether the item is in stock (true/false)"
    },
    "wait_for": ".product-details",
    "timeout": 15000
  }'
```

## Response

```json
{
  "success": true,
  "data": {
    "id": "scrape_abc123",
    "url": "https://example-shop.com/product/123",
    "extracted": {
      "title": "Premium Wireless Headphones",
      "price": "$299.99",
      "rating": "4.5",
      "reviews_count": "1,234",
      "in_stock": true
    },
    "raw_html": "<!DOCTYPE html>...",
    "scraped_at": "2025-01-31T10:30:00Z"
  },
  "credits_used": 1,
  "credits_remaining": 99
}
```

## Advanced Options

### Pagination Support

For multi-page content, provide a next button selector:

```json
{
  "url": "https://example.com/products",
  "extract": {
    "products": "List of all product names"
  },
  "pagination": {
    "next_button_selector": ".pagination .next",
    "max_pages": 5
  }
}
```

### Custom Headers

```json
{
  "url": "https://example.com",
  "headers": {
    "Accept-Language": "en-US",
    "Cookie": "session=abc123"
  }
}
```

### Wait Conditions

```json
{
  "url": "https://example.com",
  "wait_for": "#content-loaded",
  "wait_timeout": 10000
}
```

## Error Responses

### Invalid URL

```json
{
  "success": false,
  "error": {
    "code": "invalid_url",
    "message": "The provided URL is not valid"
  }
}
```

### Timeout

```json
{
  "success": false,
  "error": {
    "code": "timeout",
    "message": "The page took too long to load"
  }
}
```

### Blocked

```json
{
  "success": false,
  "error": {
    "code": "blocked",
    "message": "Access to this page was blocked. Try enabling proxy."
  }
}
```

## Credits

This endpoint uses **1 credit** per page scraped. Additional pages from pagination each use 1 credit.
