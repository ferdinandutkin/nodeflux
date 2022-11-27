const { createProxyMiddleware } = require('http-proxy-middleware');


const apiFilter = function (path, req) {
    return path.includes('api') && !path.toLowerCase().includes('hub')
};

const hubFilter = function (path, req) {
    return path.toLowerCase().includes('hub')
};

module.exports = function(app) {
    app.use(
        createProxyMiddleware(
            apiFilter,
            {
                    target: process.env.REACT_APP_API,
                    secure: false,
                    changeOrigin: true,
            })
    );
    app.use(
        createProxyMiddleware(
            hubFilter,
            {
                    target: process.env.REACT_APP_API,
                    changeOrigin: true,
                    secure: false,
                    ws: true,
            }))
};
