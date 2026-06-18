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

style-src 'self'
  'unsafe-inline';                         # VitePress scoped/injected styles
  # https://cdn.cookielaw.org;             # TODO: OneTrust banner CSS (not set up yet)

font-src 'self' data:;
  # TT Hoves Pro fonts are self-hosted and covered by 'self'. No Google Fonts.

img-src 'self' data: blob:;              # blob: = API "Try it" image responses (e.g. QR codes)
  # https://www.googletagmanager.com https://*.google-analytics.com https://stats.g.doubleclick.net  # TODO: GTM/GA/DoubleClick (not set up yet)
  # https://cdn.cookielaw.org            # TODO: OneTrust (not set up yet)

connect-src 'self'
  https://api2.branch.io;                # API docs "Try it" (real requests)
  # https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net  # TODO: GTM/GA/DoubleClick (not set up yet)
  # https://*.amplitude.com              # TODO: Amplitude event ingest + Session Replay (not set up yet)
  # https://cdn.cookielaw.org https://geolocation.onetrust.com  # TODO: OneTrust (not set up yet)

media-src 'self';

frame-src 'self';
```