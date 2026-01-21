import "./Button.css";

export default function Button({ text, variant = "primary", onClick }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
