# NamStore

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## Deploy
### github
vue.config.js
publicPath: process.env.NODE_ENV === 'production' ? '/NamStore/' : '/',

run run deploy

### heroku
heroku login
heroku create namstore

git push -f heroku main