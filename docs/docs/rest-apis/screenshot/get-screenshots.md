---
sidebar_position: 2
---

# Get Screenshots

Retrieve your captured screenshots.

## List All Screenshots

### Endpoint

```
GET /v1/screenshot/list
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page (max 100) |
| `sort` | string | `created_at` | Sort field |
| `order` | string | `desc` | Sort order: `asc` or `desc` |

### Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/screenshot/list?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "screenshot_abc123",
      "url": "https://example.com",
      "image_url": "https://api.scrapebit.com/downloads/screenshot_abc123.png",
      "type": "png",
      "width": 1920,
      "height": 1080,
      "file_size": 456789,
      "created_at": "2025-01-31T10:30:00Z",
      "expires_at": "2025-02-07T10:30:00Z"
    },
    {
      "id": "screenshot_def456",
      "url": "https://example.com/page2",
      "image_url": "https://api.scrapebit.com/downloads/screenshot_def456.jpeg",
      "type": "jpeg",
      "width": 1366,
      "height": 768,
      "file_size": 234567,
      "created_at": "2025-01-30T15:45:00Z",
      "expires_at": "2025-02-06T15:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 30,
    "total_pages": 3
  }
}
```

---

## Get Specific Screenshot

### Endpoint

```
GET /v1/screenshot/{id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The screenshot ID |

### Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/screenshot/screenshot_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "screenshot_abc123",
    "url": "https://example.com",
    "image_url": "https://api.scrapebit.com/downloads/screenshot_abc123.png",
    "type": "png",
    "width": 1920,
    "height": 1080,
    "file_size": 456789,
    "settings": {
      "full_page": false,
      "viewport": {
        "width": 1920,
        "height": 1080,
        "device_scale_factor": 1
      }
    },
    "created_at": "2025-01-31T10:30:00Z",
    "expires_at": "2025-02-07T10:30:00Z"
  }
}
```

---

## Delete Screenshot

### Endpoint

```
DELETE /v1/screenshot/{id}
```

### Example Request

```bash
curl -X DELETE "https://api.scrapebit.com/v1/screenshot/screenshot_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "message": "Screenshot deleted successfully"
}
```

## Screenshot Expiration

- Screenshots are automatically deleted after **7 days**
- The `expires_at` field indicates when the screenshot will be deleted
- Download and store screenshots locally if you need them long-term

## Credits

These endpoints do **not** consume credits. Retrieving screenshots is free.
