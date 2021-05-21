#!/usr/bin/env sh

# abort on errors
set -e

git add -A
git commit -m 'deploy heroku'

# heroku login -i

# heroku apps:destroy namstore
heroku create namstore

# heroku buildpacks:add heroku/nodejs
# heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static

git push -f heroku main
# heroku open
