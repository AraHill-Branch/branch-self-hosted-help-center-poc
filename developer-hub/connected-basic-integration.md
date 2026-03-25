---
title: "Connected Basic Integration"
slug: connected-basic-integration
---

::: tip SDK Stats
**Github Repository is Private until General Availability**  
**SDK Size**: 33kb  
**Speed**: Median 80ms to 250ms
:::

## Minimum Requirements

The Branch Connected SDK requires native browser Javascript and has **only** been tested in Tizen and WebOS with sessionStorage capability. No 3rd party libraries are needed to make use of the SDK as is it 100% native Javascript.

## Initialize Branch

## NPM (Recommended)

```
npm install branch-connected-sdk
```

```
import branch from 'branch-connected-sdk'

// Pass the device's advertising id through 'options' with the corresponding key (https://help.branch.io/developers-hub/docs/connected-basic-integration#advertising-id-index)
const options = {
    advertising_ids: {
        SAMSUNG_IFA: 'xxxxx',
    }
};
// init Branch 
branch.init('key_live_YOUR_KEY_GOES_HERE', options);
```

- Change `key_live_YOUR_KEY_GOES_HERE` to match your [Branch Dashboard](https://dashboard.branch.io/account-settings/app)
- If you'd like to use a specific version of the SDK, point to `npm install branch-connected-sdk@x.xx.x` or update your `package.json` and rerun `npm install`

## Script

```
<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <script>
        // load Branch
        (function (b, r, a, n, c, h, _, s, d, k) {
            if (!b[n] || !b[n]._q) {
                for (; s < _.length;) c(h, _[s++]);
                d = r.createElement(a);
                d.async = 1;
                d.src = "https://cdn.branch.io/branch-connected.min.js";
                k = r.getElementsByTagName(a)[0];
                k.parentNode.insertBefore(d, k);
                b[n] = h
            }
        })(window, document, "script", "branch", function (b, r) {
                b[r] = function () {
                    b._q.push([r, arguments])
                }
            }, {
                _q: [],
                _v: 1
            },
            "data first init link logout setIdentity track logEvent disableTracking qrCode"
            .split(" "), 0);
        // Pass the device's advertising id through 'options' with the corresponding key (https://help.branch.io/developers-hub/docs/connected-basic-integration#advertising-id-index)
        const options = {
            advertising_ids: {
                SAMSUNG_IFA: 'xxxxx',
            }
        };
        // init Branch 
        branch.init('key_live_YOUR_KEY_GOES_HERE', options);
    </script>
</head>
<body></body>
</html>
```

- Change `key_live_YOUR_KEY_GOES_HERE` to match your [Branch Dashboard](https://dashboard.branch.io/account-settings/app)

## Advertising ID Index

| Device | Key |
| --- | --- |
| Samsung | SAMSUNG\_IFA |
| LG | LG\_IFA |
| Panasonic | PANASONIC\_IFA |
| Playstation | PLAYSTATION\_IFA |
| Xbox | XBOX\_MSAI |
| Roku | ROKU\_RIDA |