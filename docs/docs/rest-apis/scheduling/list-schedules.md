---
sidebar_position: 2
---

# List Schedules

Retrieve all your scheduled jobs.

## Endpoint

```
GET /v1/schedules
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page (max 100) |
| `status` | string | - | Filter by status: `active`, `paused`, `completed` |
| `type` | string | - | Filter by type: `scrape`, `pdf`, `screenshot` |

## Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/schedules?status=active" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Response

```json
{
  "success": true,
  "data": [
    {
      "id": "schedule_abc123",
      "name": "Daily Price Check",
      "type": "scrape",
      "url": "https://shop.example.com/product/123",
      "frequency": "daily",
      "time": "09:00",
      "timezone": "America/New_York",
      "status": "active",
      "last_run_at": "2025-01-31T14:00:00Z",
      "next_run_at": "2025-02-01T14:00:00Z",
      "total_runs": 15,
      "created_at": "2025-01-15T10:30:00Z"
    },
    {
      "id": "schedule_def456",
      "name": "Weekly Report",
      "type": "pdf",
      "url": "https://analytics.example.com/report",
      "frequency": "weekly",
      "day_of_week": 1,
      "time": "08:00",
      "timezone": "Europe/London",
      "status": "active",
      "last_run_at": "2025-01-27T08:00:00Z",
      "next_run_at": "2025-02-03T08:00:00Z",
      "total_runs": 4,
      "created_at": "2025-01-01T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "total_pages": 1
  }
}
```

---

## Get Schedule Details

### Endpoint

```
GET /v1/schedules/{id}
```

### Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/schedules/schedule_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "schedule_abc123",
    "name": "Daily Price Check",
    "type": "scrape",
    "url": "https://shop.example.com/product/123",
    "frequency": "daily",
    "time": "09:00",
    "timezone": "America/New_York",
    "config": {
      "extract": {
        "price": "The current product price",
        "in_stock": "Whether the product is available"
      }
    },
    "status": "active",
    "last_run_at": "2025-01-31T14:00:00Z",
    "last_run_status": "success",
    "next_run_at": "2025-02-01T14:00:00Z",
    "total_runs": 15,
    "successful_runs": 14,
    "failed_runs": 1,
    "created_at": "2025-01-15T10:30:00Z"
  }
}
```

---

## Get Schedule Run History

### Endpoint

```
GET /v1/schedules/{id}/runs
```

### Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/schedules/schedule_abc123/runs?limit=5" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "run_xyz789",
      "schedule_id": "schedule_abc123",
      "status": "success",
      "data": {
        "price": "$99.99",
        "in_stock": true
      },
      "credits_used": 1,
      "started_at": "2025-01-31T14:00:00Z",
      "completed_at": "2025-01-31T14:00:05Z"
    },
    {
      "id": "run_xyz788",
      "schedule_id": "schedule_abc123",
      "status": "success",
      "data": {
        "price": "$109.99",
        "in_stock": true
      },
      "credits_used": 1,
      "started_at": "2025-01-30T14:00:00Z",
      "completed_at": "2025-01-30T14:00:04Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 15,
    "total_pages": 3
  }
}
```

---

## Pause/Resume Schedule

### Pause

```bash
curl -X POST "https://api.scrapebit.com/v1/schedules/schedule_abc123/pause" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Resume

```bash
curl -X POST "https://api.scrapebit.com/v1/schedules/schedule_abc123/resume" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Credits

These endpoints do **not** consume credits.
