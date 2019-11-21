import txios from '../../src/index'

/**
 * GET 请求
 */

// 普通情况
txios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: 1,
    bar: 2
  }
});

// 参数为数组
txios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: ['bar', 'baz']
  }
});

// 参数为对象
txios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: { bar: 'baz' }
  }
});

// 参数为 Date 类型
txios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: new Date()
  }
});

// 参数为特殊字符
txios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: '@:$, '
  }
});

// 参数为 null
txios({
  url: '/base/get',
  method: 'get',
  params: {
    foo: 'null',
    baz: null
  }
});

// url 中有 hash
txios({
  url: '/base/get#hash',
  method: 'get',
  params: {
    foo: 'has hash'
  }
});

// url 中已经有参数
txios({
  url: '/base/get?foo=bar',
  method: 'get',
  params: {
    bar: 'has param bar'
  }
});

/**
 * POST 请求
 */

// 发送普通数据
txios({
  url: '/base/post',
  method: 'post',
  data: {
    foo: 1,
    bar: 2
  }
});

// 发送 Int32Array 数据
txios({
  url: '/base/buffer',
  method: 'post',
  data: new Int32Array([1, 10])
});

/**
 * 设置 HTTP 请求头
 */

// 设置请求头发送数据
txios({
  url: '/base/post',
  method: 'post',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  data: {
    foo: 'set http headers',
  }
});

// 发送 URLSearchParams 类型的数据
// (这个时候浏览器会自动为 header 加上合适的 Content-Type)
txios({
  url: '/base/post',
  method: 'post',
  data: new URLSearchParams('q=URLUtils.searchParams&topic=api')
});
