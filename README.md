# extra-fetch

Yet another `fetch` package.

## Install

```sh
npm install --save extra-fetch
# or
yarn add extra-fetch
```

## API

- fetch
- Headers
- Request
- Response
- FormData
- AbortController
- Blob
- EventSource

## Logging

When using `fetch` in Node.js, you can enable logging through the environment variable `EXTRA_FETCH_LOG`.

### Level

- `EXTRA_FETCH_LOG=info`: id, timestamp, elapsed, url, method, status code.
- `EXTRA_FETCH_LOG=trace`: all of the above, headers.
