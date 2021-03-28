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

- `EXTRA_FETCH_LOG=error`: log ids, timestamps, elapsed time, errors on failure.
- `EXTRA_FETCH_LOG=info`: log all of the above, and the urls, methods, status codes of each request and response.
- `EXTRA_FETCH_LOG=trace`: log all of the above, and the headers of each request and response.

## node-fetch

`extra-fetch` uses [the modified node-fetch] for Node.js,
the difference between the original version:
- `Request` object will retain its `keepalive` properties instead of discarding it.

[the modified node-fetch]: https://github.com/BlackGlory/node-fetch
