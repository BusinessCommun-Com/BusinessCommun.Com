

import "./Card.css";

export default function Card({ title, value, type = "total" }) {
  return (
    <div className={`dashboard-card ${type}`}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

