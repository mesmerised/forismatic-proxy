import fetch from 'cross-fetch';
import queryString from 'query-string';

const apiURL = 'https://api.forismatic.com/api/1.0/';
const defaults = {
    method: 'getQuote',
    format: 'json',
    lang: 'en'
};

/**
 * A middleware for proxy to the forismatic quote api.
 * https://forismatic.com/en/api/
 *
 * The only supported query parameters are `lang` and `key`.
 * The default `lang` is `en`, and the other query params
 * from the forismatic api are forced as follows:
 *  method -> getQuote
 *  format -> json
 */
export default async (ctx, next) => {
    const { query = {} } = ctx.request;
    const {
        lang = defaults.lang,
        key = defaults.key
    } = query;

    // generate the final api uri with the appended query params
    const params = queryString.stringify({ ...defaults, lang, key });
    const uri = `${apiURL}?${params}`;

    // log proxy request details
    ctx.request.log.info({
        uri,
        query
    }, 'proxy request');

    const res = await fetch(uri);

    if (res.status >= 400) {
        throw new Error('Bad response from server');
    }

    ctx.body = await res.json();
}
