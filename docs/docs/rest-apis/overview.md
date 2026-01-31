---
sidebar_position: 1
---

# REST APIs Overview

Scrapebit provides a comprehensive set of REST APIs for web scraping, data extraction, and automation. All APIs follow RESTful conventions and return JSON responses.

## Base URL

```
https://api.scrapebit.com/v1
```

## Available APIs

### Content API
Extract structured data from any webpage using AI-powered extraction.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/content/scrape` | POST | Scrape and extract data from a URL |
| `/content/extract` | POST | Extract specific data with AI prompts |
| `/content/data` | GET | Retrieve previously scraped data |
| `/content/data/{id}` | GET | Get specific scraped data by ID |

### PDF API
Generate PDF documents from web pages.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/pdf/generate` | POST | Generate a PDF from a URL |
| `/pdf/list` | GET | List all generated PDFs |
| `/pdf/{id}` | GET | Get a specific PDF |
| `/pdf/{id}` | DELETE | Delete a PDF |

### Screenshot API
Capture screenshots of web pages.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/screenshot/capture` | POST | Capture a screenshot |
| `/screenshot/list` | GET | List all screenshots |
| `/screenshot/{id}` | GET | Get a specific screenshot |

### Scheduling API
Set up automated, recurring scrapes.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/schedules` | POST | Create a new schedule |
| `/schedules` | GET | List all schedules |
| `/schedules/{id}` | GET | Get schedule details |
| `/schedules/{id}` | DELETE | Delete a schedule |

### Deep Research API
Conduct AI-powered research on your data.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/research` | POST | Create a deep research session |
| `/research/{id}/ask` | POST | Ask questions about your data |
| `/research` | GET | List all research sessions |
| `/research/{id}` | DELETE | Delete a research session |

### User API
Manage your account and API access.

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/user/profile` | GET | Get user profile |
| `/user/usage` | GET | Get usage statistics |
| `/user/api-key/regenerate` | POST | Regenerate API key |

## Request Format

All POST requests should include:

```bash
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

### Example Request

```bash
curl -X POST https://api.scrapebit.com/v1/content/scrape \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com"
  }'
```

## Response Format

All responses follow this structure:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "credits_used": 1,
  "credits_remaining": 99
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "error_code",
    "message": "Human readable error message"
  }
}
```

## Pagination

List endpoints support pagination:

```bash
GET /v1/content/data?page=1&limit=20
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page (max 100) |

### Paginated Response

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - Invalid API key |
| `403` | Forbidden - Insufficient credits |
| `404` | Not Found |
| `429` | Rate Limit Exceeded |
| `500` | Internal Server Error |
