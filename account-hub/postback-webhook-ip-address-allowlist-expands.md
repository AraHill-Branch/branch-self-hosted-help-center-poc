---
title: "Postback and Webhook IP Address Allowlist Expands"
slug: postback-webhook-ip-address-allowlist-expands
---

## Overview

Branch is updating our fleet of available IP addresses in order to allow for greater flexibility, efficiency, and resiliency in our engineering systems.

We will begin using the new IP addresses **beginning on August 1st, 2025**.

## Who is impacted

This update impacts you **if you use webhooks or Postbacks**, and your organization maintains specific allowlists that restrict what traffic can reach your servers.

If this is the case, you will **need to update your network setting configurations** to continue allowing all traffic from Branch through.

## What to do next

You must update your allowlist to add the new IP addresses by August 1st, 2025.

You will also need to **delete the old list by September 30th, 2025**.

## IP address allowlist

View the old IP address allowlist against the new one using this table.

| **Old IP address allowlist** | **New IP address allowlist** |
| --- | --- |
| 52.9.159.121/32 | 52.43.119.253/32 |
| 52.9.176.205/32 | 100.21.145.61/32 |
| 52.9.188.221/32 | 35.160.5.60/32 |
| 52.9.188.236/32 | 35.163.128.27/32 |
| 52.52.143.205 | 54.241.169.87/32 |
| 52.53.45.79 | 44.229.177.148/32 |
| 52.8.3.171 | 35.167.148.222/32 |
| 54.176.26.254 | 44.231.103.124/32 |
| 52.8.85.213 | 44.237.121.167/32 |
| 54.153.26.149 | 44.238.95.201/32 |
| 54.153.41.111 | 52.52.236.153/32 |
| 54.176.133.14 | 44.247.175.42/32 |
| 54.193.10.161 | 44.247.58.38/32 |
|  | 52.33.75.0/32 |
|  | 52.34.127.49/32 |
|  | 54.177.16.103/32 |
|  | 54.213.17.93/32 |
|  | 184.169.196.16/32 |
|  | 35.161.135.86/32 |
|  | 44.230.175.24/32 |
|  | 52.27.172.117/32 |
|  | 35.160.133.187/32 |

## Cloud configuration

If you have an AWS or GCP account, you may need to configure a security group or firewall policy for this change. Visit the guides below for examples:

- [Webhooks cloud configuration](https://help.branch.io/docs/webhooks#allowlist-webhook-ip-addresses)
- [Postbacks cloud configuration](https://help.branch.io/docs/basic-postback-configuration#allowlist-postback-ip-addresses)

## Additional resources

Visit our detailed guides to learn more about webhooks and postbacks in general:

- [Webhooks](webhooks.md)
- [Postbacks](postbacks-index.md)