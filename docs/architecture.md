# モジュール構成ドキュメント

**作成日：** 2026-09-16
**対象：** `platform/` 配下（不動産紹介プラットフォームMVP実装リポジトリ）
**関連：** `real_estate_referral_platform_kickoff_instructions_20260916.md`

このドキュメントは、開発環境構築フェーズ（着手指示書ステップ0）で作成したモジュールの物理配置・構成・仕組みをまとめたもの。ビジネスロジック（案件CRUD・認証等）はまだ実装しておらず、各フレームワークの初期スケルトンの状態。

---

## 1. 全体構成

```
platform/                          ← Gitリポジトリのルート
├── frontend/                      ← Next.js（画面）
├── backend/                       ← Spring Boot（API）
├── docs/                          ← このドキュメント一式
├── docker-compose.yml             ← ローカルDB定義
├── .gitignore
└── README.md
```

**仕組み（データの流れ）：**

```
[ブラウザ] → frontend (Next.js, :3000)
                 │  ※現状はまだAPI呼び出しコードなし（雛形のみ）
                 ▼
            backend (Spring Boot, :8080)
                 │  Spring Data JPA 経由
                 ▼
            PostgreSQL（Dockerコンテナ, :5432）
```

frontendとbackendは別プロセス・別リポジトリ扱いではなく**同一リポジトリ内のモノレポ構成**（サブディレクトリを分けているだけ）。デプロイ時は個別にビルド・ホスティングする想定（例：frontendをVercel、backendをコンテナ環境など）。

---

## 2. `frontend/`（Next.js）

### 構成

```
frontend/
├── src/app/
│   ├── layout.tsx      ← 全ページ共通レイアウト（<html>/<body>、フォント設定）
│   ├── page.tsx        ← トップページ（"/"）。現状はcreate-next-appのデフォルト画面のまま
│   └── globals.css     ← Tailwind CSSの読み込み・グローバルスタイル
├── public/              ← 静的ファイル（SVGアイコン等、デフォルトのまま）
├── next.config.ts       ← Next.js設定（現状ほぼデフォルト）
├── tsconfig.json        ← TypeScript設定
├── eslint.config.mjs    ← Lint設定
├── postcss.config.mjs   ← Tailwind CSS用PostCSS設定
└── package.json
```

### 技術選定・仕組み

- **App Router**（`src/app/`配下にルーティングをファイルベースで定義する方式）。ページ追加は `src/app/<path>/page.tsx` を作成するだけで自動的にルーティングされる。
- **TypeScript**：型安全性のため全ファイル`.ts`/`.tsx`。
- **Tailwind CSS v4**：ユーティリティクラスでスタイリング。`postcss.config.mjs`経由でビルド時に処理される。
- **バージョン注記**：`next@16.3.5` は学習データ時点のNext.jsと破壊的変更がある可能性がある旨、`frontend/AGENTS.md`（`next dev`実行時に自動生成されるファイル）に明記されている。今後Next.js固有のAPIを使う際は `node_modules/next/dist/docs/` 内のドキュメントを確認してから実装する方針。

### 未実装（今後のステップで追加予定）

- LP（HP）のデザイン・コピー移植（プロトタイプHTML `real_estate_referral_hp_prototype.html` はまだ本リポジトリに存在しない）
- 問い合わせフォームのUI・API連携
- ワークスペース（管理画面）の画面・ログインUI
- 紹介先マスタ画面

---

## 3. `backend/`（Spring Boot）

### 構成

```
backend/
├── src/main/java/com/miyazaki/realestate/referral/
│   └── ReferralPlatformApplication.java   ← エントリポイント（@SpringBootApplication）
├── src/main/resources/
│   └── application.properties             ← DB接続・サーバーポート設定
├── src/test/java/.../ReferralPlatformApplicationTests.java
├── pom.xml                                ← Maven依存関係定義
├── mvnw / mvnw.cmd                        ← Maven Wrapper（Maven本体インストール不要で実行可）
└── .mvn/wrapper/                          ← Wrapper用設定
```

### 基本情報

| 項目 | 値 |
|------|-----|
| groupId | `com.miyazaki.realestate` |
| artifactId | `referral-platform` |
| ベースパッケージ | `com.miyazaki.realestate.referral` |
| Javaバージョン | 21 |
| Spring Bootバージョン | 4.1.1 |
| ビルドツール | Maven（Wrapper経由） |

### 依存関係（`pom.xml`）と役割

| 依存関係 | 役割 |
|---------|------|
| `spring-boot-starter-webmvc` | REST API（コントローラ）を作るための基盤 |
| `spring-boot-starter-data-jpa` | PostgreSQLへのORMアクセス（Hibernate経由） |
| `spring-boot-starter-security` | 認証・認可の枠組み。**現状は未設定**（後述） |
| `spring-boot-starter-validation` | リクエストボディのバリデーション（`@Valid`等） |
| `org.postgresql:postgresql` | PostgreSQL JDBCドライバ（実行時のみ使用） |
| `lombok` | `@Getter`/`@Setter`等のボイラープレート削減（アノテーションプロセッサ） |
| 各`*-test`系 | テスト実行時のみ有効 |

### 仕組み・現状の挙動

- `ReferralPlatformApplication` の `@SpringBootApplication` により、`com.miyazaki.realestate.referral` パッケージ配下を自動スキャン。今後 `controller` / `service` / `repository` / `entity` 等のサブパッケージを作成すれば自動的に認識される。
- `application.properties` でPostgreSQL接続先を固定値指定（`docs/dev_environment.md` 参照）。
- `spring.jpa.hibernate.ddl-auto=validate` に設定済み。これは「Hibernateにテーブルを自動生成させず、既存スキーマとの整合性チェックのみ行う」設定。→ **DBスキーマは手動のマイグレーションファイルで管理する方針**（着手指示書ステップ1）のための準備。現時点ではEntityクラスが1つも無いため、このプロパティは実質何もしていない。
- `spring-boot-starter-security` が依存関係に入っているため、Spring Bootの自動設定により**全エンドポイントがデフォルトで認証必須**になっており、起動毎にランダムパスワードが発行される（`docs/dev_environment.md` 3章参照）。独自のログイン機構（`users`テーブル＋メール/パスワード）を実装する際に、この自動設定を上書きするカスタム`SecurityConfig`が必要になる。

### 未実装（今後のステップで追加予定）

- `leads` / `referral_partners` / `users` に対応するEntity・Repository・Controller
- DBマイグレーション（Flyway等の導入を想定、`pom.xml`に未追加）
- カスタム認証（`SecurityConfig`）
- LINE連携（Messaging API通知）

---

## 4. `docker-compose.yml`

```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: referral-platform-db
    environment:
      POSTGRES_DB: referral_platform
      POSTGRES_USER: referral_app
      POSTGRES_PASSWORD: referral_app_dev_password
    ports:
      - "5432:5432"
    volumes:
      - referral-platform-db-data:/var/lib/postgresql/data
```

- サービスは`postgres`の1つのみ。frontend/backendはDocker化せず、開発中はホストマシン上で直接 `npm run dev` / `mvnw spring-boot:run` を実行する構成（ホットリロードを活かすため）。
- `volumes`でコンテナを消してもデータが残るようにしている（`docker compose down -v`で完全削除）。

---

## 5. `docs/`

| ファイル | 内容 |
|---------|------|
| `dev_environment.md` | インストール済みツール・バージョン・パス・DB接続情報・起動手順 |
| `architecture.md`（本ファイル） | モジュール構成・技術選定理由・仕組み |

---

## 6. その他の設定ファイル

| ファイル | 場所 | 役割 |
|---------|------|------|
| `.claude/launch.json` | `03_Business/`（リポジトリ外、プロジェクトルート） | Claude Codeのブラウザプレビュー機能からNext.js devサーバーを起動するための設定。`npm --prefix Website/Real_Estate_Business/platform/frontend run dev` を実行する構成 |

---

## 更新履歴

- 2026-09-16：初版作成（開発環境構築完了時点のスケルトン構成を記録）
