# 不動産紹介プラットフォーム（MVP）

`../docs/real_estate_referral_platform_kickoff_instructions_20260916.md` に基づく実装リポジトリ。

## 構成

- `frontend/` — Next.js（App Router）+ TypeScript + Tailwind CSS
- `backend/` — Spring Boot（Java 21）+ Spring Data JPA + PostgreSQL
- `docker-compose.yml` — 開発用PostgreSQL

企画書・環境ドキュメント・作業ログは `../docs/`（本リポジトリの外、`Real_Estate_Business/docs/`）にまとめてある。Git管理外のため、GitLab等にプッシュしても含まれない。詳細は `../docs/architecture.md` の5章を参照。

## 前提環境

- Node.js 24 LTS
- JDK 21 (Eclipse Temurin)
- Docker Desktop（PostgreSQLをコンテナで起動）

## セットアップ

```bash
# 0. 環境変数ファイルを用意（初回のみ、Git管理外）
cp .env.example .env
cp backend/src/main/resources/application-local.properties.example backend/src/main/resources/application-local.properties
# 上記2ファイルの中身を確認・必要なら値を変更する

# 1. DBを起動
docker compose up -d

# 2. バックエンド起動（http://localhost:8080）
cd backend
./mvnw spring-boot:run

# 3. フロントエンド起動（http://localhost:3000）
cd frontend
npm install
npm run dev
```

## DB接続情報（ローカル開発用）

`.env` と `backend/src/main/resources/application-local.properties`（いずれもGit管理外）で管理。実際の値はこの2ファイルを直接開いて確認する。

## 現在の状態

- [x] 開発環境構築（Node.js / JDK / PostgreSQL / プロジェクト初期化）
- [ ] DBスキーマ・マイグレーション
- [ ] HP（LP）実装
- [ ] 問い合わせフォーム
- [ ] 管理ログイン
- [ ] ワークスペース画面（案件CRUD）
- [ ] 紹介先マスタ画面
- [ ] LINE連携（実験）
- [ ] テスト・デプロイ
