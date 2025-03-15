set -exu
HERE=$(dirname $(realpath $BASH_SOURCE))
cd $HERE

cd ..
rm -rf dist
pnpm exec electron-builder -c release/electron-builder.yml