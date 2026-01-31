---
sidebar_position: 2
---

# Get Usage

Retrieve your API usage statistics.

## Endpoint

```
GET /v1/user/usage
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `period` | string | `month` | Time period: `day`, `week`, `month`, `year` |
| `from` | string | - | Start date (ISO 8601) |
| `to` | string | - | End date (ISO 8601) |

## Example Request

### Current Month Usage

```bash
curl -X GET "https://api.scrapebit.com/v1/user/usage" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Custom Date Range

```bash
curl -X GET "https://api.scrapebit.com/v1/user/usage?from=2025-01-01&to=2025-01-31" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Response

```json
{
  "success": true,
  "data": {
    "period": {
      "from": "2025-01-01T00:00:00Z",
      "to": "2025-01-31T23:59:59Z"
    },
    "summary": {
      "total_credits_used": 450,
      "total_requests": 380,
      "successful_requests": 375,
      "failed_requests": 5
    },
    "by_endpoint": {
      "content/scrape": {
        "requests": 200,
        "credits_used": 200
      },
      "content/extract": {
        "requests": 100,
        "credits_used": 100
      },
      "pdf/generate": {
        "requests": 25,
        "credits_used": 50
      },
      "screenshot/capture": {
        "requests": 30,
        "credits_used": 30
      },
      "research/ask": {
        "requests": 14,
        "credits_used": 70
      }
    },
    "daily_breakdown": [
      {
        "date": "2025-01-31",
        "requests": 45,
        "credits_used": 52
      },
      {
        "date": "2025-01-30",
        "requests": 38,
        "credits_used": 44
      }
    ]
  }
}
```

## Response Fields

### Summary

| Field | Description |
|-------|-------------|
| `total_credits_used` | Total credits consumed in the period |
| `total_requests` | Total API requests made |
| `successful_requests` | Requests that completed successfully |
| `failed_requests` | Requests that failed |

### By Endpoint

Breakdown of usage per API endpoint, showing:
- Number of requests
- Credits consumed

### Daily Breakdown

Day-by-day usage statistics for detailed analysis.

## Use Cases

### Monitor Daily Usage

```bash
curl -X GET "https://api.scrapebit.com/v1/user/usage?period=day" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Weekly Trends

```bash
curl -X GET "https://api.scrapebit.com/v1/user/usage?period=week" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Annual Summary

```bash
curl -X GET "https://api.scrapebit.com/v1/user/usage?period=year" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Credits

This endpoint does **not** consume credits.
