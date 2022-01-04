---
title: 'Rustプログラミング言語学習記 Part4 (#7 肥大化していくプロジェクトをパッケージ、クレート、モジュールを利用して管理する)'
date: '2022-01-04'
tags: ['Rust', '入門']
---

あけましておめでとうございます 🎍 ㊗ 🎍

半月ぶりの更新となりますね｡

やはり師走､文字通り忙しくなかなか Rust の学習も出来ませんでした(泣)

さらに資格取得のための勉強も始めたので､全然進められない｡｡｡

年も明け､ようやく落ち着いてきたので､ぼちぼち学習を再開していこうと思います｡

[The Rust Programming Language 日本語](https://doc.rust-jp.rs/book-ja/)

この記事は､上記の｢[#7 肥大化していくプロジェクトをパッケージ、クレート、モジュールを利用して管理する](https://doc.rust-jp.rs/book-ja/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html)｣についてのアウトプットです｡

<br>

## #7 肥大化していくプロジェクトをパッケージ、クレート、モジュールを利用して管理する

パッケージは複数のバイナリクレートからなる｡

また､ライブラリクレートを 1 つ持つことができる｡

機能をグループにまとめられることに加え､実装の詳細がカプセル化されることにより､コードをより高いレベルで再利用することができる｡

その為､書き手はその実装の詳細を知ることなくそのコードを呼び出すことができる｡

Rust には､どの詳細を公開するか､どの詳細を非公開にするのか､どの名前がプログラムのそれぞれのスコープにあるのか､といったコードのまとまりを保つためのたくさんの機能があり､以下のものが含まれる｡

- パッケージ
  - クレートをビルドし､テストし､共有することができる Cargo の機能
- クレート
  - ライブラリか実行可能ファイルを生成する､木構造をしたモジュール群
- モジュールと use
  - これを使用することで､パスの構成､スコープ､公開するか否かを決定できる｡
- パス
  - 要素(構造体や関数､モジュール等)に名前をつける方法

<br>

## #7.1 パッケージとクレート

**クレートルート** (**crate root**)とは､Rust コンパイラの開始点となり､クレートのルートモジュールを作るソースファイルである｡

**パッケージ**はある機能群を提供する 1 つ以上のクレートである｡

パッケージは**Cargo.toml**という､それらのクレートをどのようにビルドするかを説明するファイルを持っている｡

パッケージは 0 個か 1 個のライブラリクレートを持っていないといけない｡

バイナリクレートはいくらでも持っていてよいが､少なくとも 1 つのクレートを持っていないといけない｡

`cargo new`を実行した際､Cargo は**Cargo.toml**を作成し､パッケージを作った｡

しかし､その中身を見ても､`src/main.rs`についての記述はない｡

これは､Cargo が`src/main.rs`が､パッケージと同じ名前を持つ､バイナリクレートのクレートルートであるという慣習に従っているためである｡

同様に､`src/lib.rs`が含まれていたら､パッケージには同じ名前のライブラリクレートが含まれており､`src/lib.rs`がそのクレートルートであると判断する｡

Cargo はクレートルートを`rustc`に渡し､ライブラリやバイナリをビルドする｡

クレートは､関連した機能を 1 つのスコープにまとめることで､その機能が複数のプロジェクト感で共有を容易にする｡

クレートの機能をそのスコープの中に紐付けることは､ある機能が自分のクレートで定義されたのか､他のクレートで定義されたのかを明確にし､名前の衝突を予防する｡

例えば､`rand`クレートは`Rng`というトレイトを提供しているが､更に自分たちのクレートで`Rng`という名前の`struct`を宣言することもできる｡

クレートの機能はそのスコープ内の名前空間に紐付けられているので､`rand`クレートを導入しても､コンパイラは`Rng`という名前が何を意味するのかについて混乱することはない｡

<br>

## #7.2 モジュールの定義

**モジュール**はクレート内のコードをグループ化し､可読性と再利用性を上げるのに役立つ｡

モジュールは要素の**プライバシー**も制御できる｡

プライバシーとは､要素がコードの外で使える**公開 public**であるか､内部の実装の詳細であり､外部では使えない**非公開 private**かである｡

モジュールは`mod`キーワードを書き､次にモジュールの名前を指定することで定義できる｡

また､モジュールの中には､他のモジュールや構造体､enum､定数､トレイト､関数を置くことができる｡

```Rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
```

_Listing 7-1: front_of_house モジュールにその他のモジュールが含まれ、さらにそれらが関数を含んでいる_

モジュールを使うことで､関連する定義を 1 つにまとめ､関連する理由を名前で示すことができる｡

このコードを使うプログラマーは､定義を全部読むことなく､グループ単位でコードを読み進められるので､欲しい定義を見つけ出すことが簡単になり､また新しい機能を付け加えるプログラマーは､プログラムのまとまりを保つために､どこにその機能のコードを置けばいいか分かる｡

クレートルートがそう呼ばれるのは､**モジュールツリー**と呼ばれるクレートのモジュール構造の根っこ(ルート)に`src/main.rs`と`src/lib.rs`の 2 つのファイルの中身が`crate`というモジュールを形成するからである｡

```Rust
crate
 └── front_of_house
     ├── hosting
     │   ├── add_to_waitlist
     │   └── seat_at_table
     └── serving
         ├── take_order
         ├── serve_order
         └── take_payment
```

_Listing 7-2: Listing 7-1 のコードのモジュールツリー_

<br>

## #7.3 モジュールツリーの要素を示すためのパス

ファイルシステムの中を移動する時と同じように､Rust にモジュールツリー内の要素を見つけさせるには､**パス**を使用する｡

パスは 2 つの形を取ることができる:

- **絶対パス**

  - クレートの名前か`crate`という文字列を使うことで､クレートルートからスタートする｡

- **相対パス**
  - `self`､`super`または今のモジュール内の識別子を使用することで､現在のモジュールからスタートする｡(ファイルシステムの`../`に似ている｡)

絶対パスも相対パスも､その後に 1 つ以上のダブルコロン(`::`)で仕切られ続く｡

_例: `crate::front_of_house::serving::take_payment()`_

どちらを使うかはプロジェクトによって決めるべきであるが､絶対パスのほうが好ましい｡

### **パスを pub キーワードで公開する**

`pub`キーワードを使用することで､モジュールを公開することができる｡

モジュールを公開する際は､親のモジュールも公開されている必要がある｡

また､兄弟モジュールは非公開でも参照できる｡

```Rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    crate::front_of_house::hosting::add_to_waitlist();
}
```

_モジュール`front_of_house`は非公開であるが､`eat_at_restaurant()`と兄弟であるため､参照できる｡_

### **構造体と enum を公開する**

構造体や enum も`pub`を使って公開できるが､いくつか注意点がある｡

構造体定義の前に`pub`を使うと､構造体は公開されるが､構造体のフィールドは非公開のままになる｡

構造体はそれぞれのフィールドを公開するか否かを個々に決めることができる｡

```Rust
mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}

pub fn eat_at_restaurant() {
    // Order a breakfast in the summer with Rye toast
    // 夏 (summer) にライ麦 (Rye) パン付き朝食を注文
    let mut meal = back_of_house::Breakfast::summer("Rye");
    // Change our mind about what bread we'd like
    // やっぱり別のパンにする
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);

    // The next line won't compile if we uncomment it; we're not allowed
    // to see or modify the seasonal fruit that comes with the meal
    // 下の行のコメントを外すとコンパイルできない。食事についてくる
    // 季節のフルーツを知ることも修正することも許されていないので
    // meal.seasonal_fruit = String::from("blueberries");
}
```

[Listing 7-9: 公開のフィールドと非公開のフィールドとを持つ構造体](https://doc.rust-jp.rs/book-ja/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html#%E6%A7%8B%E9%80%A0%E4%BD%93%E3%81%A8enum%E3%82%92%E5%85%AC%E9%96%8B%E3%81%99%E3%82%8B)

上記コードにおいて､`back_of_house::Breakfast`の`toast`フィールドは公開されているので､`eat_at_restaurant`において`toast`をドット記法を使って読み書きできる｡

一方`seasonal_fruit`は非公開なので､`eat_at_restaurant`において､`seasonal_fruit`は使えない｡

また､`back_of_house::Breakfast`は非公開のフィールドを持っているので､`Breakfast`のインスタンスを作成(construct)する**公開された**関連関数が構造体に提供されている必要がある｡

もしなければ､`eat_at_restaurant`において､非公開である`seasonal_fruit`の値を設定出来ないため､`Breakfast`インスタンスを作成出来ない｡

一方で､enum は公開すると､その variant は全て公開される｡

そのため､`pub`は`enum`キーワードの前だけに置けば良い｡

```Rust
mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}
```

<br>

## #7.4 use キーワードでパスをスコープに持ち込む

`use`キーワードを使用することで､パスを一度スコープに持ち込んでしまえば､それ以降はパス内の要素がローカルにあるかのように呼び出すことができる｡

```Rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
```

`use`とパスをスコープに追加することは､シンボリックリンクを張ることに似ている｡

`use crate::front_of_house::hosting`をクレートルートに追加することで､`hosting`はこのスコープで有効な名前となる｡

構造体や enum その他要素を`use`で持ち込むときは､フルパスを書くのが慣習的である｡

```Rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}
```

しかし､同じ名前の 2 つの要素を`use`でスコープに持ち込むことは Rust では許されない｡

そのため､親モジュールを使うことによって､`Result`型を区別できる｡

```Rust
use std::fmt;
use std::io;

fn function1() -> fmt::Result {}

fn function2() -> io::Result<()> {}
```

### **新しい名前を as キーワードで与える**

同じ名前の 2 つの型を`use`を使って同じスコープに持ち込むもう 1 つの解決策として､パスの後ろに`as`と型のローカル名､即ちエイリアスをしてすればよい｡

```Rust
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {}

fn function2() -> IoResult<()> {}
```

### **pub use を使って名前を再公開する**

`use`キーワードでスコープに持ち込んだものは非公開である｡

そのため､再度有効にする場合は､`pub use`を使用する｡

このテクニックは､自分たちのスコープに持ち込むだけでなく､他の人が持ち込むことも可能にすることから､**再公開**(**re-exporting**)と呼ばれている｡

```Rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
```

### **外部のパッケージを使う**

[crates.io](https://crates.io/)は Rust のパッケージのデフォルトリポジトリである｡

Cargo.toml の dependency に利用したいパッケージを追加すると､パッケージとその全ての依存がダウンロードされ､プロジェクトにて使用できるように Cargo に命令する｡

そしてその定義を私達のパッケージのスコープに持ち込むために､`use`を使って要素をクレートからスコープへと持ち込めば良い｡

また､標準ライブラリ(`std`)も外部にあるクレートである｡

しかし標準ライブラリは Rust 言語に同梱されているので､Cargo.toml に記述する必要はない｡

ただし､その要素をこちらのパッケージのスコープに持ち込むには`use`を使って参照する必要がある｡

### **巨大な use のリストをネストしたパスを使って整理する**

ネストしたパスを使用することで､同じ一連の要素を 1 行でスコープに持ち込むことができる｡

```Rust
use std::{cmp::Ordering, io};
use std::io::{self, Write};
// この行は std::io とstd::io::Write をスコープに持ち込む
```

### **glob 演算子**

パスにおいて定義されている全ての公開要素をスコープに持ち込みたいときは､glob 演算子`*`を使用する｡

```Rust
use std::collections::*;
```

<br>

## #7.5 モジュールを複数のファイルに分割する

`src/lib.rs`に`mod front_of_house`宣言のみを記述すると､モジュールの中身を`src/front_of_house.rs`に見に行く｡

```Rust
// src/lib.rs
mod front_of_house;

pub use crate::front_of_house::hosting;
```

_と記述されている場合､`src/front_of_house.rs`を見に行く_

```Rust
// src/front_of_house.rs
pub mod hosting {
    pub fn add_to_waitlist() {}
}
```

これは､ネストされているモジュールでも同じである｡

```Rust
// src/front_of_house.rs
pub mod hosting;
```

```Rust
// src/front_of_house/hosting.rs
pub fn add_to_waitlist() {}
```

これらはそのまま`crate::front_of_house::hosting::add_to_waitlist()`として呼び出せる｡

## まとめ

モジュールを適切に分割することで､より簡潔かつ容易に､要素の再利用を行うことができる｡
