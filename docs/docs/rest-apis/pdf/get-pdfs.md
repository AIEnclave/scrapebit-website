---
sidebar_position: 2
---

# Get PDFs

Retrieve your generated PDF documents.

## List All PDFs

### Endpoint

```
GET /v1/pdf/list
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
curl -X GET "https://api.scrapebit.com/v1/pdf/list?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "pdf_abc123",
      "url": "https://example.com/article",
      "pdf_url": "https://api.scrapebit.com/downloads/pdf_abc123.pdf",
      "file_size": 245678,
      "pages": 3,
      "created_at": "2025-01-31T10:30:00Z",
      "expires_at": "2025-02-07T10:30:00Z"
    },
    {
      "id": "pdf_def456",
      "url": "https://example.com/report",
      "pdf_url": "https://api.scrapebit.com/downloads/pdf_def456.pdf",
      "file_size": 567890,
      "pages": 12,
      "created_at": "2025-01-30T15:45:00Z",
      "expires_at": "2025-02-06T15:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "total_pages": 3
  }
}
```

---

## Get Specific PDF

### Endpoint

```
GET /v1/pdf/{id}
```

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The PDF ID |

### Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/pdf/pdf_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "pdf_abc123",
    "url": "https://example.com/article",
    "pdf_url": "https://api.scrapebit.com/downloads/pdf_abc123.pdf",
    "file_size": 245678,
    "pages": 3,
    "settings": {
      "format": "a4",
      "orientation": "portrait",
      "scale": 1
    },
    "created_at": "2025-01-31T10:30:00Z",
    "expires_at": "2025-02-07T10:30:00Z"
  }
}
```

---

## Delete PDF

### Endpoint

```
DELETE /v1/pdf/{id}
```

### Example Request

```bash
curl -X DELETE "https://api.scrapebit.com/v1/pdf/pdf_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "message": "PDF deleted successfully"
}
```

## PDF Expiration

- PDFs are automatically deleted after **7 days**
- The `expires_at` field indicates when the PDF will be deleted
- Download and store PDFs locally if you need them long-term

## Credits

These endpoints do **not** consume credits. Retrieving PDFs is free.
