#!/bin/bash
echo 'Start build adv3 process ...'

#script_dir=$(dirname $0)
#echo $script_dir

script=$(readlink -f "$0")
echo $script
script_dir=$(dirname "$script")
echo "Script dir: $script_dir"

. $script_dir/env.sh

echo "MAVEN_HOME: $MAVEN_HOME"
cd $script_dir/adv3
hg pull
hg up
cd ad-maven-plugin 
$MAVEN_BIN/mvn clean package install
cd ..
$MAVEN_BIN/mvn clean package install -Dmaven.test.skip=true -Ptomcat
RETVAL=$?
if [ $RETVAL == 0 ] 
then
  echo "Backend build success. Deploy ad-rest-api module."
  #$TOMCAT_STOP
  rm -rf $TOMCAT_BASE/webapps/ad-rest-api
  cp ad-rest-api/target/ad-rest-api.war $TOMCAT_BASE/webapps/
  #$TOMCAT_START
else
  echo "Backend build failed".
fi

if [ $RETVAL == 0 ]
then
  cd ad-core
  $MAVEN_BIN/mvn site
  cd ../ad-rest-api
  $MAVEN_BIN/mvn site
  cd ..
fi

echo "NODE_BIN: $NODE_BIN"
cd ad-dashboard
$NODE_BIN/npm install

$NODE_BIN/npm run build:dashboard
RETVAL1=$?

echo "AD Dashboard build return: $RETVAL1"
cd ../..
if [ $RETVAL1 == 0 ]
then
  echo "Build dashboard success. Deploy dashboard module"
  cp -r adv3/ad-dashboard/dist publish/
  rm -rf publish/ad-dashboard
  mv publish/dist publish/ad-dashboard
  cp config/ad-dashboard/app.json publish/ad-dashboard/assets/
  #sed -i 's/href="\/"/href="\/ad-dashboard\/"/g' publish/ad-dashboard/index.html
else
  echo "Build dashboard failed."
fi
