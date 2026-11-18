import assert from 'node:assert/strict';
import { test } from 'node:test';

import { dailySeed, generateSea, isUpright, nextTilt, seaTiltAt } from './puzzle.ts';

test('seed deterministe', () => {
  assert.equal(dailySeed('2026-12-01'), dailySeed('2026-12-01'));
});

test('la mer du jour est deterministe', () => {
  const a = generateSea('2026-12-01');
  const b = generateSea('2026-12-01');
  assert.deepEqual(a, b);
});

test('la houle reste bornee', () => {
  const sea = generateSea('2026-12-01');
  for (let t = 0; t < 30000; t += 250) {
    const tilt = seaTiltAt(sea, t);
    assert.ok(Math.abs(tilt) <= sea.swellAmp + sea.gustAmp + 0.001);
  }
});

test('une correction decontretilt rapproche de l equilibre', () => {
  const sea = generateSea('2026-12-02');
  const tilt = 1.4;
  const time = 1000;
  const without = nextTilt(sea, time, tilt, 0);
  const withCorrection = nextTilt(sea, time, tilt, -0.5);
  assert.ok(withCorrection < without);
});

test('l etat droit est defini par un seuil', () => {
  assert.equal(isUpright(0.2), true);
  assert.equal(isUpright(2), false);
});
