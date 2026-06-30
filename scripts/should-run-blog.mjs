// ─── Weekly run gate ──────────────────────────────────────────────────────────
// Prints "true" if today (UTC) is one of this ISO week's randomly-chosen blog
// days, else "false". The chosen days are derived deterministically from the
// ISO year+week, so:
//   • exactly N days per week run (default 2),
//   • the specific days vary week to week (they look random),
//   • no persisted state is needed — every run recomputes the same answer.
//
// The Daily Blog workflow fires this every day and only generates posts on a
// "true" day. Manual runs (workflow_dispatch) bypass this gate entirely.
//
// Env: BLOG_DAYS_PER_WEEK (default 2, clamped 1-7).

const PER_WEEK = Math.min(7, Math.max(1, Number(process.env.BLOG_DAYS_PER_WEEK) || 2));

// Small deterministic PRNG (mulberry32) seeded from the ISO year+week.
function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// ISO-8601 week number + ISO year for a given date (UTC).
function isoWeek(d) {
    const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    const dayNum = (date.getUTCDay() + 6) % 7; // Mon=0 … Sun=6
    date.setUTCDate(date.getUTCDate() - dayNum + 3); // move to Thursday of this week
    const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
    const firstDayNum = (firstThursday.getUTCDay() + 6) % 7;
    firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3);
    const week = 1 + Math.round((date - firstThursday) / (7 * 24 * 3600 * 1000));
    return { year: date.getUTCFullYear(), week };
}

const now = new Date();
const { year, week } = isoWeek(now);
const rng = mulberry32(year * 100 + week);

// Pick PER_WEEK distinct weekdays (0=Sun … 6=Sat) for this week.
const days = new Set();
while (days.size < PER_WEEK) days.add(Math.floor(rng() * 7));

const today = now.getUTCDay();
const run = days.has(today);

const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const chosen = [...days].sort().map((d) => names[d]).join(", ");
console.error(`ISO ${year}-W${week}: blog days = [${chosen}], today = ${names[today]} → ${run ? "RUN" : "skip"}`);

process.stdout.write(run ? "true" : "false");
