INLINE_RUNTIME_CHUNK=false npm run build

pushd build/static/js

mv -f 2*.js vendor.pet-table.js
mv -f main*.js main.pet-table.js
mv -f runtime~main*.js runtime.pet-table.js

popd

serve -l 5002 build
