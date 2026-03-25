---
title: "Scheduled Log Exports: GCP Storage Expansion"
slug: scheduled-log-exports-gcp-storage-expansion
---

Branch is adding GCP as a cloud service provider you can select when deciding where to send your Scheduled Log Exports API data. 🌩️

## Overview

Branch's Scheduled Log Exports API lets you schedule daily or hourly exports of your log-level Branch data. You can choose to get an email with this data, store the data in Branch's AWS S3 buckets, or store the data with your own cloud provider.

Previously, if you chose to store your data with your own cloud provider, you could only do so with AWS.

However, Branch is happy to announce that it is now possible to store your data with another one of the industry's biggest players: GCP!

## API Access

Access to the Scheduled Log Exports API is **restricted to Enterprise accounts**. Please contact your Branch Account Manager to confirm if your account is eligible for enablement.

## Cloud Configuration

Before exporting your Branch data to GCP, you will first need to properly configure your cloud account so that the data has a place to land.

For steps on how to configure your GCP account to work with the Scheduled Log Exports API, view Branch's [cloud setup guide](scheduled-log-exports-cloud-setup.md).

## API Usage

Pointing the Scheduled Log Exports API to your GCP account happens during the subscription creation call.

A subscription is a single report (which includes information such as data source, fields, and filters) that is set up to be exported over and over at a regular cadence.

To create a subscription, [send a POST request](scheduled-log-exports-api.md#create-new-subscription) to the `/scheduled-exports/logs/subscribe` endpoint.

Make sure to set `destination.subscription_type` to `cloud` and `destination.cloud` to `gcs`.

You will also need to set:

1. `destination.resource_access_id`: the full service account name, which looks like an email address  
    For example: `branch-sle-service-acct@your-sle-project.iam.gserviceaccount.com`
2. `destination.bucket`: the name of the GCP bucket  
    For `/buckets/my-branch-bucket/objects/branch/important_reports/` this would be `my-branch-bucket`
3. `destination.prefix`: the prefix path for the bucket  
    For `/buckets/my-branch-bucket/objects/branch/important_reports/` this would be `branch/important_reports`

#### Example Subscription Creation Request

This example sets the data export's destination to GCP:

```
curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' \
-H 'access-token: api_app_99999999999999999999999999999999' -d '{
  "report": {
    "cadence": "hourly",
    "response_format": "csv",
    "response_format_compression": "gz",
    "report_type": "eo_install",
    "report_fields": [
      "id",
      "timestamp",
      "user_data_os",
      "user_data_idfa",
      "user_data_aaid",
      "user_data_idfv"
    ],
    "filter": [
      "eq",
      "attributed",
      "true"
    ]
  },
  "destination": {
    "subscription_type": "cloud",
    "cloud": "gcs",
    "resource_access_id": "branch-sle-service-acct@your-sle-project.iam.gserviceaccount.com",
    "bucket": "my-branch-bucket",
    "prefix": "branch/important_reports"
  }
}' 'https://api2.branch.io/scheduled-exports/logs/subscribe?app_id=123456789009876543'
```

## Learn More

For all the details about the Scheduled Log Exports API, visit our reference [guide](scheduled-log-exports-api.md).