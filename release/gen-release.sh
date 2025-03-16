set -exu
HERE=$(dirname $(realpath $BASH_SOURCE))
cd $HERE

# --- config
releaseName="abrenamer2_1.0.1-beta"
# ---

outputDir="$HERE/output"
mkdir -p $outputDir

outputFile="$outputDir/${releaseName}_$(date +%Y-%m-%dT%H%M%S).zip"

cd ..
rm -rf dist
pnpm exec electron-builder -c release/electron-builder.yml

cp dist/out.zip $outputFile