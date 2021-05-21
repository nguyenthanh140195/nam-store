module.exports = {
    publicPath: process.env.BASE_URL,
    devServer: {
        port: process.env.PORT || 8080
    },
    pwa: {
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black'
    }
}