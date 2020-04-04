const central_err = {}

central_err.process = null

central_err.catch_process = (req, res, next) => {
    process.current_res = res;
    next();
}

process.on('uncaughtException', (err) => {
    let res = process.current_res;
    send_err_res(500,err,res)
});

process.on('unhandledRejection', (err, promise) => {
    let res = process.current_res;
    send_err_res(500,err,res)
});

send_err_res = (status_code,err,res) => {
    if (err instanceof Error) {
        let short_stack = err.stack.toString().split(/\r\n|\n/);
        return res.status(status_code).send({ err_message: err.message, trace: short_stack.slice(0, 2) })
    } else {
        return res.status(status_code).send({ err })
    }
}

module.exports = central_err.catch_process