#!/bin/bash
echo "================ Copy repositories"
git clone https://github.com/apache/cordova-js.git
git clone https://github.com/apache/cordova-browser.git
git clone https://github.com/Samsung/cordova-plugin-toast.git
git clone https://github.com/Samsung/cordova-sectv-orsay.git
git clone https://github.com/Samsung/cordova-sectv-tizen.git
git clone https://github.com/Samsung/cordova-tv-webos.git
git clone https://github.com/Samsung/grunt-cordova-sectv.git

echo "================ Install npm modules each repositories"
cd cordova-js
npm install
cd ..

cd cordova-sectv-orsay
npm install
cd ..

cd cordova-sectv-tizen
npm install
cd ..

cd cordova-tv-webos
npm install
cd ..

cd cordova-plugin-toast
npm install
cd ..

cd grunt-cordova-sectv
npm install
npm install inquirer xml2js mustache js2xmlparser zip-dir
cd ..

echo "================ Add compile task in 'Gruntfile.js' for Cordova-JS project"
cd cordova-js
sed -e "s/compile: {/compile: {\"sectv-orsay\": {},\"sectv-tizen\": {},\"tv-webos\": {},/g" Gruntfile.js > Gruntfile.js.tmp && mv Gruntfile.js.tmp Gruntfile.js
sed -e "s/\"cordova-platforms\": {/\"cordova-platforms\": {\"cordova-sectv-orsay\": \"..\/cordova-sectv-orsay\",\"cordova-sectv-tizen\": \"..\/cordova-sectv-tizen\",\"cordova-tv-webos\": \"..\/cordova-tv-webos\",/g" package.json > package.json.tmp && mv package.json.tmp package.json

echo "================ Compile project"
grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
cd ..
cd cordova-plugin-toast
grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
cd ..

cd node_modules/grunt-cordova-sectv/tasks/packager
sed -e 's/var packagePath = result\.stdout\.match.*;/var packagePath = result.output.match(\/Package File Location\\:\\s\*(\.\*)\/);/g' sectv-tizen.js > sectv-tizen.js.tmp && mv sectv-tizen.js.tmp sectv-tizen.js