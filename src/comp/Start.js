import { useRef } from "react";

export default function Start({ setUsername }) {
  const inputRef = useRef();

  const Click = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className="start">
      <input className="startInput" placeholder="Name..." ref={inputRef} />
      <button className="startButton" onClick={Click}> Start </button>
    </div>
  );
}