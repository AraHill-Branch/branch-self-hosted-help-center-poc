# CSP reference — Branch Help Center

Human-readable source of truth for the Content-Security-Policy header.
Edit here, then re-flatten into `netlify.toml` as a single line.

## Directive-by-directive, grouped by what each source is for

```
default-src 'self';
base-uri 'self';
object-src 'none';
form-action 'self';
upgrade-insecure-requests;
frame-ancestors 'self';
  # https://branch.app.workramp.com;       # TODO: add back if WorkRamp iframe embed is needed (frame-ancestors or frame-src)
worker-src 'self' blob:;

script-src 'self'
  'unsafe-inline';                         # VitePress inline bootstrap
  # 'unsafe-eval'                          # TODO: GTM tag templates (not set up yet)
  # https://www.googletagmanager.com       # TODO: GTM (not set up yet)
  # https://*.amplitude.com                # TODO: Amplitude SDK (not set up yet)
  # https://cdn.cookielaw.org              # TODO: OneTrust (not set up yet)
  # https://app.intercom.io https://widget.intercom.io https://js.intercomcdn.com  # TODO: Intercom (not set up yet)

style-src 'self'
  'unsafe-inline';                         # VitePress scoped/injected styles
  # https://cdn.cookielaw.org;             # TODO: OneTrust banner CSS (not set up yet)

font-src 'self' data:;
  # https://js.intercomcdn.com https://fonts.intercomcdn.com  # TODO: Intercom (not set up yet)
  # TT Hoves Pro fonts are self-hosted and covered by 'self'. No Google Fonts.

img-src 'self' data: blob:;              # blob: = API "Try it" image responses (e.g. QR codes)
  # https://www.googletagmanager.com https://*.google-analytics.com https://stats.g.doubleclick.net  # TODO: GTM/GA/DoubleClick (not set up yet)
  # https://cdn.cookielaw.org            # TODO: OneTrust (not set up yet)
  # --- Intercom image hosts (not set up yet) ---
  # https://js.intercomcdn.com https://static.intercomassets.com
  # https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com
  # https://uploads.intercomusercontent.com https://gifs.intercomcdn.com https://video-messages.intercomcdn.com
  # https://messenger-apps.intercom.io https://messenger-apps.eu.intercom.io https://messenger-apps.au.intercom.io
  # https://*.intercom-attachments-1.com ... -9.com
  # https://*.intercom-attachments.eu https://*.au.intercom-attachments.com
  # https://static.intercomassets.eu https://static.au.intercomassets.com

connect-src 'self'
  https://api2.branch.io;                # API docs "Try it" (real requests)
  # https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net  # TODO: GTM/GA/DoubleClick (not set up yet)
  # https://*.amplitude.com              # TODO: Amplitude event ingest + Session Replay (not set up yet)
  # https://cdn.cookielaw.org https://geolocation.onetrust.com  # TODO: OneTrust (not set up yet)
  # --- Intercom API + realtime websockets (US/EU/AU) (not set up yet) ---
  # https://via.intercom.io https://api.intercom.io https://api.au.intercom.io https://api.eu.intercom.io
  # https://api-iam.intercom.io https://api-iam.eu.intercom.io https://api-iam.au.intercom.io https://api-ping.intercom.io
  # https://*.intercom-messenger.com wss://*.intercom-messenger.com
  # https://nexus-websocket-a.intercom.io wss://nexus-websocket-a.intercom.io
  # https://nexus-websocket-b.intercom.io wss://nexus-websocket-b.intercom.io
  # https://nexus-europe-websocket.intercom.io wss://nexus-europe-websocket.intercom.io
  # https://nexus-australia-websocket.intercom.io wss://nexus-australia-websocket.intercom.io
  # https://uploads.intercomcdn.com https://uploads.intercomcdn.eu https://uploads.au.intercomcdn.com https://uploads.eu.intercomcdn.com
  # https://uploads.intercomusercontent.com

media-src 'self';
  # https://js.intercomcdn.com https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com  # TODO: Intercom audio/video msgs (not set up yet)

frame-src 'self';
  # https://intercom-sheets.com https://www.intercom-reporting.com  # TODO: Intercom (not set up yet)
```