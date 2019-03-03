# fe

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```
## config 파일 셋팅 방법
``` javascript
module.exports = {
  lcUrl: 'mongodb://localhost:27017/nemv',
}
```
디비 연결 문자열을 작성해야 웹서버 정상 구동 됨.