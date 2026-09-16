# 開発環境・認証情報一覧

**作成日：** 2026-09-16
**対象マシン：** ローカル開発機（Windows 11 Pro）

> ⚠️ `docs/`配下はGit管理対象のため、本ドキュメントには**実際のパスワード等の値は記載しない**。実際の値は `.env`・`backend/src/main/resources/application-local.properties`（いずれもGit管理外）を参照すること。ここでは「どのファイルに」「どの項目が」入っているかだけを記録する。

---

## 1. インストール済みツール

| ツール | バージョン | インストール方法 | インストール先パス |
|--------|-----------|-----------------|-------------------|
| Node.js | v24.19.0（LTS） | `winget install OpenJS.NodeJS.LTS` | `C:\Program Files\nodejs` |
| npm | 11.17.0 | Node.js に同梱 | 同上 |
| JDK | Eclipse Temurin 21.0.12.1（LTS） | `winget install EclipseAdoptium.Temurin.21.JDK` | `C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot` |
| Maven | 3.9.16 | Maven Wrapper（`backend/mvnw`）が自動取得。システム全体へのインストールは不要 | `backend/.mvn/wrapper/` |
| Docker Desktop | 29.5.3（Compose v5.1.4） | 本プロジェクト着手前から導入済み | — |
| Git | 2.47.1.windows.1 | 本プロジェクト着手前から導入済み | — |
| PostgreSQL | 16（`postgres:16-alpine`） | **ネイティブインストールはせず、Dockerコンテナで運用**（バージョン管理・アンインストールの手間を避けるため） | Dockerイメージ内 |

### 環境変数

| 変数名 | 値 | 設定レベル |
|--------|----|-----------|
| `JAVA_HOME` | `C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot` | ユーザー環境変数（管理者権限がなくMachine全体には設定不可だったため） |

- `Node.js`・`Git` のインストーラーは自動的にMachine PATHへ登録済み。
- 新しく開いたターミナルではPATHが反映されるが、**インストール前から動いているプロセス**（このアプリのブラウザプレビュー機能など）はPATH更新を認識しないことがある → 反映されない場合はアプリ自体の再起動が必要。

---

## 2. PostgreSQL（Docker）

`docker-compose.yml`（`real-estate-referral-platform/`直下）で管理。接続情報は `docker-compose.yml` 内で `.env`（Git管理外、`.env.example`がテンプレート）の変数を参照する構成。

| 項目 | 値の所在 |
|------|---------|
| コンテナ名 | `referral-platform-db`（固定値、`docker-compose.yml`に記載） |
| イメージ | `postgres:16-alpine`（固定値） |
| ホストポート | `5432` → コンテナ `5432`（固定値） |
| DB名 / ユーザー名 / パスワード | `.env`（Git管理外）。テンプレートは `.env.example` |
| データ永続化 | Dockerボリューム `real-estate-referral-platform_referral-platform-db-data`（コンテナ削除後もデータ保持） |

### 初回セットアップ

```bash
cd real-estate-referral-platform
cp .env.example .env   # 値を確認・必要なら変更
```

### 起動・停止

```bash
cd real-estate-referral-platform
docker compose up -d      # 起動（.envを自動で読み込む）
docker compose ps         # 状態確認
docker compose down       # 停止（-v を付けるとデータも削除）
```

### 接続例（psqlクライアントがある場合）

```bash
docker exec -it referral-platform-db psql -U referral_app -d referral_platform
```

---

## 3. バックエンド（Spring Boot）起動時の注意

- DB接続情報は `application.properties` から `spring.config.import=optional:application-local.properties` 経由で読み込む構成に変更済み。実際の値は `backend/src/main/resources/application-local.properties`（Git管理外）に記載。テンプレートは同ディレクトリの `application-local.properties.example`。
- `spring-boot-starter-security` を依存関係に含めているが、**まだ独自の認証設定（SecurityConfig）は未実装**。
- そのため現状 `./mvnw spring-boot:run` で起動すると、Spring Bootが自動生成した一時パスワードがコンソールに出力される（例：`Using generated security password: xxxxxxxx`）。
  - ユーザー名は `user` 固定、パスワードは**起動のたびに変わる使い捨て**。
  - これは指示書にある「ワークスペース管理ログイン（メール＋パスワード、`users`テーブル）」とは別物。実際のログイン機能は着手指示書ステップ4で実装予定。

### 初回セットアップ

```bash
cd real-estate-referral-platform
cp backend/src/main/resources/application-local.properties.example backend/src/main/resources/application-local.properties
# 値を確認・必要なら変更（.envと同じ値に揃える）
```

### 起動方法

```bash
cd real-estate-referral-platform/backend
./mvnw spring-boot:run
# → http://localhost:8080
```

---

## 4. フロントエンド（Next.js）起動方法

```bash
cd real-estate-referral-platform/frontend
npm install   # 初回のみ
npm run dev
# → http://localhost:3000
```

ログイン機能なし（エンドユーザー向けはログイン不要の方針のため）。

---

## 5. ローカルURL一覧

| サービス | URL |
|---------|-----|
| フロントエンド（Next.js dev） | http://localhost:3000 |
| バックエンドAPI（Spring Boot） | http://localhost:8080 |
| PostgreSQL | `localhost:5432` |

---

## 6. リポジトリ

- 場所：`real-estate-referral-platform/`（Gitリポジトリのルート）
- リモート：**未設定**（ローカルのみ）。GitLabの個人ネームスペースにprivateプロジェクトとして追加予定
- ブランチ：`main`

---

## 更新履歴

- 2026-09-16：初版作成（開発環境構築完了時点の状態を記録）
- 2026-09-16：フォルダ名を `platform/` から `real-estate-referral-platform/` に変更。DB接続情報を `.env` / `application-local.properties`（いずれもGit管理外）に分離し、本ドキュメントから実パスワードの記載を削除
