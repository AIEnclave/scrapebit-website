---
sidebar_position: 1
---

# Create Schedule

Create an automated, recurring scrape schedule.

## Endpoint

```
POST /v1/schedules
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | A name for this schedule |
| `type` | string | Yes | Schedule type: `scrape`, `pdf`, `screenshot` |
| `url` | string | Yes | The URL to process |
| `frequency` | string | Yes | How often to run: `hourly`, `daily`, `weekly`, `monthly` |
| `time` | string | No | Time to run (24h format, e.g., "09:00") |
| `day_of_week` | integer | No | Day for weekly schedules (0=Sunday, 6=Saturday) |
| `day_of_month` | integer | No | Day for monthly schedules (1-28) |
| `timezone` | string | No | Timezone (default: "UTC") |
| `config` | object | No | Type-specific configuration |

### Config Object for Scrape

```json
{
  "config": {
    "extract": {
      "title": "The page title",
      "price": "The current price"
    },
    "pagination": {
      "next_button_selector": ".next-page",
      "max_pages": 10
    }
  }
}
```

### Config Object for PDF

```json
{
  "config": {
    "format": "a4",
    "orientation": "portrait"
  }
}
```

### Config Object for Screenshot

```json
{
  "config": {
    "full_page": true,
    "type": "png"
  }
}
```

## Example Requests

### Daily Scrape Schedule

```bash
curl -X POST https://api.scrapebit.com/v1/schedules \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
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
    }
  }'
```

### Hourly Screenshot

```bash
curl -X POST https://api.scrapebit.com/v1/schedules \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dashboard Monitor",
    "type": "screenshot",
    "url": "https://dashboard.example.com",
    "frequency": "hourly",
    "config": {
      "full_page": false,
      "viewport": {
        "width": 1920,
        "height": 1080
      }
    }
  }'
```

### Weekly PDF Report

```bash
curl -X POST https://api.scrapebit.com/v1/schedules \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Weekly Report",
    "type": "pdf",
    "url": "https://analytics.example.com/weekly-report",
    "frequency": "weekly",
    "day_of_week": 1,
    "time": "08:00",
    "timezone": "Europe/London",
    "config": {
      "format": "a4",
      "print_background": true
    }
  }'
```

### Scrape with Pagination

For content that spans multiple pages, provide a `next_button_selector`:

```bash
curl -X POST https://api.scrapebit.com/v1/schedules \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Catalog Scrape",
    "type": "scrape",
    "url": "https://shop.example.com/products",
    "frequency": "daily",
    "time": "02:00",
    "config": {
      "extract": {
        "products": "All product names and prices"
      },
      "pagination": {
        "next_button_selector": "button.load-more",
        "max_pages": 20
      }
    }
  }'
```

## Response

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
    "next_run_at": "2025-02-01T14:00:00Z",
    "created_at": "2025-01-31T10:30:00Z"
  }
}
```

## Webhook Notifications

Receive notifications when scheduled jobs complete:

```json
{
  "name": "Price Monitor",
  "type": "scrape",
  "url": "https://example.com",
  "frequency": "daily",
  "webhook_url": "https://your-server.com/webhook",
  "config": {
    "extract": { "price": "Current price" }
  }
}
```

Webhook payload:

```json
{
  "event": "schedule.completed",
  "schedule_id": "schedule_abc123",
  "run_id": "run_xyz789",
  "data": {
    "price": "$99.99"
  },
  "completed_at": "2025-01-31T09:00:05Z"
}
```

## Credits

Scheduled jobs consume credits when they run:
- **Scrape**: 1 credit per page
- **PDF**: 2 credits
- **Screenshot**: 1 credit
