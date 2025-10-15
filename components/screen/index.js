import useSocketScreen from "@/utils/hooks/useSocketScreen";

export default function ScreenDisplay() {
  const { clicks, text } = useSocketScreen();

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>screen</h2>
      <div>button clicked: {clicks}</div>
      <div style={{ marginTop: "0.5rem" }}>text: {text}</div>
    </div>
  );
}


