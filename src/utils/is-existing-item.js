function isExistingItem (fn, item ) {
    return async function (req, res, next){
        let smallcase = item.toLowerCase();
        const key = req.params[`${smallcase}Id`];
        if (!key) {
            return next({
                status: 405,
                message: `${item}Id missing`
            })
        }
        const data = await fn(key);
        if (data) {
            res.locals[smallcase]= data;
            return next();
        }

        return next({
            status: 404,
            message: `${item} cannot be found.`,
        });
    }
} // isExistingItem

module.exports = isExistingItem;