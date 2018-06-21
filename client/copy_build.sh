cp webpack.config.dev.js ./node_modules/react-scripts/config
cp webpack.config.prod.js ./node_modules/react-scripts/config

rm -r ./build/*

if [ ! -f "../server/public" ];then
	echo "../server/public 文件不存在"
	mkdir ../server/public
else
	echo " delete public *.* "
	rm -r ../server/public/*
fi

npm run build
cp -r ./build/* ../server/public
echo "copy new bulid"
