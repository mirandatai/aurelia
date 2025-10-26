# Modelos de Dados (Resumo)

- profiles(user_id, display_name, locale, created_at)
- books(id, title, author, cover_url, isbn, source, created_at)
- shelf_items(id, user_id, book_id, status, primary_format, created_at)
- reading_sessions(id, user_id, book_id, started_at, ended_at, duration_ms, progress_before, progress_after, mood)
- notes(id, user_id, book_id, session_id?, text, image_url?, emotion?, created_at)
- emotions(id, label, color?, created_at)
- playlist_suggestions(id, user_id, book_id, mood, spotify_playlist_id, result, created_at)
- chat_threads(id, user_id, book_id, created_at)
- chat_messages(id, thread_id, role, content, mood_context?, created_at)

RLS: leituras por `user_id`. Leituras públicas apenas quando explícito (ex: capas).
