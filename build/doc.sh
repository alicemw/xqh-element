#! /bin/sh
echo "deploy start!"

VERSION=`npx select-version-cli`
echo "$VERSION"
# copy
cp -R ./examples/xqh-element/. ../xqh-doc

cd ../xqh-doc
# commit
  git add -A
  git commit -m "[版本更新] 1.1.1"
  git push
echo "deploy end!"