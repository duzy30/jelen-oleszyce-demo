# Koło Łowieckie „Jeleń” Oleszyce — DEMO (statyczne)

Publiczna, statyczna demonstracja strony głównej Koła Łowieckiego „Jeleń” Oleszyce.

- Bez WordPressa, PHP i MySQL
- Gotowe do hostingu na Vercel
- Logo z przezroczystym tłem

## Struktura

```
index.html
vercel.json
assets/css/
assets/js/
assets/images/
assets/wp/
```

## Lokalny podgląd

```bash
cd vercel-demo
python3 -m http.server 4173
```

Otwórz: http://127.0.0.1:4173/

## Wdrożenie na Vercel (Twój jedyny krok)

1. Wejdź na [vercel.com/new](https://vercel.com/new)
2. Zaimportuj repozytorium **`jelen-oleszyce-demo`**
3. Ustaw:

| Pole | Wartość |
|------|---------|
| **Framework Preset** | Other |
| **Root Directory** | `.` *(root repo — nie zmieniaj)* |
| **Build Command** | *(puste)* |
| **Output Directory** | *(puste)* |
| **Install Command** | *(puste)* |
| **Environment Variables** | *(brak)* |

4. Kliknij **Deploy**

Nie jest wymagany build ani zmienne środowiskowe.

## Uwagi DEMO

- Linki do podstron (poza stroną główną) prowadzą do `#` — elementy wizualne bez backendu
- Przycisk „Strefa członków” jest wyłączony (brak logowania)
- Fonty: Google Fonts (HTTPS) — Source Sans 3 + Source Serif 4
- Działają: hero, menu (w tym mobilne), karuzela statystyk, aktualności, kalendarz, galeria, stopka

## Vercel Web Analytics

Strona DEMO jest statycznym HTML (Framework: Other). Integracja używa oficjalnego skryptu HTML:

```html
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

**Wymagane w panelu Vercel:** Project → **Analytics** → **Enable**.

Po włączeniu i kolejnym wdrożeniu odsłony pojawiają się w zakładce Analytics. Lokalnie (`python3 -m http.server`) skrypt `/_vercel/insights/script.js` nie działa — to normalne.

## Bezpieczeństwo

Repozytorium zawiera wyłącznie pliki statyczne DEMO.  
Nie zawiera WordPressa, bazy danych, `wp-config.php` ani haseł.
