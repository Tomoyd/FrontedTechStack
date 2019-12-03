module.exports.format=(s, c)=> {
    return s.replace(/{(\w+)}/g,
        function(m, p) {
            return c[p];
        }
    )
}