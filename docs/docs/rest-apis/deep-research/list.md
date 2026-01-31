---
sidebar_position: 3
---

# List Research Sessions

Retrieve all your deep research sessions.

## Endpoint

```
GET /v1/research
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `limit` | integer | 20 | Items per page (max 100) |
| `status` | string | - | Filter by status: `processing`, `ready`, `error` |

## Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/research?status=ready" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Response

```json
{
  "success": true,
  "data": [
    {
      "id": "research_abc123",
      "name": "Competitor Analysis",
      "description": "Research on competitor pricing and features",
      "data_sources_count": 3,
      "questions_asked": 12,
      "status": "ready",
      "created_at": "2025-01-31T10:30:00Z",
      "last_question_at": "2025-01-31T15:45:00Z"
    },
    {
      "id": "research_def456",
      "name": "Market Trends Q1",
      "description": "Industry trends analysis",
      "data_sources_count": 5,
      "questions_asked": 8,
      "status": "ready",
      "created_at": "2025-01-28T09:00:00Z",
      "last_question_at": "2025-01-30T11:20:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 2,
    "total_pages": 1
  }
}
```

---

## Get Research Details

### Endpoint

```
GET /v1/research/{id}
```

### Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/research/research_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "research_abc123",
    "name": "Competitor Analysis",
    "description": "Research on competitor pricing and features",
    "data_sources": [
      {
        "id": "scrape_abc123",
        "type": "scrape",
        "url": "https://competitor1.com/pricing",
        "scraped_at": "2025-01-30T10:00:00Z"
      },
      {
        "id": "scrape_def456",
        "type": "scrape",
        "url": "https://competitor2.com/pricing",
        "scraped_at": "2025-01-30T10:05:00Z"
      }
    ],
    "questions_asked": 12,
    "total_credits_used": 60,
    "status": "ready",
    "created_at": "2025-01-31T10:30:00Z",
    "last_question_at": "2025-01-31T15:45:00Z"
  }
}
```

---

## Get Question History

Retrieve all questions asked in a research session.

### Endpoint

```
GET /v1/research/{id}/questions
```

### Example Request

```bash
curl -X GET "https://api.scrapebit.com/v1/research/research_abc123/questions" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "question_xyz789",
      "question": "What is the average price across all competitors?",
      "answer": "Based on the data...",
      "confidence": 0.89,
      "asked_at": "2025-01-31T15:45:00Z"
    },
    {
      "id": "question_xyz788",
      "question": "Which competitor has the most features?",
      "answer": "Competitor B offers...",
      "confidence": 0.92,
      "asked_at": "2025-01-31T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "total_pages": 1
  }
}
```

## Credits

These endpoints do **not** consume credits.
