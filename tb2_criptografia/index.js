const { md5 } = require('./md5');
const { playFair } = require('./play-fair');
const { railFence } = require('./rail-fence');

const cut = (value) => new Array(5).fill('').map((e,i) => value.substr(i, i !== 4 ? 7 : 5));

const key = ()=> cut(md5((+new Date()).toString()));