#!/bin/bash
echo "================ Copy repositories"
git clone https://github.com/apache/cordova-js.git
git clone https://github.com/apache/cordova-browser.git
git clone https://github.com/Imviktor/cordova-plugin-toast.git
git clone https://github.com/Imviktor/cordova-sectv-orsay.git
git clone https://github.com/Imviktor/cordova-sectv-tizen.git
git clone https://github.com/Imviktor/cordova-tv-webos.git
git clone https://github.com/Imviktor/grunt-cordova-sectv.git

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
cd ..

echo "================ Add compile task in 'Gruntfile.js' for Cordova-JS project"
cd cordova-js
sed -e "s/compile: {/compile: {\"sectv-orsay\": {},\"sectv-tizen\": {},\"tv-webos\": {},/g" Gruntfile.js > Gruntfile.js.tmp && mv Gruntfile.js.tmp Gruntfile.js
sed -e "s/\"cordova-platforms\": {/\"cordova-platforms\": {\"cordova-sectv-orsay\": \"..\/cordova-sectv-orsay\",\"cordova-sectv-tizen\": \"..\/cordova-sectv-tizen\",\"cordova-tv-webos\": \"..\/cordova-tv-webos\",/g" package.json > package.json.tmp && mv package.json.tmp package.json
cd ..

echo "================ Compile project"
cd cordova-js
grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
cd ..

cd cordova-plugin-toast
grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
cd ..

echo -n "================ What's the root directory's name? (default is 'project') "
read projectName
if [ -z "$projectName" ]
then
	projectName="project"
fi

cd ${projectName}
cordova prepare
npm install