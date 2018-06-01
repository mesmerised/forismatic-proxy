/**
 * A generic error handling middleware to catch all errors.
 * It returns a response json after logging the error.
 *  { code, error, data }
 * Customization is possible by setting the following params
 * on the error object and re-throwing the error.
 *  name -> Name to log the error details with
 *  status -> The HTTP status with which the app will response
 *  apiStatus -> The `code` that would be sent as part of response json
 *  apiMessage -> The `error` message that would be sent as part of the response
 *  data -> Any additional data that needs to be sent as part of the response
 */
export default async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        const {
            name = 'app error',
            status = 500,
            apiStatus = status,
            apiMessage = 'Unknown error.',
            data = null
        } = err;

        // log error
        ctx.request.log.error(err, name);

        const responseBody = {
            code: apiStatus,
            error: apiMessage,
            data
        };

        ctx.status = status;
        ctx.body = responseBody;
    }
}
