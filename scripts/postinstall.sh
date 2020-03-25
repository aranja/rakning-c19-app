# Pod install
if [ -z "$CI" ]; then
  (cd ios; pod install; cd -)
fi
