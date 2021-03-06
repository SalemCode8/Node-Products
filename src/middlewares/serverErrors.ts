export function serverErrors(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.APP_ENV === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}
