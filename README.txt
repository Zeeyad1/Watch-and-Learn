TURKISH PRACTICE v49 — WATCH & LEARN

Files:
- index.html: app with the new Watch & Learn mode added; existing quiz and multiplayer modes remain separate.
- example_video_questions.json: illustrative sample question file.
- QUESTION_FILE_FORMAT.md: full schema, timing rules, and a reusable AI prompt.

How to use:
1. Host/open index.html the same way you host the current webapp.
2. Open Watch & Learn.
3. Choose YouTube link or a local video file.
4. Upload a prepared JSON question file. Optionally upload an .srt or .vtt captions file.
5. Set start and end time (minimum one minute), validate, and start watching.
6. The player pauses at each segment end, exits fullscreen where possible, and shows the question below the player. Answer, review feedback, then Continue to resume playback.

Notes:
- YouTube playback needs internet and the video must permit embedding. The YouTube IFrame API is loaded from YouTube when that mode is used.
- Browser restrictions can prevent automatic fullscreen or playback in some contexts. The app falls back to inline playback; use the player controls if needed.
- Local video files are played in the browser and are not uploaded.
- No AI API is called. Questions are read from the selected JSON file.
- The uploaded video and question file are not sent to a server by this feature.
- The example JSON uses invented sample sentences and timestamps. Replace it with the captions and timeline of your chosen video.
