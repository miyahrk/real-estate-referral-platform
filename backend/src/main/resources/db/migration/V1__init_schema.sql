-- 案件
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    contact TEXT,
    area TEXT,
    budget TEXT,
    purpose TEXT,
    status TEXT NOT NULL DEFAULT 'new', -- new / hearing / referred / closed_won / closed_lost
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 紹介先マスタ
CREATE TABLE referral_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT,
    contact_person TEXT,
    area TEXT,
    specialty TEXT,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- ワークスペース利用者
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'trial', -- admin / trial
    line_user_id TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
