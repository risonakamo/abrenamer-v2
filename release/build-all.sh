set -exu
HERE=$(dirname $(realpath $BASH_SOURCE))
cd $HERE

cd ..
rm -rf build
pnpm b

cd abrenamer-v2-web
rm -rf build
pnpm b