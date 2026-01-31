---
sidebar_position: 1
slug: /
---

# Introduction

Welcome to the **Scrapebit API Documentation**. Scrapebit provides a powerful, AI-powered web scraping API that allows you to extract data from any website programmatically.

## What is Scrapebit?

Scrapebit is an AI-powered web scraping platform that makes data extraction simple. Our API allows you to:

- **Extract structured data** from any webpage using AI
- **Generate PDFs** from web pages
- **Capture screenshots** of websites
- **Schedule recurring scrapes** for automated data collection
- **Conduct deep research** by asking questions about scraped data

## Quick Start

### 1. Get your API Key

First, you'll need an API key. You can generate one from your [Scrapebit dashboard](https://scrapebit.com/dashboard/settings).

### 2. Make your first API call

```bash
curl -X POST https://api.scrapebit.com/v1/content/scrape \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "extract": {
      "title": "The page title",
      "description": "The meta description"
    }
  }'
```

### 3. Get your data

```json
{
  "success": true,
  "data": {
    "title": "Example Domain",
    "description": "This domain is for use in illustrative examples..."
  },
  "credits_used": 1,
  "credits_remaining": 99
}
```

## Base URL

All API requests should be made to:

```
https://api.scrapebit.com/v1
```

## Features

| Feature | Description |
|---------|-------------|
| **AI Extraction** | Use natural language to describe what data you want |
| **PDF Generation** | Convert any webpage to a clean PDF |
| **Screenshots** | Capture full-page or element screenshots |
| **Scheduling** | Set up recurring scrapes (hourly, daily, weekly) |
| **Deep Research** | Ask questions about your scraped data |
| **Pagination** | Automatically handle multi-page content |

## Credits System

Scrapebit uses a credit-based system:

- **1 credit** = 1 page scrape
- **2 credits** = PDF generation
- **1 credit** = Screenshot capture
- **5 credits** = Deep research query

Credits never expire and can be purchased from the [pricing page](https://scrapebit.com/pricing).

## Need Help?

- Check our [API Reference](/category/rest-apis) for detailed endpoint documentation
- Visit our [Support page](https://scrapebit.com/support) for assistance
- Email us at [support@scrapebit.com](mailto:support@scrapebit.com)
