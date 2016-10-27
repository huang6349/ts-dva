import dva from 'dva';
import './index.html';

// 加载公共样式

require('./index.less');

// 1. 初始化"dva"
const app = dva();

// 2. 注册"dva"插件
//app.use({});

// 3. 注册程序模型
app.model(require('./models/login'));
app.model(require('./models/sidebar'));
app.model(require('./models/table'));

// 4. 注册程序路由
app.router(require('./router'));

// 5. 启动项目
app.start('#root');
