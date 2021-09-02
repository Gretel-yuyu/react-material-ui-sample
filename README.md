# 利用react+material-ui做一个小练习
***
_语言：JavaScript，TypeScript，React，SPA，Material-UI_
## 1.React APP作成
在要创建工程的目录下运行以下命令：  
`npx create-react-app react-material-ui-sample --typescript`

## 2.然后打开VScode，打开刚创建的工程react-material-ui-sample，在该工程路径下执行：
`npm start`   
然后浏览器自动打开[本地服务器](http://localhost:3000)，画面出现一朵蓝色的六瓣花。

## 3.按照以下结构构造目录：

```
src/
├ components/
│　└ atoms/ # 原子（個々のパーツ）
│　└ molecules/ # 分子（原子の集合体）
│　└ organisms/ # 生体（分子の集合体）
│　└ templates/ # テンプレート（ページの雛形）
│　└ pages/ # ページ
├ App.tsx
├ index.css
├ index.tsx〜〜〜〜〜〜〜〜〜〜〜〜〜
```

## 4.创建一个例子。在src/components/pages/目录下创建一个HomePage.tsx  和ProductPage.tsx
*HomePage.tsx：*
```
import React from "react";
const HomePage: React.FC = () => {
  return <>トップページ</>;
};
export default HomePage;
ProductPage.tsx：
import React from "react";

const ProductPage: React.FC = () => {
  return <>商品ページ</>;
};

export default ProductPage;
```
## 5.在访问指定路径时，尝试实现路由，以描绘刚才创建的两个页面。首先安装实现路由的程序库。
`npm install --save react-router-domnpm`   
`install --save-dev @types/react-router-dom`

## 6.编辑APP.js
*App.js：*
```
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductPage from "./components/pages/ProductPage";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/products" component={ProductPage} exact />
          <Route path="/" component={HomePage} exact />
        </Switch>
      </Router>
  );
}
export default App;
```

## 7.然后程序出现红线了，提醒我可能没有安装TypeScript
`It looks like you're trying to use TypeScript but do not have typescript installed.Please install typescript by running yarn add typescript.`

然后运行`yarn add typescript`

## 8.安装了typeScript后仍然有问题，找到编辑tsconfig。
```
{
"compilerOptions": {
"target": "esnext",
"moduleResolution": "node",
"allowJs": true,
"noEmit": true,
"strict": true,
"isolatedModules": true,
"esModuleInterop": true,
"lib": [
"esnext",
"dom",
],
"allowSyntheticDefaultImports": true,
"jsx": "react-jsx",
"skipLibCheck": true,
"forceConsistentCasingInFileNames": true,
"noFallthroughCasesInSwitch": true,
"module": "esnext",
"resolveJsonModule": true
},
"include": [
// "src",
"**/*.tsx",
]
}
```

## 9.导入materialUI
执行以下命令安装
`npm install --save @material-ui/core @material-ui/icons`

## 10.导入与Material-II投缘的Google日语字体和字体图标。在public/index.>的页眉中添加CDN的URL
*index.html*
```
<head>
〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+JP&subset=japanese" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜
</head>
```
## 11.做成一个模版
*GenericTemplate.tsx*
```
import React from "react";
import clsx from "clsx";
import { createMuiTheme } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 240;

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Noto Sans JP",
      "Lato",
      "游ゴシック Medium",
      "游ゴシック体",
      "Yu Gothic Medium",
      "YuGothic",
      "ヒラギノ角ゴ ProN",
      "Hiragino Kaku Gothic ProN",
      "メイリオ",
      "Meiryo",
      "ＭＳ Ｐゴシック",
      "MS PGothic",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: { main: colors.blue[800] }, // テーマの色
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    pageTitle: {
      marginBottom: theme.spacing(1),
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.text.secondary,
    },
  })
);

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        管理画面
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export interface GenericTemplateProps {
  children: React.ReactNode;
  title: string;
}

const GenericTemplate: React.FC<GenericTemplateProps> = ({
  children,
  title,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              管理画面
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="トップページ" />
              </ListItem>
            </Link>
            <Link to="/products" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="商品ページ" />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              noWrap
              className={classes.pageTitle}
            >
              {title}
            </Typography>
            {children}
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default GenericTemplate;
```

## 12.页面适用
*HomePage.tsx*
```
import React from "react";
import GenericTemplate from "../templates/GenericTemplate";

const HomePage: React.FC = () => {
  return (
    <GenericTemplate title="トップページ">
      <>トップページ内容</>
    </GenericTemplate>
  );
};

export default HomePage;
```

*ProductPage.tsx*
```
import React from "react";
import GenericTemplate from "../templates/GenericTemplate";

const ProductPage: React.FC = () => {
  return (
    <GenericTemplate title="商品ページ">
      <>商品ページ内容</>
    </GenericTemplate>
  );
};

export default ProductPage;
```

## 13.根据需要就可以编辑页面了
比如*ProductPage.tsx：*
```
import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const createData = (
  name: string,
  category: string,
  weight: number,
  price: number
) => {
  return { name, category, weight, price };
};

const rows = [
  createData("チョコレート", "お菓子", 100, 120),
  createData("ケーキ", "お菓子", 400, 480),
  createData("りんご", "フルーツ", 500, 360),
  createData("バナナ", "フルーツ", 200, 300),
  createData("みかん", "フルーツ", 250, 180),
];

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ProductPage: React.FC = () => {
  const classes = useStyles();

  return (
    <GenericTemplate title="商品ページ">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>商品名</TableCell>
              <TableCell align="right">カテゴリー</TableCell>
              <TableCell align="right">重量(g)</TableCell>
              <TableCell align="right">価格(円)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.category}</TableCell>
                <TableCell align="right">{row.weight}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </GenericTemplate>
  );
};

export default ProductPage;
```

********************************
##最后成果物的图
* HomePage   
![HomePage 图标](https://github.com/Gretel-yuyu/markdownImage/blob/master/react-material-ui-sample/homePage.png)

* ProductPage   
![ProductPage 图标](https://github.com/Gretel-yuyu/markdownImage/blob/master/react-material-ui-sample/productPage.png)

********************************
参考资料：   
* [React + Material-UIで管理画面を作成してみた](https://dev.classmethod.jp/articles/react-material-ui/)   
* [React教程](https://ja.reactjs.org/)   
* [Material-Ui教程](https://material-ui.com/)   
********************************

我生成的githubToken：`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`   
根据[github和gitlab同步教程](https://www.cnblogs.com/sxdcgaq8080/p/10530176.html)操作生成

在github生成的代码git   
* `https://github.com/Gretel-yuyu/-myReactPractice.git`   
* `https://github.com/Gretel-yuyu/react-material-ui-sample.git`   
********************************

##实现网络连接  
##How to integrate FaunaDB in React apps with Material UI  
首先我找到了一个免费的云数据库，叫Fauna，用github就可以注册登录。  
接下来讲一下怎么创建数据库。

###创建一个新的 FaunaDB 实例
* 创建新帐户或登录后，仪表板屏幕将欢迎您。按下按钮：`New Database`  
* 然后，输入数据库的名称并按下按钮`Save`,比如数据库起名字叫`MyFirstDatabase`.
* 设置数据库实例后，您就可以创建访问`密钥`了。访问`密钥`是连接授权和从 React 应用程序到数据库的连接。**此键允许您控制谁对数据库进行读写操作。**  
* 要创建第一个访问`密钥`，请从侧面菜单转到`Security`选项卡并单击按钮：`New Key`,按`Save`以后，将生成一个`新密钥`.
```
`YOUR KEY'S SECRET IS`:
`新密钥`（比如abcdefg）
```
* 记住这个`新密钥`。
* 为了避免在通过 GitHub 存储项目时从 React 应用程序泄露令牌，在 React 项目的根目录中创建一个文件，`.env`文件。
    - react--添加环境变量
        - 添加环境变量
        `create-react-app`创建的项目，不想要直接修改node包里的webpack，所以需要扩展webpack配置，在根目录中做修改。
        这里使用`react-app-rewired`.
            - 安装react-app-rewired依赖
            ```
            $ npm install react-app-rewired customize-cra --save-dev
            ```
            - 修改 package.json 的 scripts 配置
            ```
            /* package.json */
            
              "scripts": {
            -   "start": "react-scripts start",
            +   "start": "react-app-rewired start",
            -   "build": "react-scripts build",
            +   "build": "react-app-rewired build",
            -   "test": "react-scripts test",
            +   "test": "react-app-rewired test",
                "eject": "react-scripts eject"
            }
            ```
            - 在项目的根目录下创建`config-overrides.js`文件
            ```
            +-- your-project
            |   +-- config-overrides.js
            |   +-- node_modules
            |   +-- package.json
            |   +-- public
            |   +-- README.md
            |   +-- src
            ```
            - 在`config-overrides.js`文件中添加配置项
            ```
            /* config-overrides.js */
            const { override,disableEsLint} = require('customize-cra')


            //关闭mapSource bug 打包的css有map文件
            //const rewiredMap = () => config => {
               //config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
               //return config;
            //};

            //关闭mapSource css和js都去掉了map文件
            process.env.GENERATE_SOURCEMAP = false

            module.exports = {
               webpack: override(
                  // 关闭mapSource
                  //rewiredMap(),
                  disableEsLint()
               ),
            } 
            ```
            - 关闭mapSource
            ```
            /* config-overrides.js */
            
            module.exports = function override(config, env) {
              //do stuff with the webpack config...
              return config;
            }
            ```
            - package.json
            ```
            "scripts": {
              "start": "REACT_APP_ENV=test react-app-rewired start",
              "build": "REACT_APP_ENV=production react-app-rewired build",
              "build:test": "REACT_APP_ENV=test react-app-rewired --max_old_space_size=4096 build",
              "test": "react-scripts test",
              "eject": "react-scripts eject"
            },
            "devDependencies": {
              "customize-cra": "^1.0.0",
              "react-app-rewired": "^2.1.6",
            }
            ```
            - 以上webpack配置参照以下链接  
            [扩展webpack配置:react-app-rewired](https://juejin.cn/post/6860359773313826823/)
        - cross-env+react-app-rewired
           - 安装cross-env
           ```
           npm i cross-env --save-dev
           ```
           - 安装 dotenv-cli 包
           ```
           npm i  dotenv-cli --save-dev
           ```
           - 根据需求在根目录创建 .env 文件（注意：只能以 REACT_APP_ 开头）
           - 运行`npm run build:dev`
    - 在`.env`文件创建一个变量
    `REACT_APP_DB_KEY = YOUR_KEY_HERE`
    - 确保将`.env`文件添加到.gitignore,以免上传后泄漏密码
    - 创建Collections
    这里的Collections相当于表的映射，点击`New Collection`,Collection Name:`MyFirstTable`.
    - 创建Indexes
    在 FaunaDB 中搜索文档可以通过使用来完成indexes，特别是通过将输入与索引的terms字段进行匹配。如果您期待在特定屏幕上搜索等功能，这将很有帮助   
    ```
    Source Collection：`MyFirstTable`
    Index Name:`all_fields`
    ```
    - 安装依赖
    ```
    yarn add faunadb @material-ui/core
    ```
    - 在src/config/下创建db.js文件
    ```
    import faunaDb from 'faunadb';
    const client = new faunaDb.Client({
      secret: process.env.REACT_APP_DB_KEY,
    });
    const faunaQuery = faunaDb.query;
    export { client, faunaQuery };
    ```
    - 确认能够读取.env文件后，就可以在src/api目录下创建对数据库的增删改查方法。
    - 以上内容参照以下链接  
    [How to integrate FaunaDB in React apps with Material UI](https://blog.logrocket.com/how-to-integrate-faunadb-in-react-apps-with-material-ui/)

******************************************************************

