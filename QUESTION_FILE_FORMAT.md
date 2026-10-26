# Watch & Learn — question-file format (schema version 1)

The Watch & Learn mode uses a prepared JSON file. The file is selected in the app under **Prepared question file (.json)**. No AI API is called by the app; you can create or edit the file with any text editor or ask an AI to prepare it from your captions.

## Required top-level structure

```json
{
  "schemaVersion": 1,
  "title": "Episode or lesson title",
  "language": "tr",
  "level": "B1",
  "segments": []
}
```

`segments` must contain at least one segment. Use one question per caption segment. The app sorts segments by `start`, but segments must not overlap.

## Required fields for every segment

```json
{
  "id": "segment-001",
  "start": 90,
  "end": 111,
  "transcript": "Turkish caption text for this section.",
  "question": "What does the speaker mean?",
  "choices": [
    "First possible answer",
    "Second possible answer",
    "Third possible answer",
    "Fourth possible answer"
  ],
  "correctIndex": 1,
  "feedback": "Explain the correct meaning and the relevant Turkish grammar or vocabulary.",
  "languageFocus": "comprehension"
}
```

- `id`: unique string for the segment.
- `start`, `end`: **seconds from the beginning of the video**, as numbers. Example: `90` means 1 minute 30 seconds. `end` must be greater than `start`.
- `transcript`: Turkish captions for the segment. It may be an empty string only if you upload an accompanying `.srt` or `.vtt` caption file; the app will try to fill it from captions whose timestamps overlap the segment.
- `question`: one clear question grounded in this segment's captions.
- `choices`: exactly four non-empty answer strings.
- `correctIndex`: zero-based array position of the correct choice: `0` = first, `1` = second, `2` = third, `3` = fourth. Do not use A/B/C/D here.
- `feedback`: required explanation. Focus on Turkish comprehension, vocabulary, suffixes, grammar, idioms, or why the phrase fits the context. Do not merely say “Correct.”
- `languageFocus`: short label, for example `comprehension`, `vocabulary`, `grammar`, `idiom`, or `verb forms`.

## Time-range behavior

The app asks for a start and end time in seconds or `MM:SS` / `HH:MM:SS`. The selected range must be at least 60 seconds. A question segment is included only when its entire `start`–`end` interval fits inside the selected range. Keep segments in chronological order and do not overlap them. Around 18–22 seconds per segment is a useful starting point, but sentence boundaries and meaning are more important than an exact duration.

Example: `start: 90`, `end: 111` means the segment runs from 01:30 to 01:51.

## Captions file

The captions upload is optional and accepts `.srt` and `.vtt`. It can supply missing `transcript` values. Include the transcript in the JSON when possible so the question file is self-contained and portable. Captions and question timestamps must refer to the same video and timeline.

## Suggested prompt for preparing a file with AI

> Using the Turkish captions I provide, create a valid JSON question file following `QUESTION_FILE_FORMAT.md`. Keep the caption timestamps in seconds and create chronological, non-overlapping learning segments of roughly 18–22 seconds, joining adjacent caption cues where needed. Stay faithful to the actual dialogue; do not invent events or context. Create one multiple-choice question per segment with exactly four plausible choices and one correct answer. Include the Turkish transcript, set `correctIndex` to the zero-based index of the correct choice, and provide feedback in English that teaches the relevant Turkish comprehension, vocabulary, grammar, suffix, or idiom. Include the required top-level fields `schemaVersion`, `title`, `language`, `level`, and `segments`. Return only valid JSON, with no Markdown fences or commentary. Use the video's original timestamp positions; do not reset segment times to zero.

## Included example

`example_video_questions.json` demonstrates the complete schema. Its Turkish sentences and timestamps are illustrative placeholders, not captions from an actual show. Replace them with captions and timestamps from the video you plan to use.
