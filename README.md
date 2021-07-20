# 利用react+material-ui做一个小练习
***
_语言：JavaScript，TypeScript，React，SPA，Material-UI_
## 1.React APP作成
在要创建工程的目录下运行以下命令：
```
npx create-react-app react-material-ui-sample --typescript
```

## 2.然后打开VScode，打开刚创建的工程react-material-ui-sample，在该工程路径下执行：```npm start```
## 然后浏览器自动打开http://localhost:3000，画面出现一朵蓝色的六瓣花。

## 3.按照以下结构构造目录：
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

## 4.创建一个例子。在src/components/pages/目录下创建一个HomePage.tsx  和ProductPage.tsx
HomePage.tsx：
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
```

export default ProductPage;
## 5.在访问指定路径时，尝试实现路由，以描绘刚才创建的两个页面。首先安装实现路由的程序库。
```
npm install --save react-router-domnpm
install --save-dev @types/react-router-dom
```
## 6.编辑APP.js
App.js：
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
```
It looks like you're trying to use TypeScript but do not have typescript installed.Please install typescript by running yarn add typescript.
```
然后运行```yarn add typescript```

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
```
npm install --save @material-ui/core @material-ui/icons
```

## 10.导入与Material-II投缘的Google日语字体和字体图标。在public/index.>的页眉中添加CDN的URL
index.html
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
GenericTemplate.tsx

## 12.页面适用
*HomePage.tsx
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

*ProductPage.tsx
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
比如ProductPage.tsx：
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