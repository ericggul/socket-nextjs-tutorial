import { useState } from "react";
import useSocketMobile from "@/utils/hooks/useSocketMobile";

export default function MobileControls() {
  const { emitButtonClick, emitTextInput } = useSocketMobile();
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>mobile</h2>
      <button onClick={emitButtonClick} style={{ padding: "0.5rem 1rem" }}>
        Click me
      </button>
      <div style={{ height: "1rem" }} />
      <input
        value={text}
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          emitTextInput(v);
        }}
        placeholder="Type to send to screen"
        style={{ padding: "0.5rem", width: "100%", maxWidth: 360 }}
      />
    </div>
  );
}


