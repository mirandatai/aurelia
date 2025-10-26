# Segurança e Privacidade

- RLS em todas as tabelas por `user_id`
- Buckets:
  - covers: leitura pública, escrita autenticada
  - notes: privado por usuário
- Segredos em `.env` / GitHub Secrets
- Consentimentos: analytics básicos e uso de dados do chat (opt-in)
- Rotacionar senhas/chaves expostas
