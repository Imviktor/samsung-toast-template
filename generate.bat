@echo off
echo ================ Copy repositories
git clone https://github.com/apache/cordova-js.git
git clone https://github.com/apache/cordova-browser.git
git clone https://github.com/Imviktor/cordova-plugin-toast.git
git clone https://github.com/Imviktor/cordova-sectv-orsay.git
git clone https://github.com/Imviktor/cordova-sectv-tizen.git
git clone https://github.com/Imviktor/cordova-tv-webos.git
git clone https://github.com/Imviktor/grunt-cordova-sectv.git

echo ================ Install npm modules each repositories
cd cordova-js
call npm install
cd ..

cd cordova-sectv-orsay
call npm install
cd ..

cd cordova-sectv-tizen
call npm install
cd ..

cd cordova-tv-webos
call npm install
cd ..

cd cordova-plugin-toast
call npm install
cd ..

cd grunt-cordova-sectv
call npm install
cd ..

cd cordova-js
call cscript ../replace.vbs
cd ..

echo ================ Getting Started with TOAST!
set projectName=""
set /p projectName="What's the root directory's name? (default is 'project') "

if %projectName%=="" (
	set projectName=project
)

cd %projectName%
call cordova prepare
call npm install
