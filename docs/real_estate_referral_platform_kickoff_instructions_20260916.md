# 不動産紹介プラットフォーム MVP 着手指示書

**作成日：** 2026年9月16日
**対象：** Claude Code等のAIエージェントによる実装着手
**関連ドキュメント：** `real_estate_referral_platform_mvp_scope_20260916.md`（本指示書はこのスコープ定義に基づく）

> 本ファイルは、企業HP共通基盤プロジェクト用の着手指示書（ai_agent_kickoff_instructions）とは別プロジェクトとして分離した、不動産紹介プラットフォーム専用の指示書です。

---

## 1. プロジェクト概要

SNSでの不動産投資情報発信を入口に見込み客を集め、審査済みの不動産営業・会社へマッチング（紹介）し、成約時にリベートを得るビジネスのMVP実装。

- **エンドユーザー（見込み客）**：ログイン不要で、情報閲覧〜サービス申込までを完結できる
- **管理ワークスペース利用者**：宮崎さん本人＋少人数の試用ユーザーが、複数アカウントでログインして案件・紹介先を管理する

---

## 2. 技術スタック

| レイヤー | 構成 |
|---------|------|
| フロントエンド | Next.js（App Router）、React、TypeScript |
| バックエンド | Spring Boot（Java） |
| DB | PostgreSQL |
| 認証 | 管理ワークスペース側のみ簡易ログイン（メール＋パスワード）。エンドユーザー向けはログイン不要 |
| 決済 | **MVPでは未実装**。決済プロバイダーを抽象化するインターフェース（Adapter/Strategyパターン）の設計だけ用意し、将来LINE Pay・PayPay・Stripe等を追加しやすくする |
| ホスティング | 未定（コスト最小構成を想定。Vercel＋クラウドDB等を検討） |

※ Headless CMS、マイクロサービス分割、複数企業HP共通基盤との統合は本MVPでは行わない。

---

## 3. MVPに含める機能（実装範囲）

1. **HP（LP）** — 既存プロトタイプ（`real_estate_referral_hp_prototype.html`）のデザイン・コピーを踏襲し、Next.jsのページとして再構築
2. **問い合わせフォーム** — 氏名・連絡先・エリア・予算・投資目的を入力 → DB保存（アカウント登録不要）
3. **ワークスペース（管理画面）**
   - 複数アカウントでログイン可能
   - 案件一覧・詳細表示
   - 案件ステータス手動更新（新規 → ヒアリング中 → 紹介済み → 成約／不成立）
4. **紹介先マスタ** — 会社名・担当者・対応エリア・専門分野・メモを登録・一覧表示（管理画面から手入力）
5. **LINE連携（実験枠）** — LINE Login・Messaging API・LIFF等を試験的に組み込む。まずは問い合わせ通知（Messaging API経由で宮崎さんに新規案件を通知）あたりから着手し、用途は実装しながら広げてよい

---

## 4. データモデル（MVP）

```sql
-- 案件
leads (
  id UUID PRIMARY KEY,
  name TEXT,
  contact TEXT,
  area TEXT,
  budget TEXT,
  purpose TEXT,
  status TEXT DEFAULT 'new', -- new / hearing / referred / closed_won / closed_lost
  created_at TIMESTAMP DEFAULT now()
);

-- 紹介先マスタ
referral_partners (
  id UUID PRIMARY KEY,
  company_name TEXT,
  contact_person TEXT,
  area TEXT,
  specialty TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- ワークスペース利用者
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT DEFAULT 'trial', -- admin / trial
  line_user_id TEXT, -- 任意
  created_at TIMESTAMP DEFAULT now()
);
```

---

## 5. 実装ステップ（推奨順序）

0. **開発環境構築**：Node.js・Java（JDK）・PostgreSQLをローカルにインストール。Next.jsプロジェクトとSpring Bootプロジェクトを初期化し、リポジトリを作成
1. **DBスキーマ作成**：上記データモデルをマイグレーションファイルとして用意
2. **HP（LP）実装**：既存プロトタイプをNext.jsページに移植
3. **問い合わせフォーム**：フォーム送信 → `leads`テーブルへ保存するAPI
4. **管理ログイン**：`users`テーブルを使った簡易認証（メール＋パスワード）
5. **ワークスペース画面**：案件一覧・詳細・ステータス更新のCRUD画面
6. **紹介先マスタ画面**：登録・一覧・編集のCRUD画面
7. **LINE連携（実験）**：まずMessaging APIでの新規案件通知から実装
8. **テスト・デプロイ・MVPローンチ**：動作確認（フォーム送信〜案件表示〜ステータス更新の一連の流れ）→ ホスティング環境へデプロイ → 試用ユーザーに共有

---

## 5-1. MVPローンチ後の方針

ローンチはゴールではなくスタート地点として扱う。ローンチ後は試用ユーザーからのフィードバックを踏まえ、以下のような改修を継続的に加えていく想定：

- 決済（LINE Pay・PayPay等）の追加
- LINE連携の用途拡張
- 紹介先向け専用ポータルの検討
- UI/UXの改善

本指示書のMVPスコープ（4章・6章）は「最初のローンチ時点」の範囲であり、ローンチ後の改修範囲を制限するものではない。

---

## 6. 明示的にスコープ外とする項目

- LINE Pay・PayPay・Stripe等の決済実装（抽象化インターフェースの設計のみ）
- 紹介先向けの専用ポータル（複数ロール・複数テナント対応）
- 自動マッチングロジック
- Headless CMSによるコンテンツ管理
- 複数企業HP共通基盤への統合

これらは `real_estate_referral_platform_mvp_scope_20260916.md` の後回しリストを参照。実装中に必要性を感じても、このMVPフェーズでは追加しないこと。

---

## 更新履歴

- 2026-09-16：初版作成
- 2026-09-16：開発環境構築ステップとMVPローンチ後の方針を追加
