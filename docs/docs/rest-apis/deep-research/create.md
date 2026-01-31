---
sidebar_position: 1
---

# Create Deep Research

Create a new deep research session to analyze and query your scraped data.

## Endpoint

```
POST /v1/research
```

## Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | A name for this research session |
| `description` | string | No | Description of the research purpose |
| `data_sources` | array | Yes | Array of data source IDs to include |

### Data Sources

You can include any of your scraped data, PDFs, or screenshots as data sources:

```json
{
  "data_sources": [
    "scrape_abc123",
    "scrape_def456",
    "pdf_xyz789"
  ]
}
```

## Example Request

```bash
curl -X POST https://api.scrapebit.com/v1/research \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Competitor Analysis",
    "description": "Research on competitor pricing and features",
    "data_sources": [
      "scrape_abc123",
      "scrape_def456",
      "scrape_ghi789"
    ]
  }'
```

## Response

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
        "url": "https://competitor1.com/pricing"
      },
      {
        "id": "scrape_def456",
        "type": "scrape",
        "url": "https://competitor2.com/pricing"
      },
      {
        "id": "scrape_ghi789",
        "type": "scrape",
        "url": "https://competitor3.com/pricing"
      }
    ],
    "status": "ready",
    "created_at": "2025-01-31T10:30:00Z"
  },
  "credits_used": 0,
  "credits_remaining": 100
}
```

## Processing Status

When you create a research session, the system indexes your data sources. The status field indicates progress:

| Status | Description |
|--------|-------------|
| `processing` | Data sources are being indexed |
| `ready` | Ready to accept questions |
| `error` | An error occurred during processing |

You can poll the research endpoint to check status:

```bash
curl -X GET "https://api.scrapebit.com/v1/research/research_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Maximum Data Sources

- Up to **50 data sources** per research session
- Maximum total content size: **10 MB**

## Use Cases

### Market Research

Combine scraped data from multiple competitor websites:

```json
{
  "name": "Q1 2025 Market Analysis",
  "data_sources": ["scrape_comp1", "scrape_comp2", "scrape_comp3"]
}
```

### Content Analysis

Analyze multiple articles or blog posts:

```json
{
  "name": "Industry Trends",
  "data_sources": ["scrape_article1", "scrape_article2", "scrape_article3"]
}
```

### Price Monitoring

Compare pricing data across time:

```json
{
  "name": "Price History Analysis",
  "data_sources": ["scrape_jan", "scrape_feb", "scrape_mar"]
}
```

## Credits

Creating a research session does **not** consume credits. Credits are only used when asking questions.
