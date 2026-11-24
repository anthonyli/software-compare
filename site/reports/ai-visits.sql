/* Shanghai calendar weeks, starting on Monday. Always show all four weekly totals. */
WITH RECURSIVE weeks(week_start, age) AS (
  SELECT date('now', '+8 hours', '-6 days', 'weekday 1'), 0
  UNION ALL
  SELECT date(week_start, '-7 days'), age + 1 FROM weeks WHERE age < 3
), visits AS (
  SELECT date(started_at, 'unixepoch', '+8 hours', '-6 days', 'weekday 1') AS week_start,
         source, landing_path, filtered, opened_product, visited_official,
         max(filtered, opened_product, visited_official) AS engaged
  FROM ai_visits
  WHERE started_at >= unixepoch((SELECT min(week_start) FROM weeks), '-8 hours')
), counts AS (
  SELECT w.week_start, 'total' AS scope, NULL AS source, NULL AS landing_path,
         count(v.source) AS sessions, coalesce(sum(filtered), 0) AS filter_sessions,
         coalesce(sum(opened_product), 0) AS product_sessions,
         coalesce(sum(visited_official), 0) AS official_sessions, coalesce(sum(engaged), 0) AS engaged_sessions
  FROM weeks w LEFT JOIN visits v USING (week_start)
  GROUP BY w.week_start
  UNION ALL
  SELECT week_start, 'detail', source, landing_path, count(*),
         sum(filtered), sum(opened_product), sum(visited_official), sum(engaged)
  FROM visits GROUP BY week_start, source, landing_path
)
SELECT *, round(100.0 * engaged_sessions / nullif(sessions, 0), 1) AS engaged_pct
FROM counts
ORDER BY week_start DESC, scope DESC, sessions DESC, source, landing_path;
