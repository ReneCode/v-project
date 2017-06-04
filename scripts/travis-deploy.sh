#!/bin/bash

gitCommitMessage="travis CI"

echo === start azure deploy

gitRepo="https://${AZURE_WA_USERNAME}:${AZURE_WA_PASSWORD}@${AZURE_WA_SITE}.scm.azurewebsites.net:443/${AZURE_WA_SITE}.git"

git clone $gitRepo 
cd ${AZURE_WA_SITE}
# remove old files inside the repo
rm -rf *

git config user.email ${GIT_EMAIL}
git config user.name ${GIT_NAME}

# copy new files
cp -r ../dist/. .

# move web.config to root
mv ./static/web.config .

git add .
git commit -am"${gitCommitMessage}"
git push > /dev/null 2>&1

cd ..

echo === finished azure deploy
