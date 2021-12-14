---
title: 'Rustプログラミング言語学習記 Part3 (#5 構造体､ #6 Enumとパターンマッチング)'
date: '2021-12-13'
tags: ['Rust', '入門']
---

Rust に入門することにしました｡

Rust 学習中につまずいたりなるほどと思ったポイントをアウトプットがてら書き連ねていこうと思います｡

手始めに公式のチュートリアルから読むことにしました｡

[The Rust Programming Language 日本語](https://doc.rust-jp.rs/book-ja/)

この記事は､上記の｢[#4 所有権](https://doc.rust-jp.rs/book-ja/ch04-00-understanding-ownership.html)｣についてのアウトプットです｡

インプットとアウトプットを同時に行っているので､更新遅いです｡

※は僕のコメントです｡

<br>

## #5 構造体

構造体とは繋がりのある複数のデータ型をまとめ名前付けができる独自のデータ型である｡

構造体の要素にも名前をつけることができ､より柔軟にデータにアクセスすることができる｡

構造体は`struct`キーワードで定義する｡

その次に､構造体の名前を定義する｡

そして､波括弧内にデータ片と型を定義する｡

これを**フィールド**と言う｡

構造体のインスタンスが有効な間､そのインスタンスが全データを所有している必要がある｡

別のデータの参照を保持する場合､ライフタイム(#10)を使用する必要がある｡

```Rust
struct User {
    username: String,
    email: String,
    active: bool,
    sign_in_count: u64,
}
```

構造体を使用するには､各フィールドに対して具体的な値を指定しインスタンスを生成する｡

フィールドは構造体で宣言したとおりの順番でなくても良い｡

```Rust
let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
```

構造体から特定の値を得るには､ドット記法が利用できる｡

新しいインスタンスを生成する際､`mut`キーワードをつけることで､可変なインスタンスを生成できる｡

```Rust
let mut User1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};

user1.email = String::from("anotheremail@example.com");
```

生成したインスタンスは全体が可変である必要があり､一部のみ可変にすることはできない｡

また､構造体の新規インスタンスを関数本体の最後の式として生成し､そのインスタンスを返すことを暗示できる｡

仮引数とフィールド名が同じ場合､省略記法が利用できる｡

```Rust
fn new_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

### _構造体更新記法で他のインスタンスからインスタンスを生成する_

`..`記法を利用することで､明示的にセットされていない残りのフィールドが､与えられたインスタンスのフィールドと同じ値になるよう指定できる｡

```Rust
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
}
```

<br>

### **タプル構造体**

構造体名により何らかの意味を持つものの､フィールド名が必要ない場合､**タプル構造体**と呼ばれるタプルに似た型を定義することができる｡

タプル構造体は､構造体のフィールドが同じであっても､それぞれが独自の型になる｡

そのため､あるタプル構造体を引数に持つ関数などがある場合､同じフィールドを持つ別のタプル構造体を渡すことはできない｡

<br>

### **ユニット様構造体**

一切フィールドを持たない構造体を定義することができる｡

これらは`()`やユニット型と似た振る舞いをするため､ユニット様構造体と呼ぶ｡

<br>
<br>

## #5.3 メソッド記法

メソッドは構造体に定義される｡

第 1 引数は必ず`self`であり､これはメソッドが呼ばれている構造体のインスタンス自身を指す｡

<br>

### **メソッド定義**

メソッドを定義するには､`impl`ブロックから始める｡

```Rust
struct Human {
    name: String,
    height: f64,
    weight: f64,
}

impl Human {
    fn get_bmi(&self) -> f64 {
        self.weight / (self.height * self.height)
    }
}

fn main() {
    let human1 = Human {
        name: String::from("John"),
        height: 2.0,
        weight: 100.0,
    };

    println!("{}'s BMI is {}", human1.name, human1.get_bmi());
}
```

その中で関数を宣言し､最初の引数に`&self`を渡す｡

引数をミュータブルにするには`&mut self`とする｡

メソッドは､`self`の所有権を奪ったり､ここでしているように不変で`self`を借用したり､可変で`self`を借用したりできる｡

`self`だけを第 1 引数にしてインスタンスの所有権を奪うメソッドを定義することは稀である｡

- メソッドが`self`を何か別のものに変形し､変形後に呼び出し元が元のインスタンスを使用できないようにしたい場合に使用される｡

`impl`ブロックは複数存在させることができる｡

_※`(&self)`は`(self: &Self)`の省略記法である｡_

<br>

> ->演算子はどこに行ったの？<br>C と C++では､メソッド呼び出しには 2 種類の異なる演算子が使用されます: オブジェクトに対して直接メソッドを呼び出すのなら､`.`を使用するし､オブジェクトのポインタに対してメソッドを呼び出し､ 先にポインタを参照外しする必要があるなら､`->`を使用するわけです｡ 言い換えると､object がポインタなら､`object->something()`は､`(*object).something()`と同等なのです｡<br>Rust には`->`演算子の代わりとなるようなものはありません; その代わり､Rust には､ 自動参照および参照外しという機能があります｡Rust においてメソッド呼び出しは､ この動作が行われる数少ない箇所なのです｡<br>動作方法はこうです: `object.something()`とメソッドを呼び出すと､ コンパイラは object がメソッドのシグニチャと合致するように､自動で`&`か`&mut`､`*`を付与するのです｡ 要するに､以下のコードは同じものです:

```Rust
p1.distance(&p2);
(&p1).distance(&p2);
```

> 前者の方がずっと明確です｡メソッドには自明な受け手(`self` の型)がいるので､この自動参照機能は動作するのです｡ 受け手とメソッド名が与えられれば､コンパイラは確実にメソッドが読み込み専用(`&self`)か､書き込みもする(`&mut self`)のか､ 所有権を奪う(`self`)のか判断できるわけです｡メソッドの受け手に関して借用が明示されないというのが､ 所有権を実際に使うのが Rust において簡単である大きな理由です｡<br>[->演算子はどこに行ったの？](https://doc.rust-jp.rs/book-ja/ch05-03-method-syntax.html#-%E6%BC%94%E7%AE%97%E5%AD%90%E3%81%AF%E3%81%A9%E3%81%93%E3%81%AB%E8%A1%8C%E3%81%A3%E3%81%9F%E3%81%AE)より

_※メソッドを実装した時に､受けての受け方を明示的にすることにより､メソッドを呼ぶ際に参照や参照外しを気にする必要がなくなる!!!_

<br>

複数の引数をとるメソッドを作成する場合､第 2 引数以降に指定する｡

```Rust
struct Human {
    name: String,
    height: f64,
}

impl Human {
    fn compare_height(&self, human: &Human) -> bool {
        self.height >= human.height
    }
}

fn main() {
    let human1 = Human {
        name: String::from("John"),
        height: 2.0,
    };

    let human2 = Human {
        name: String::from("Jack"),
        height: 1.0,
    };

    println!(
        "Is it true that {} is taller than {}?. It's {}",
        human1.name,
        human2.name,
        human1.compare_height(&human2)
    );
}
```

### **関連関数**

`impl`ブロックには`self`を引数に取らない関数を定義することもできる｡

これは､構造体に関連付けられているもので､**関連関数**と呼ぶ｡

関連関数は関数であり､メソッドではない｡
~~??｢モンスターではない､神だ｣~~

対象となる構造体インスタンスが存在しないためである｡

関連関数は構造体の新規インスタンスを返すコンストラクタによく使用される｡
_例: `String::from();`_

```Rust
impl Human {
    fn new_human(name: String, height: f64) -> Human {
        Human { name, height }
    }
}

let human3 = Human::new_human(String::from("Mario"), 1.7);
```

関連関数を呼び出すには､構造体名に`::`記法を使用する｡

この関数は､構造体によって名前空間分けがなされている｡

<br>
<br>

## #6 Enum とパターンマッチング

Enum は取りうる値を列挙することで､型を定義できる｡

そのため､**列挙型**とも呼ばれる｡

Rust の enum は関数型言語に存在する代数的データ型に最も酷似している｡

<br>

### **Enum の定義**

Enum の値は､その列挙子のいずれか 1 つにしかなり得ない｡

ただ､IP アドレスのように複数の型としての表現が存在しようとも､それらの根源は IP アドレスなので､コードがいかなる種類の IP アドレスにも適用される場面を扱う際には､同じ型として扱われるべきである｡

```Rust
enum IpAddrKind {
    v4,
    v6,
}
```

<br>

### **Enum の値**

Enum の各列挙子のインスタンスは Enum の識別子に`::`で生成できる｡

```Rust
let four = IpAddrKind::v4;
let six = IpAddrKind::v6;
```

Enum の列挙子は､その識別子の元に名前分けされている｡

よって､`IpAddrKind::v4`と`IpAddrKind::v6`は両方とも､同じ型`IpAddrKind`となる｡

そのため､識別子を引数に取る関数を定義することもできる｡

```Rust
fn route(ip_type: IpAddrKind) { }
```

そして､この関数はどの列挙子に対しても呼び出せる｡

```Rust
route(IpAddrKind::V4);
route(IpAddrKind::V6);
```

#### **Enum にデータをもたせる**

上で定義した enum はデータを保持する方法がない｡

つまり､どのような種類かを知っているだけである｡

各 enum の列挙子に直接データを格納して､列挙子と値を紐付けることができる｡

また､Enum も構造体と同様`impl`を使ってメソッドを追加することができる｡

```Rust
enum IpAddrKind {
    v4(String),
    v6(String),
}

let home = IpAddrKind::v4(String::from("127.0.0.1"));

let loopback = IpAddrKind::v6(String::from("::1"));
```

Enum の各列挙子にデータを直接持たせられるので､余計な構造体を作る必要がない｡

また､各列挙子に紐付けるデータの型と量は､異なっていてもよい｡

```Rust
enum IpAddrKind {
    v4(u8, u8, u8, u8),
    v6(String),
}

let home = IpAddrKind::v4(127, 0, 0, 1);

let loopback = IpAddrKind::v6(String::from("::1"));
```

<br>

_※標準ライブラリではアドレスデータを異なる構造体として定義し､それらを enum の列挙子に埋め込むことで定義されています｡_

```Rust
struct Ipv4Addr {
    // 省略
}

struct Ipv6Addr {
    // 省略
}

enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}
```

_このコードは､enum の各列挙子にあらゆる値を格納できることを示しています｡(文字列､数値型､構造体など)また､他の enum を含むことさえできます｡_

<br>

### **Option enum**

Option enum は標準で定義されている enum であり､値が存在するかしないかを判別できる｡

Rust は null 安全であり､言語仕様として`null`がないため､値が存在するかしないか､という一般的な概念をコード化するため､`Option<T>`が定義されている｡

`Option<T>`は標準ライブラリで､以下のように定義されている｡

```Rust
enum Option<T> {
    None,
    Some(T),
}
```

`Option<T>` は初期化処理(prelude)に含まれており､スコープに導入する必要がない｡

また､列挙子`None`, `Some`は`Option::`接頭辞なしでも利用できる｡

`<T>`はジェネリック型引数であり渡された値に沿う型になる｡(#10)

そのため､`Option<T>`型を使用し､数値型や文字列型等を保持できる｡

```Rust
let some_number = Some(5);
let some_string = Some("Hello");

let absent_number: Option<i32> = None;
```

このとき､`None`を代入するとコンパイラは変数の型を推論できないため､型を明記しなければならない｡

`Some`値がある時､値が存在するとわかり､その値は`Some`に保持されている｡

`None`値がある場合､`null`と同じように､有効な値がないことを示す｡

ではなぜ `null` ではなく`None`が好ましいかと言うと､`Option<T>`と`T`は異なる型という扱いのため､コンパイラは`Option<T>`を確実に有効な値と認識しないためである｡

つまり､`Option<T>`と`T`が`i32`型であった場合､四則演算等ができないということである｡

```Rust
let x: Option<i32> = Some(5);
let y: i32 = 10;

let sum = x + y;
// error[E0369]: cannot add `i32` to `Option<i32>`
// To fix this error, please check that this type implements this binary operation.
```

Rust において､`i32`, `&str`等の型の値は､コンパイラが常に値が有効であると確認する｡

しかし､`Option<T>`の場合､値を保持していない可能性を考慮する必要があり､コンパイラは値を使用する前に､そのような状況であるかを確認し､指摘してくれる｡

なので､`T`型の処理を行う場合､`Option<T>`を`T`に変換する必要がある｡

そのような値で null 安全に処理を進めるには､`Some(T)`に値がある時のみ実行されるコードと､`None`時のみ実行されるコードが必要になる｡

`Some(T)`時に実行されるコード内では､もちろんその値が`None`出ないことが保証されるため､`Option<T>`型は`T`型として扱うことができる｡

つまり､Enum の列挙子によって､違うコードが走り､そのコードがマッチした値を使用できる必要がある｡

<br>
<br>

## #6.2 パターンマッチング

### **match フロー演算子**

Rust には一連のパターンに対して値を比較し､マッチしたパターンに応じてコードを実行する､`match`という強力なフロー制御演算子がある｡

パターンは､リテラル値､変数名､ワイルドカードやその他多数のもの(#18)で構成できる｡

`match`式の非常に強力な点は､パターンの表現力とコンパイラがとりうる全てのパターンを処理しているか確認しているところにある｡

また､上から順番に値を評価し､適合する最初のパターンが実行され､残りのパターンについては評価しない｡

また､**式であるため､結果を変数に束縛できる**｡

```Rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u32 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

まず`match`キーワードに続けて式(`coin`)を並べる｡

`if`と大きく異なる点は､`if`では式が論理値を返す必要があるが､`match`ではその必要がないことである｡

(この例における`coin`の型は､`Coin`enum である)

そのブロックの中で､**アーム**を組み立てる｡

1 本のアームには､パターンと何らかのコードの 2 つの部品がある｡

この例の最初のアームでは`Coin::Penny`という値パターンであり､パターンと動作するコードを区別する`=>`演算子が続く｡

続くコードは､ただの値`1`である｡

各アームは次のアームとカンマ(`,`)で区切られる｡

この`match`式が実行されると､
