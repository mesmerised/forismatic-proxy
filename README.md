# forismatic-proxy
A proxy to the [forismatic quotes api](https://forismatic.com/en/api/) with CORS headers enabled.

https://forismatic-proxy.herokuapp.com/

#### Why
While the original `forismatic` quote api is great, it however does not allow `x-origin` requests. Though it supports `jsonp` calls, it's not always feasible to allow `jsonp` when security is a concern. For example if you happen to build a browser extension, you must be aware that `jsonp` is security critical and is not recommended. As a matter of fact, you'd need to manually set the `content security policy` in your app manifest and the chances are high that your app might get rejected or disabled after review, on grounds of security violations.

Hence this proxy api exists as a simple and robust alternate. At present it's deployed as a heroku app and is available with `CORS headers` to let you make calls to the original forismatic quotes api without any restrictions.

## Query
Refer to the original [forismatic api](https://forismatic.com/en/api/) docs for the details about each of the supported params.
- `lang` - defaults to `en`
- `key`

#### Examples
- https://forismatic-proxy.herokuapp.com/
- https://forismatic-proxy.herokuapp.com/?lang=ru
- https://forismatic-proxy.herokuapp.com/?key=1234
- https://forismatic-proxy.herokuapp.com/?lang=ru&key=123456

The `jsonp` and `format` query param from the forismatic api is intentionally not supported to make `json` as the consistent default response format. Also, the `method` param is defaulted to `getQuote`, as it is the only available supported value by the api.

## Who's using it
- [mesmerized](https://mesmerized.me/) - Transform your browser tabs

Built something cool using this? Submit a PR to add it to this section.

## Contributions
Fork the project
Commit your enhancements and bug fixes
Create a pull request describing the changes

```shell
npm run dev     # start server and watch changes
npm run build   # builds the code
npm start       # build and run server
```

## License
forismatic-proxy is licensed under the MIT License
