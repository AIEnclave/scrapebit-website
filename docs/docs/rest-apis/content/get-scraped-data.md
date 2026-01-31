---
sidebar_position: 3
---

# Get Scraped Data

Retrieve your previously scraped data.

## List All Scraped Data

### Endpoint

```
GET /v1/content/data
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page (max 100) |
| `sort` | string | `created_at` | Sort field |
| `order` | string | `desc` | Sort order: `asc` or `desc` |
| `url` | string | - | Filter by URL (partial match) |
| `from` | string | - | Filter by date (ISO 8601) |
| `to` | string | - | Filter by date (ISO 8601) |

### Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/content/data?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "scrape_abc123",
      "url": "https://example.com/page1",
      "extracted": {
        "title": "Example Page",
        "content": "..."
      },
      "created_at": "2025-01-31T10:30:00Z"
    },
    {
      "id": "scrape_def456",
      "url": "https://example.com/page2",
      "extracted": {
        "title": "Another Page",
        "content": "..."
      },
      "created_at": "2025-01-31T09:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "total_pages": 5
  }
}
```

---

## Get Specific Scraped Data

### Endpoint

```
GET /v1/content/data/{id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The scrape ID |

### Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/content/data/scrape_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "scrape_abc123",
    "url": "https://example.com/page1",
    "extracted": {
      "title": "Example Page",
      "description": "This is the page description",
      "content": "Full page content...",
      "links": [
        "https://example.com/link1",
        "https://example.com/link2"
      ]
    },
    "raw_html": "<!DOCTYPE html>...",
    "metadata": {
      "status_code": 200,
      "content_type": "text/html",
      "load_time_ms": 1234
    },
    "created_at": "2025-01-31T10:30:00Z"
  }
}
```

---

## Delete Scraped Data

### Endpoint

```
DELETE /v1/content/data/{id}
```

### Example Request

```bash
curl -X DELETE "https://api.scrapebit.com/v1/content/data/scrape_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "message": "Scraped data deleted successfully"
}
```

## Error Responses

### Not Found

```json
{
  "success": false,
  "error": {
    "code": "not_found",
    "message": "Scraped data with ID 'scrape_abc123' not found"
  }
}
```

## Credits

These endpoints do **not** consume credits. Retrieving data is free.
