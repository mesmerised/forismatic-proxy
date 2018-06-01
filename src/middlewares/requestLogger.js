/**
 * Simple logging middleware to log the app request.
 */
export default async (ctx, next) => {
    ctx.log.info('app request');
    await next();
}
