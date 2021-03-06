import { eslint } from 'rollup-plugin-eslint'  // 代码风格检查
import buble from 'rollup-plugin-buble'  // 转化相应的v8版本的ES6语法特性
import { uglify } from 'rollup-plugin-uglify' // 用来混淆代码


const pkg = require('../package.json')
const version = pkg.version
const date = new Date().toISOString().split('T')[0].replace(/-/g, '')

// Rollup配置
const rollConf = {
  output: {
    banner: `\
    (function(s) {console.log(s)})('### App Framework ### Start: ${version} Build ${date}');
    `,
    format: 'umd',
    sourcemap: true
  },
  plugins: [
    eslint({
      exclude: './package.json',
      fix: true
    }),
    buble({
    })
  ]
}
// 配置环境
const nodeConf = parse()

const conf = Object.assign({}, rollConf, nodeConf, {
  output: Object.assign({}, rollConf.output, nodeConf.output)
})

export default conf

/**
 * 解析NODE环境的参数
 */
function parse (config) {
  config = config || {}
  const NODE_ENV = config.NODE_PHASE = process.env.NODE_PHASE

  if (NODE_ENV === 'ol') {
    rollConf.plugins.push(uglify())
  }

  switch (NODE_ENV) {
    case 'dev':
      config = {
        input: './src/index.js',
        output: {
          file: `./example/index.js`,
          name: 'DanMa'
        }
      }
      break
    case 'ol':
      config = {
        input: './src/index.js',
        output: {
          file: `./dist/release/index.js`,
          name: 'DanMa'
        }
      }
      break
    default:
      throw new Error(`Unknown node environment: ${NODE_ENV}`)
  }

  console.info('config: ', JSON.stringify(config, null, 4))
  return config
}