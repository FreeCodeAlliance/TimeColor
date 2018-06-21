cp webpack.config.dev.js ./node_modules/react-scripts/config
cp webpack.config.prod.js ./node_modules/react-scripts/config

rm -r ./build/*
mkdir ../server/public
rm -r ../server/public/*

npm run build
cp -r ./build/* ../server/public
echo "copy new bulid"
