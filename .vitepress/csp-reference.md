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
frame-ancestors 'self'
  https://branch.app.workramp.com;        # lets WorkRamp iframe the site (header-only directive)
worker-src 'self' blob:;                   # Amplitude Session Replay / generic blob workers

script-src 'self'
  'unsafe-inline'                          # VitePress inline bootstrap + GTM snippet
  'unsafe-eval'                            # GTM tag templates
  https://www.googletagmanager.com         # GTM
  https://*.amplitude.com                  # Amplitude SDK
  https://cdn.cookielaw.org                # OneTrust
  https://app.intercom.io https://widget.intercom.io https://js.intercomcdn.com;  # Intercom

style-src 'self'
  'unsafe-inline'                          # VitePress scoped/injected styles
  https://cdn.cookielaw.org;               # OneTrust banner CSS

font-src 'self' data:
  https://js.intercomcdn.com https://fonts.intercomcdn.com;   # Intercom
  # TT Hoves Pro fonts are self-hosted and covered by 'self'. No Google Fonts.

img-src 'self' data: blob:               # blob: = API "Try it" image responses (e.g. QR codes)
  https://www.googletagmanager.com https://*.google-analytics.com https://stats.g.doubleclick.net  # GTM/GA/DoubleClick
  https://cdn.cookielaw.org              # OneTrust
  # --- Intercom image hosts ---
  https://js.intercomcdn.com https://static.intercomassets.com
  https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com
  https://uploads.intercomusercontent.com https://gifs.intercomcdn.com https://video-messages.intercomcdn.com
  https://messenger-apps.intercom.io https://messenger-apps.eu.intercom.io https://messenger-apps.au.intercom.io
  https://*.intercom-attachments-1.com ... -9.com
  https://*.intercom-attachments.eu https://*.au.intercom-attachments.com
  https://static.intercomassets.eu https://static.au.intercomassets.com;

connect-src 'self'
  https://api2.branch.io                 # API docs "Try it" (real requests; only Branch host in your specs)
  https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net  # GTM/GA/DoubleClick
  https://*.amplitude.com                # Amplitude event ingest (+ Session Replay)
  https://cdn.cookielaw.org https://geolocation.onetrust.com   # OneTrust
  # --- Intercom API + realtime websockets (US/EU/AU) ---
  https://via.intercom.io https://api.intercom.io https://api.au.intercom.io https://api.eu.intercom.io
  https://api-iam.intercom.io https://api-iam.eu.intercom.io https://api-iam.au.intercom.io https://api-ping.intercom.io
  https://*.intercom-messenger.com wss://*.intercom-messenger.com
  https://nexus-websocket-a.intercom.io wss://nexus-websocket-a.intercom.io
  https://nexus-websocket-b.intercom.io wss://nexus-websocket-b.intercom.io
  https://nexus-europe-websocket.intercom.io wss://nexus-europe-websocket.intercom.io
  https://nexus-australia-websocket.intercom.io wss://nexus-australia-websocket.intercom.io
  https://uploads.intercomcdn.com https://uploads.intercomcdn.eu https://uploads.au.intercomcdn.com https://uploads.eu.intercomcdn.com
  https://uploads.intercomusercontent.com;

media-src 'self'
  https://js.intercomcdn.com https://downloads.intercomcdn.com https://downloads.intercomcdn.eu https://downloads.au.intercomcdn.com;  # Intercom audio/video msgs

frame-src 'self'
  https://intercom-sheets.com https://www.intercom-reporting.com;   # Intercom
```

## Adding video / media providers

No embedded-video providers or AWS media hosts are currently allowed.
When adding video/media support:

- **YouTube (iframe):**
  - Add `https://www.youtube.com` (and `https://www.youtube-nocookie.com` for privacy mode) to `frame-src`
  - Add `https://i.ytimg.com` to `img-src` if showing thumbnails outside the iframe
- **Vimeo (iframe):**
  - Add `https://player.vimeo.com` to `frame-src`
- **Wistia (JS embed):**
  - `script-src`: `https://fast.wistia.com https://*.wistia.com`
  - `img-src`: `https://*.wistia.com https://embed-ssl.wistia.com`
  - `connect-src`: `https://*.wistia.com`
  - `media-src`: `https://*.wistia.com`
  - `frame-src`: `https://fast.wistia.com https://fast.wistia.net https://*.wistia.com`
- **Self-hosted on AWS:**
  - Prefer a single custom domain (e.g. CloudFront + S3 via `https://media.branch.io`) over wildcarding `*.amazonaws.com` / `*.cloudfront.net`
  - Add the host to `img-src` and `media-src`
  - For adaptive streaming (HLS/DASH): also add to `connect-src` and add `blob:` to `media-src` (for MediaSource object URLs)
  - AWS origin must return `Access-Control-Allow-Origin` for HLS or `crossorigin` fetches

## Excluded sources

- **Document360 (removed during migration):** Algolia, embedly, `cdn.jsdelivr.net` / `unpkg.com` / `cdnjs.cloudflare.com`, `challenges.cloudflare.com` (Turnstile), Google Fonts, all `*.document360.io` hosts
- **Video providers (not yet added):** YouTube / Vimeo / Wistia (see above)
