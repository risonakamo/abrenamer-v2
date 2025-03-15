set -exu
HERE=$(dirname $(realpath $BASH_SOURCE))
cd $HERE

cd ..
pnpm b
cd abrenamer-v2-web
pnpm b