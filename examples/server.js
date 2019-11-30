const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

require('./server2');

const app = express();
const complier = webpack(webpackConfig);

const router = express.Router();
router.get('/simple/get', (req, res) => {
  res.json({
    msg: `hello world`
  });
});

router.get('/base/get', (req, res) => {
  res.json(req.query);
});
router.post('/base/post', (req, res) => {
  res.json(req.body);
});
router.post('/base/buffer', (req, res) => {
  const msg = [];
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk);
    }
  });
  req.on('end', () => {
    const buffer = Buffer.concat(msg);
    res.json(buffer.toJSON());
  });
});

router.get('/error/get', (req, res) => {
  if (Math.random() > 0.5) {
    res.json({ msg: 'hello world' });
  } else {
    res.status(500);
    res.end();
  }
});
router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({ msg: 'hello world' });
  }, 3000);
});

router.get('/extend/get', (req, res) => {
  res.json(req.query);
});
router.delete('/extend/delete', (req, res) => {
  res.json(req.query);
});
router.head('/extend/head', (req, res) => {
  res.json(req.query);
});
router.options('/extend/options', (req, res) => {
  res.json(req.query);
});
router.post('/extend/post', (req, res) => {
  res.json(req.body);
});
router.put('/extend/put', (req, res) => {
  res.json(req.body);
});
router.patch('/extend/patch', (req, res) => {
  res.json(req.body);
});
router.get('/extend/user', (req, res) => {
  res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'struggle',
      age: 18
    }
  });
});

router.get('/interceptor/get', (req, res)=> {
  res.json(req.query);
});

router.post('/config/post', (req, res)=> {
  res.json(req.body);
});

router.get('/cancel/get', (req, res)=> {
  setTimeout(() => {
    res.json('surprised mother fuck');
  }, 1000);
});
router.post('/cancel/post', (req, res)=> {
  setTimeout(() => {
    res.json(req.body);
  }, 1000);
});

router.get('/more/get', (req, res) => {
  res.json(req.cookies);
});
router.post('/more/post', (req, res) => {
  const auth = req.headers.authorization;
  const [type, credentials] = auth.split(' ');
  console.log(atob(credentials));
  const [username, password] = atob(credentials).split(':');
  if (
    type === 'Basic'
    && username === 'Yee'
    && password === '123456'
  ) {
    res.json(req.body);
  } else {
    res.status(401);
    res.end('UnAuthorization');
  }
});


app.use(webpackDevMiddleware(complier, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}));

app.use(webpackHotMiddleware(complier));
app.use(express.static(__dirname)); // 引入静态资源文件供浏览器访问

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const port = process.env.PORT || 8888;
module.exports = app.listen(port, () => {
  console.log(`请空中转体 420° 打开这个链接 http://localhost:${port}, 或按 Ctrl + C 停止操作`);
});
