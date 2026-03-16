function isExistingItem (fn, item ) {
    return async function (req, res, next){
        const id = req.params[`${item}Id`];
        const data = await fn(id);
        if (data) {
            res.locals[item] = data;
            return next();
        }

        return next({
            status: 404,
            message: `${item} cannot be found.`,
        });
    }
} // isExistingItem

module.exports = isExistingItem;