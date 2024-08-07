# belajar-webpack

## Pengenalan
Apa itu webpack? webpack merupakan sebuah module bundler JavaScript untuk membungkus module/dependency/library/assets menjadi satu paket file berekstensi JavaScript (.js). Hanya begitu?? Well, nggk juga sih..

Selain sebagai module bundler, dengan berbagai loader dan plugin yang sudah disediakan untuk Webpack, kita bisa gunakan Webpack untuk mengubah ES6 (ECMAScript 2015) menjadi format ES5 (JavaScript yang kita kenal) yang bisa dibaca oleh browser dan bisa mengubah preprocessor CSS kayak SASS, LESS, Stylus, dan saudara-saudaranya menjadi sebuah file CSS yang bisa dibaca di browser. Nggk cuma itu, Webpack juga digunakan saat kita pakai Front-end Framework kayak ReactJS, VueJS, Angular dan sejenisnya.

selain webpack masih ada beberapa module bundler yang lainnya seperti:
- [browserify.org](https://browserify.org/)
- [rollupjs.org](https://rollupjs.org/)
- [parceljs.org](https://parceljs.org/)
- [snowpack.dev](https://www.snowpack.dev/)
- [vitejs,dev](https://vitejs.dev/)

![1_aXsy5_Jzi9pj2a_MzjAA3g ](https://github.com/user-attachments/assets/24274607-5931-4aa0-b895-3ec8245164b1)

## Instalasi

sebelumnya pastikan di local kalian mempunyai npm, jika belum bisa dilihat dokumentasi instalasi nya [disini](https://nodejs.org/en/download/package-manager) . node dan npm tergabung menjadi 1 kesatuan, jadi sekalian saja installa node nya 
jika sudah jalankan code ini di project kalian 
```sh
npm init -y
```

jika sudah langsung install webpack nya menggunakan command berikut
```sh
npm install webpack webpack-cli --save-dev
```

## Konfigurasi Default
jika sudah terinstall, replace code package.json kalian menjadi seperti ini
```json
{
  "name": "belajar-webpack",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.93.0",
    "webpack-cli": "^5.1.4"
  }
}
```

jika sudah mari kita coba jalankan menggunakan perintah ini
```sh
npm run build
```
hasil dari build tadi akan tersimpan di **./dist/main.js**

## Penggunaan
dari sini kita hanya perlu memanggil sekali saja di index.html atau super master dari layout kita. atau bisa saja kita taro di footer, yang penting html tersebut terpanggil di setiap halaman
```html
<script src="./dist/main.js"></script>
```

## Konfigurasi Custom
untuk mengubah directory hasil dari build webpack kita bisa gunakan perintah seperti ini
```sh
webpack -o ./nama-dir-yang-diinginkan
```

untuk mengubah nama dari hasil buildnya kita bisa menggunakan perintah seperti ini
```sh
webpack --output-filename bundle.js
```

jika digabungkan bisa menjadi seperti ini
```sh
webpack -o ./nama-dir-yang-diinginkan --output-filename bundle.js
```

konfigurasi ini bisa kita simpan di package.json npm dibagian
```json
"scripts": {
    "build": "webpack -o ./nama-dir-yang-diinginkan --output-filename bundle.js"
  },
```

## Konfigurasi Custom menggunakan webpack.config.js
buat sebuah file config dengan nama **webpack.config.js** pastikan namanya persis seperti itu, jika tidak webpack tidak akan bisa mengenali yang mana file konfigurasi custom yang kita punya
jika sudah isi file webpack.config.js nya dengan ini
```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index,js',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'bundle.js'
  },
  watch: true,
devtool: false,
};
```
keterangan:
- **mode**: berfungsi untuk menentukan build ini dalam mode development atau production, jika development hasil build kita masih bisa dibaca dengan baik walaupun sudah dibungkus menggunakan function eval() dari javasript, jika mode production hasil dari build tersebut akan sepenuhnya terminify dan susah untuk dibaca oleh manusia
- **entry**: key ini berfungsi untuk memberi tau dimana letak parent app kita berada
- **output**: key outpu berisikan sebuah object yang berfungsi untuk modifikasi file/folder yang nantinya akan menjadi output dari buiild tersebut.
  - **path**: path berisikan tempat directory hasil build kita akan ditaro
  - **filename**: key ini berfungsi untuk membuat nama file yang kita inginkan
- **watch**: watch berfungsi sebagai hot reload untuk mem-build ulang hasil kerja kita ketika kita membuat perubahan seperti save code baru, file baru atau bahkan menghapus kode
- **devtool**: berfungsi untuk menghilangkan eval() ketika mode yang kita gunakan adalah development. jika menggunakan mode production, key ini akan diabaikan
- 

## CSS Loaders & Style Loaders
### CSS Loaders
css loaders dan style loaders ini berpasangan namun configurasi nya terpisah, kalau css loaders hanya berfungsi sebagai library untuk load css tersebut kedalam webpack dan style loaders lah yang berfungsi untuk menerapkan nya masuk ke dalam web kita.

kita juga bisa menambahkan css kedalam hasil minify kita, dengan cara seperti ini kita tidak perlu memanggil file css kita kembali didalam <Head> di file html kita.
pertama-tama kita harus menginstal sebuah library bernama css-loader 
```sh
npm i css-loader -D
```
dan menambahkan key baru didalam webpack.config.js kita 
```js
module: {
  rules: [{
      test: /\.css$/i,
      use: ['css-loader'],
    }
  ]
}
```
Keterangan:
- **modules**: module berfungsi sebagai tempat penyimpanan library extension dari webpack
  - **rules**: berfungsi sebagai tempat deklarasi peraturan dari library extension yang ada
    - **test**: test ini berbentuk regex (regular expression) berfungsi sebagai filter file mana saja yang nantinya akan dibaca oleh library yang kita use 
    - **use**: use befungsi sebagai deklarasi library extension mana yang menggunakan rules ini

lalu didalam root/master dari js, kita harus menambahkan import css nya
```js
import css from './directory-penyimpanan-asset/style.css'
```
### Style Loaders
pertama tama kita harus menginstal style loaders terlebih dahulu dengan cara seperti ini
```sh
npm install style-loader --save-dev
```
lalu didalam webpack.config.js kita harus menambahkan style loaders ini ke dalam rules, seperti ini
```js
module: {
  rules: [{
      test: /\.css$/i,
      use: ['style-loader' ,'css-loader'],
    }
  ]
}
```

> [!IMPORTANT]
> Penting untuk diketahui, deklarasi didalam **use: []** harus didahul oleh style-loader.mengapa demikian? karna use dari rules ini dibaca dari kanan ke kiri, karna urutannya adalah css-loader harus membuild/mengload code css nya ke dalam webpack lalu dibuild sedangkan style-loader berfungsi agar harus css yang dibundler tersebut dapat diterapan di website kita. jika urutannya terbalik mungkin akan terjadi bug

## Babel-Loader
Babel Loader adalah libraryy transpiling dari webpack yang berfungi mengconvert fitur javascript versi ES6 kedalam javascript versi ES5 dan dibawahnya. tujuannya adalah supaya browser yang belum dapat membaca kode dari ES6 dapat menampilkan web yang kita buat seperti apa yang kita buat.

pertama tama kita harus menginstall terlebih dahulu babel-loader tersebut
```sh
npm install -D babel-loader @babel/core @babel/preset-env
```
lalu tambahkan object baru didalam array rules: [] seperti ini
```js
{
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}
```
Keterangan:
beberapa keterangan sudah dijelaskan di #css-loaders
- **exculde**: mengecualikan directory yang dituliskan di dalamt key tersebut
- jikalau use tersebut mengandung lebih dari 1 ketentuan, kita dapat mengembalikannya menggunakan object
  - preset: kombinasi library dari sebuah library yang kita gunakan
 
## Sass Loader
seperti halnya css loader, sass loader ini berfungsi sebagai tools/library tambahan dalam men-load file sass kedalam webpack bundler
langkah awal nya kita harus install terlebih dahulu sass-loader dan sass
```sh
npm install sass-loader sass --save-dev
```
lalu seperti biasa jangan lupa menambahkan rules untuk extension library yang ingin kita pakai
```js
{
  test: /\.s[ac]ss$/i,
  use: [
    //Creates 'style' nodes from JS strings
    'style-loader',
    // Translates CSS into CommonJs
    'css-loader',
    // Compiles Sass to CS5
    'sass-loader',
  ]
}
```
## Menambahkan Bootstrap kedalam webpack
cara ini digunakan untuk memblunding library bootsrap kedalam aplikasi kita secara langsung tanpa menggunakan CDN. pertama kita harus install bootstrap tersebut 
```sh
npm install bootstrap --save-dev
```

lalu jangan lupa untuk menambahkan @import ke dalam styling kita
jika kita menggunakan scss import seperti ini didalam file main.scss kita
```scss
@import 'bootstrap/scss/bootstrap'; 
```
dan jangan lupa tambahkan import di index.js javascript nya seperti ini
```js
import * as bootstrap from 'bootstrap';
```

## Cache
Ketika mendevelop sebuah web terkadang kita sering terkena cache yang menyebabkan perubahan yang kita simpan tidak dapat ditampilkan di browser. akhirnya kita harus hard reload dan clear cache pada browser kita. contohnya menggunakan google chrome dengan cara tekan ctrl + shift + i lalu ketika dev tools nya muncul tekan ctrl + shift + r. Mengapa demikian? karna saat terjadi perubahan browser terkadang hanya selalu check filename tanpa mencheck apa perubahan yang terjadi dalam file tersebut namun jangan khawatir, webpack sudah menangani hal seperti ini, kita cukup menambahkan [contenthash] di tengah nama file yang akan dioutput pada configurasi webpack kita.
```js
{
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'bundle.[contenthash].js',
    clean: true
  },
}
```
dan hasilnya akan seperti ini
![image](https://github.com/user-attachments/assets/bb61cb67-368f-412b-b5ad-2248336adca8)

> [!NOTE]
> parameter **clean** digunakan untuk menghapus file lama yang sudah di generate oleh webpack agar tidak menjadi sampah di dalam project kita.

## HtmlWebPackPlugin
namun hal ini justru mempersulit kita untuk mengexport nya ke dalam html kita, karna bayangkan saja setiap kita build, nama file yang rumit tersebut akan berubah ubah nantinya. maka dari itu kita harus mengisntal sebuah library tambahan bernama HtmlWebPackPlugin
pertama tama install plugin tersebut terlebih dahulu
```sh
npm install html-webpack-plugin --save-dev
```
lalu tambahkan path baru di line atas dalam file webpack.config.js
```js
const HtmlWebPackPlugin = require('html-webpack-plugin')
``` 
dan jangan lupa menambahkan index.html kita ke dalam configurasi serta menghapus <script src="./path-bundler.js"></script> yang kita gunakan. karna nanti nya script tersebut akan digenerate otomatis oleh webpack
yang nantinya akan seperti ini di dalam webpack.config.js
```js
plugins: [new HtmlWebPackPlugin({
    template: './src/index.html'
  })]
```
dan hasilnya akan seperti ini

```js
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index,js',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'bundle.js',
    clean: true
  },
  plugins: [new HtmlWebPackPlugin({
    template: '.src/index.html'
  })],
  watch: true,
  devtool: false,
};
```

## Configuration Mode Development & Mode Production
kita dapat memisahkan configurasi untuk development dan production dengan cara membuat file berbeda seperti contohnya **webpack.dev.js** & **webpack.prod.js**. Pertama tama kita buat dulu file configurasi untuk development dan juga production nya dengan cara memisahkan apa yang akan dipakai oleh umum di webpack.config.js dan yang spesifik untuk development di webpack.dev.js dan yang spesifik untuk production di webpack.prod.js
### webpack.development.js
```js
const path = require('path')

module.exports = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.js',
        clean:true
    }
}
```
### webpack.prod.js
```js
const path = require('path')

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.[contenthash].js',
        clean:true
    },
    
}
```

### webpack.config.js
```js
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    entry: '/src/index.js',
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
              //Creates 'style' nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJs
              'css-loader',
              // Compiles Sass to CS5
              'sass-loader',
            ]
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ],
    },
    watch: true,
    devtool: false   
}
```
tapi kita perlu menggabungkan kedua hal yang umum di webpack.config.js dan yang spesifik di masing masing webpack.dev.js dan webpack.prod.js, bagaimana cara nya? caranya dengan menggunakan tools **Webpack Merge**. seperti biasa kita install terlebih dahulu tools tersebut
```sh
npm install webpack-merge --save-dev
```
dan menggunakannya di configurasi spesifik kita yaitu webpack.prod.js & webpack.dev.js seperti ini
```js
const path = require('path')
const { merge } = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.[contenthash].js',
        clean:true
    },
});
```

namun bagaimana kita mengksekusi file kedua file tersebut secara terpisah sedangkan jika kita menjalankan webpack yang akan dieksekusi selalu file webpack.config.js. kita bisa memisahka hal tersebut dengan cara menambahkan option didalam script package.json kita seperti ini
```json
"scripts": {
    "build": "webpack",
    "dev": "webpack --config webpack.dev.js",
    "prod": "webpack --config webpack.prod.js"
},
```
cara memanggilnya pun sangat mudah tinggal kita panggil seperti ini
```sh
npm run dev //untuk development
npm run prod //untuk production
```
