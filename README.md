# Turkish Practice — v51 full repository

A static, browser-based Turkish learning app with solo quiz banks, optional Supabase multiplayer, and a **Watch & Learn** mode that pairs a video with timestamped questions prepared in JSON.

This repository has no build step and no npm dependencies. Deploy the repository root as the website root using any static host that supports HTTPS. The app needs HTTPS (or localhost) for service-worker/PWA features.

## Repository layout

```text
.
├── index.html                         # Application UI and client-side logic
├── manifest.webmanifest               # PWA manifest
├── sw.js                              # Offline app-shell and quiz-bank cache
├── icon-192.png                       # PWA icon
├── icon-512.png                       # PWA icon
├── quiz-banks/
│   ├── index.json                     # Bank catalog loaded at startup
│   └── *.csv                          # Five bundled quiz banks
├── QUESTION_FILE_FORMAT.md              # Quick link to the same format guide
├── docs/
│   └── QUESTION_FILE_FORMAT.md        # Watch & Learn JSON schema and authoring prompt
└── examples/
    ├── example_video_questions.json
    └── example_captions.srt
```

## Deploy

1. Download/extract the complete repository package.
2. Upload **all files and folders** to the same site root. Do not deploy only `index.html`.
3. Open `/quiz-banks/index.json` on the deployed site. It must return JSON, not an HTML fallback page.
4. Open `/quiz-banks/turkish_a1_easy_quiz_bank_50.csv`. It must return CSV text.
5. Visit the app over HTTPS and reload once so the service worker can install and cache the app shell and bundled banks.

### GitHub Pages

Upload these repository contents to a GitHub repository. In **Settings → Pages**, publish from the branch and folder containing `index.html` (usually `main` and `/ (root)`). Keep the `quiz-banks`, `docs`, and `examples` folders in that same published root. If the repository is published under a project path, the app uses relative URLs so the assets can resolve under that path.

## Watch & Learn

- Choose **Watch & Learn** from the home screen.
- Select a YouTube URL or local video file, then upload the prepared JSON question file.
- Optionally upload an `.srt` or `.vtt` captions file.
- Enter the desired start/end time range and start the session.
- Use `examples/example_video_questions.json` and `examples/example_captions.srt` to test the workflow.
- See `docs/QUESTION_FILE_FORMAT.md` for the complete reusable format and prompt.

The sample dialogue is invented. The app does not generate questions with AI at runtime; questions are prepared ahead of time.

## Offline and external services

- The service worker caches the app shell and the five bundled quiz banks. Offline use is available after the first successful online load and cache installation.
- Local video files are selected by the user and are not automatically copied into the app's cache.
- YouTube playback requires internet access and may be unavailable for videos that disallow embedding.
- Multiplayer uses the existing Supabase project configuration embedded in `index.html`. The browser key is a publishable client key; never put a Supabase service-role key in this repository. Online play requires internet access and suitable Supabase project settings.
- Supabase's JavaScript client is loaded from jsDelivr, so multiplayer initialization needs a connection unless the dependency is separately bundled.

## Updating quiz banks

1. Add the CSV file to `quiz-banks/`.
2. Add an entry to `quiz-banks/index.json`, for example:
   `{ "file": "my_bank.csv", "name": "My Bank" }`
3. Keep the existing CSV header/schema compatible with the current loader.
4. Bump the `CACHE_PREFIX` in `sw.js` when shipping a release with updated bundled assets so clients refresh their offline cache.

## Validation

This package is a static repository. Test at least the startup screen, each quiz bank, Watch & Learn with the example files, and online play on the actual target host before sharing the deployment. Browser-dependent fullscreen behavior and real YouTube playback cannot be guaranteed by static checks alone.
