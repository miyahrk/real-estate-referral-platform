#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

# Codespaces内では frontend/backend も "app" コンテナ内で動き、
# PostgreSQLは同じdocker-compose上の別コンテナ "postgres" として動く。
# ローカル(Windows)開発と違い、接続先ホストは "localhost" ではなく "postgres" になる。
cat > backend/src/main/resources/application-local.properties <<'EOF'
spring.datasource.url=jdbc:postgresql://postgres:5432/referral_platform
spring.datasource.username=referral_app
spring.datasource.password=referral_app_dev_password
spring.datasource.driver-class-name=org.postgresql.Driver
EOF

chmod +x backend/mvnw

echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "Setup complete. Next steps:"
echo "  Backend:  cd backend && ./mvnw spring-boot:run   (http://localhost:8080)"
echo "  Frontend: cd frontend && npm run dev              (http://localhost:3000)"
echo "  (next dev はデフォルトで 0.0.0.0 にバインドされるため、追加オプション不要)"
