---
title: "Third Party Integrations and PII"
slug: third-party-integrations-and-pii
---

*The information provided in this document is for general informational purposes only. These materials and any recommendations within are not legal, privacy, security, compliance, or business advice. Customers are responsible for obtaining legal, security, privacy, compliance, or business advice from their own lawyer or other professional advisor and should not rely on any recommendations herein.*

## Overview

This document aims to educate **Advanced Compliance customers** about the potential use of personally identifiable information (“PII”) data in various third-party integrations. Our goal is to provide transparency and help customers understand the data that may be collected by third parties as they configure the service to satisfy their legal requirements. Please note that Branch operates under a [shared responsibility model](https://help.branch.io/using-branch/docs/shared-responsibility). Branch is responsible for protecting the data within its environment in accordance with the privacy and security requirements under HIPAA. Customers are responsible for their configuration of the service to meet their legal and security requirements.

## Notice

Customers that want to enable third party integrations through the Engagement and Performance products while leveraging Advanced Compliance will need to review the terms and policies of the integration partner to determine if the integration meets their compliance requirements. Many of the integrations require that PII is made available in plaintext in order for the third-party service to work properly. Customers should consult with their legal team to evaluate third-party data collection and to identify integration partners that align with their legal requirements.

## Integrations

### SANs Integrations

The SAN integrations use callouts to complete an attribution reconciliation. The following integrations use IP Address as a data point to complete an attribution callout to an ad network. While Branch makes these integrations available for Advanced Compliance customers, make note that once enabled, these integrations require IP addresses to complete attribution.

- Meta
- TikTok
- Snap
- Twitter
- Google
- Apple Search
- Oath
- Roku
- Vizio
- LG
- NBCUniversal

### Non-SANs Integrations

The Non-SANs are set up to receive information through Postbacks to learn if there was an attributed event for a campaign. These integrations can be customized by the customer to omit or to include PII data. For example, when working with the ad network, Impact, the integration can inform if the Impact campaign successfully drove an install, but the query parameters may include PII, such as a device ID.

### Custom Ad Network Integrations

The Custom Ad Networks are set up to receive information through postbacks to be told if there was an attributed event for a campaign. These integrations can be customized by the customers to include or omit PII data.

### Data Integrations

The data integrations, specifically outbound, have specific parameters set for each integration. Some of these parameters may require PII to make an integration work properly. For example, Braze needs to have the IDFA available to complete the integration successfully.

### Custom Webhook Integrations

The custom webhook integrations are fully set up by the customer for specific events to be sent to a destination of their choice. Dependent on what events the customer (eg. INSTALL or CLICK) chooses there could be PII.

### Email Integrations

Integrated email partners have different scenarios to resolve a click after a link is clicked. Some ESP integrations receive a callout to resolve the click, while others leverage an underlying Branch Link. However, these integrations typically do not send additional PII data for resolving this information.