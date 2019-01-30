# 用到的东西
1. redux、react-redux
2. redux-thunk 支持异步dispatch
3. npm run eject: 启用个性化配置(自带)
4. babel-plugin-transform-decorators-legacy插件，可以使用装饰器写法, 配合connect使用
```js
import {addUser} from './user.redux.js'
@connect(
  state => state.user,
  {addUser}
)
class User extends React.Component { .... }
```

# chrome扩展程序
1. react developer tools
2. redux devTools

```
启用它
const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : fn => fn
))
``
# 可以继续学习的地方
1. reselect插件，缓存用，类似于vue里面的计算属性?
2. immutableJS, 可持久化的数据结构。用于比较大的对象时可以提高性能
3. HOC
4. redux的实现