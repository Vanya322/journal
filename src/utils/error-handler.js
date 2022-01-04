module.exports = (res, err) => {
    res.status(500).json({
        success: false,
        message: err.message ?  err.message : err,
    })
}
