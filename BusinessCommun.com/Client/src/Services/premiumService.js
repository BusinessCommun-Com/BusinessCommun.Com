const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8765/api/premium';

export async function fetchInvestors(userId) {
  const url = userId ? `${API_BASE}/investors?userId=${encodeURIComponent(userId)}` : `${API_BASE}/investors`;
  const resp = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
  const data = await resp.json();
  if (!resp.ok) throw { status: resp.status, ...data };
  return data;
}

export async function purchasePremium({ userId, plan, amount }) {
  const resp = await fetch(`${API_BASE}/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, plan, amount }),
  });
  const data = await resp.json();
  if (!resp.ok) throw data;
  return data;
}
