rm -r ./build/*
rm -r ../server/public/*
echo "delete server public and start build"
npm run build
cp -r ./build/* ../server/public
echo "copy new bulid"
