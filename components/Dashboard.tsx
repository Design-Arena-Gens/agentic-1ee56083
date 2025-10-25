import { getRecentLogs } from '@/lib/sheets';

export default async function Dashboard() {
  const logs = await getRecentLogs().catch(() => [] as any[]);
  return (
    <section className="card">
      <h3>Recent Activity</h3>
      {logs.length === 0 && <p>No logs yet or Sheets not configured.</p>}
      {logs.length > 0 && (
        <div className="mono" style={{fontSize:12, whiteSpace:'pre-wrap'}}>
          {logs.map((row, idx) => `${idx+1}. ${row.join(' | ')}`).join('\n')}
        </div>
      )}
    </section>
  );
}
