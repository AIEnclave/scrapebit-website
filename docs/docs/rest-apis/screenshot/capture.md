---
sidebar_position: 1
---

# Capture Screenshot

Capture a screenshot of any web page.

## Endpoint

```
POST /v1/screenshot/capture
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | The URL to capture |
| `type` | string | No | Image format: `png`, `jpeg`, `webp` (default: `png`) |
| `quality` | integer | No | Image quality 0-100 for jpeg/webp (default: 80) |
| `full_page` | boolean | No | Capture full scrollable page (default: false) |
| `viewport` | object | No | Viewport dimensions |
| `selector` | string | No | CSS selector to capture specific element |
| `wait_for` | string | No | CSS selector to wait for before capture |
| `timeout` | integer | No | Timeout in milliseconds (default: 30000) |
| `delay` | integer | No | Delay before capture in ms (default: 0) |

### Viewport Object

```json
{
  "viewport": {
    "width": 1920,
    "height": 1080,
    "device_scale_factor": 2
  }
}
```

## Example Request

### Basic Screenshot

```bash
curl -X POST https://api.scrapebit.com/v1/screenshot/capture \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com"
  }'
```

### Full Page Screenshot

```bash
curl -X POST https://api.scrapebit.com/v1/screenshot/capture \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/long-page",
    "full_page": true,
    "type": "jpeg",
    "quality": 90
  }'
```

### Element Screenshot

```bash
curl -X POST https://api.scrapebit.com/v1/screenshot/capture \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/dashboard",
    "selector": "#chart-container",
    "wait_for": ".chart-loaded"
  }'
```

### Custom Viewport (Mobile)

```bash
curl -X POST https://api.scrapebit.com/v1/screenshot/capture \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "viewport": {
      "width": 375,
      "height": 812,
      "device_scale_factor": 3
    }
  }'
```

## Response

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
    "created_at": "2025-01-31T10:30:00Z",
    "expires_at": "2025-02-07T10:30:00Z"
  },
  "credits_used": 1,
  "credits_remaining": 98
}
```

## Advanced Options

### Hide Elements

Hide specific elements before capturing:

```json
{
  "url": "https://example.com",
  "hide_selectors": [".cookie-banner", ".popup", "#ads"]
}
```

### Click Before Capture

```json
{
  "url": "https://example.com",
  "click": "#load-more-button",
  "delay": 2000
}
```

### Dark Mode

```json
{
  "url": "https://example.com",
  "dark_mode": true
}
```

## Preset Viewports

| Preset | Width | Height | Scale |
|--------|-------|--------|-------|
| `desktop` | 1920 | 1080 | 1 |
| `laptop` | 1366 | 768 | 1 |
| `tablet` | 768 | 1024 | 2 |
| `mobile` | 375 | 812 | 3 |

Use preset:

```json
{
  "url": "https://example.com",
  "viewport_preset": "mobile"
}
```

## Credits

This endpoint uses **1 credit** per screenshot.
