# Tangue

A daily balance game for Reddit, built on [Devvit Web](https://developers.reddit.com/).

The deck rolls with the swell. Two ballast buttons counter the tilt; stay upright
for 45 seconds to make the crossing. The swell (amplitude, frequency, gusts) is
generated from the day, so everyone faces the same sea.

## How to play

1. Tap Cast off.
2. Watch the deck tilt and counter it with the Port / Starboard buttons.
3. Survive the crossing to extend your streak.

One crossing per day, the same for everyone; streaks stored per user in Redis.

## Stack

- React 19 + Tailwind 4 + Vite (client inside a Reddit post), requestAnimationFrame loop
- Hono server on Devvit (`/api/init`, `/api/submit`), Redis persistence
- Deterministic daily sea generation (UTC seed), unit-tested

## Development

```bash
npm install
npm run dev
npm test
npm run type-check
npm run build
```

## Submission (Reddit's Game of the Day Hackathon)

- App listing: `developers.reddit.com/apps/gameday-tangue` (private until judging ends)
- Demo post: public test subreddit, post running the game
