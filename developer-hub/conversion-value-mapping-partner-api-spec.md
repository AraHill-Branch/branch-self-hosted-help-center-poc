---
title: "Conversion Value Mapping Partner API Spec"
slug: conversion-value-mapping-partner-api-spec
---

## Overview

SKAdNetwork enabled partners must hit Branch's Conversion Value Mapping Partner API in order to fetch mutual customer value mappings with multiple conversion windows.

## Endpoint

Partners should use the following endpoint for Branch's Conversion Value Mapping Partner API:

```
http://api2.branch.io/v3/partners/<partner_3P>/conversion-value-mappings?app_id=<iTunesId>
```

Please note that the `/v3/partners/` endpoint will work for SKAN 4.0 as well as SKAN 3.0 and below.

## Schema

When making a request to Branch's Partner API, the following schema should be used:

```
{
  "app-id": <iTunesId> ,
  "update": "<yyyy-mm-dd hh:mm:ss.sss>",
  "mapping": {
    "postback-sequence-index-0": [{
        "conversion-value": "<0-63 or low, medium, high>",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "<event_name>"
            ]
          },
          "locked": <true/false>
        }]
      },
      {
        "conversion-value": "<0-63 or low, medium, high>",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "<event_name>"
            ],
            "event_data.revenue": [
              "between",
              <integer>, 
              <integer>
            ]
          },
          "locked": <true/false>
        }]
      }
    ],
    "postback-sequence-index-1": [{
        "conversion-value": "<low, medium, high>",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "<event_name>"
            ]
          },
          "locked": <true/false>
        }]
      },
      {
        "conversion-value": "<low, medium, high>",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "<event_name>"
            ],
            "event_data.revenue": [
              "between",
              <integer>, 
              <integer>
            ]
          },
          "locked": <true/false>
        }]
      }
    ],
    "postback-sequence-index-2": [{
        "conversion-value": "<low, medium, high>",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "<event_name>"
            ]
          },
          "locked": <true/false>
        }]
      },
      {
        "conversion-value": "<low, medium, high>",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "<event_name>"
            ],
            "event_data.revenue": [
              "between", 
              <integer>, 
              <integer>
            ]
          },
          "locked": <true/false>
        }]
      }
    ]
  }
}
```

## Example

The following is an example of a well-formatted request made to the Branch Partner API:

```
{
  "app-id": 1667996582,
  "update": "2023-09-26 16:04:34.607",
  "mapping": {
    "postback-sequence-index-0": [{
        "conversion-value": "0",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "MOBILE_APP_INSTALL"
            ]
          },
          "locked": false
        }]
      },
      {
        "conversion-value": "1",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "StartTrial"
            ]
          },
          "locked": true
        }]
      },
      {
        "conversion-value": "2",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "StartTrial"
            ]
          },
          "locked": true
        }]
      },
      {
        "conversion-value": "3",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "fb_mobile_purchase"
            ],
            "event_data.revenue": [
              "between",
              0,
              100
            ]
          },
          "locked": true
        }]
      },
      {
        "conversion-value": "low",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "MOBILE_APP_INSTALL"
            ]
          },
          "locked": false
        }]
      },
      {
        "conversion-value": "high",
        "conversion-event": [{
            "values": {
              "name": [
                "eq",
                "StartTrial"
              ]
            },
            "locked": true
          },
          {
            "values": {
              "name": [
                "eq",
                "StartTrial"
              ]
            },
            "locked": true
          },
          {
            "values": {
              "name": [
                "eq",
                "fb_mobile_purchase"
              ],
              "event_data.revenue": [
                "between",
                0,
                100
              ]
            },
            "locked": true
          }
        ]
      }
    ],
    "postback-sequence-index-1": [{
        "conversion-value": "low",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "MOBILE_APP_INSTALL"
            ]
          },
          "locked": false
        }]
      },
      {
        "conversion-value": "high",
        "conversion-event": [{
            "values": {
              "name": [
                "eq",
                "StartTrial"
              ]
            },
            "locked": true
          },
          {
            "values": {
              "name": [
                "eq",
                "StartTrial"
              ]
            },
            "locked": true
          },
          {
            "values": {
              "name": [
                "eq",
                "fb_mobile_purchase"
              ],
              "event_data.revenue": [
                "between",
                0,
                100
              ]
            },
            "locked": true
          }
        ]
      }
    ],
    "postback-sequence-index-2": [{
        "conversion-value": "low",
        "conversion-event": [{
          "values": {
            "name": [
              "eq",
              "MOBILE_APP_INSTALL"
            ]
          },
          "locked": false
        }]
      },
      {
        "conversion-value": "high",
        "conversion-event": [{
            "values": {
              "name": [
                "eq",
                "StartTrial"
              ]
            },
            "locked": true
          },
          {
            "values": {
              "name": [
                "eq",
                "StartTrial"
              ]
            },
            "locked": true
          },
          {
            "values": {
              "name": [
                "eq",
                "fb_mobile_purchase"
              ],
              "event_data.revenue": [
                "between",
                0,
                100
              ]
            },
            "locked": true
          }
        ]
      }
    ]
  },
  "ascending-only": true
}
```