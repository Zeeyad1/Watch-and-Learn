# Supabase online multiplayer setup

Configured project: `weqwbvlyxpcdueupinbd`

## Required setting
Authentication → Anonymous Sign-Ins: Enabled

## This build
No SQL tables are required for this first multiplayer version.

It uses:
- Supabase Anonymous Auth for a device/player identity.
- Realtime Presence for host/guest connection status.
- Realtime Broadcast for start, question, answer, reveal, score, ready-next, and leave messages.
- The host controls question order and scoring.

## Test
1. Deploy over HTTPS.
2. Phone A: Two Players → Online → Create Room.
3. Phone B: Two Players → Online → enter the six-digit room code → Join Room.
4. Host presses Start Game.
5. Both phones receive the same questions and synchronized results.

The browser publishable key is intentionally used by the frontend. Never add a secret/service-role key to the repository.
