---
sidebar_position: 2
---

# Ask Question

Ask questions about your selected data sources in a deep research session.

## Endpoint

```
POST /v1/research/{id}/ask
```

## Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | The research session ID |

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `question` | string | Yes | Your question in natural language |
| `context` | string | No | Additional context for the AI |
| `format` | string | No | Response format: `text`, `json`, `table` (default: `text`) |

## Example Request

### Simple Question

```bash
curl -X POST https://api.scrapebit.com/v1/research/research_abc123/ask \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is the average price across all competitors?"
  }'
```

### With Context

```bash
curl -X POST https://api.scrapebit.com/v1/research/research_abc123/ask \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Which competitor has the best value proposition?",
    "context": "Consider both price and features. Focus on the enterprise tier."
  }'
```

### Structured Response

```bash
curl -X POST https://api.scrapebit.com/v1/research/research_abc123/ask \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Compare all competitor pricing tiers",
    "format": "table"
  }'
```

## Response

### Text Format

```json
{
  "success": true,
  "data": {
    "question": "What is the average price across all competitors?",
    "answer": "Based on the data from your three competitor sources, the average price for the standard tier is $49.99/month. Competitor A offers the lowest price at $39.99, while Competitor C is the highest at $59.99. Competitor B falls in the middle at $49.99.",
    "sources": [
      {
        "id": "scrape_abc123",
        "url": "https://competitor1.com/pricing",
        "relevance": 0.95
      },
      {
        "id": "scrape_def456",
        "url": "https://competitor2.com/pricing",
        "relevance": 0.92
      }
    ],
    "confidence": 0.89
  },
  "credits_used": 5,
  "credits_remaining": 95
}
```

### Table Format

```json
{
  "success": true,
  "data": {
    "question": "Compare all competitor pricing tiers",
    "answer": {
      "headers": ["Competitor", "Basic", "Pro", "Enterprise"],
      "rows": [
        ["Competitor A", "$19/mo", "$49/mo", "$99/mo"],
        ["Competitor B", "$29/mo", "$59/mo", "$149/mo"],
        ["Competitor C", "$25/mo", "$55/mo", "$129/mo"]
      ]
    },
    "format": "table",
    "sources": [...],
    "confidence": 0.92
  },
  "credits_used": 5,
  "credits_remaining": 90
}
```

### JSON Format

```json
{
  "success": true,
  "data": {
    "question": "List all competitor features",
    "answer": {
      "competitors": [
        {
          "name": "Competitor A",
          "features": ["Feature 1", "Feature 2", "Feature 3"]
        },
        {
          "name": "Competitor B",
          "features": ["Feature 1", "Feature 4", "Feature 5"]
        }
      ]
    },
    "format": "json",
    "sources": [...],
    "confidence": 0.87
  },
  "credits_used": 5,
  "credits_remaining": 85
}
```

## Question Examples

### Analysis Questions

- "What are the main differences between these competitors?"
- "Summarize the key findings from this data"
- "What trends do you see in the pricing data?"

### Comparison Questions

- "Which product has the most features?"
- "Compare the customer support options"
- "How do the shipping policies differ?"

### Extraction Questions

- "List all email addresses mentioned"
- "What are all the product categories?"
- "Extract all dates and deadlines"

### Insight Questions

- "What opportunities exist based on this data?"
- "What are the potential risks I should be aware of?"
- "What recommendations would you make?"

## Error Responses

### Research Not Ready

```json
{
  "success": false,
  "error": {
    "code": "research_not_ready",
    "message": "The research session is still processing. Please wait."
  }
}
```

### Question Too Long

```json
{
  "success": false,
  "error": {
    "code": "question_too_long",
    "message": "Questions must be under 1000 characters"
  }
}
```

## Credits

This endpoint uses **5 credits** per question.
