import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setisEditing] = useState(false);

  function handleChange(event) {
    //event is an object that contains the value that was entered by the user
    // Get this value automatically.
    setPlayerName(event.target.value);
  }

  function handleEditClick() {
    setisEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  const buttonContent = isEditing ? "Save" : "Edit";
  const nameField = !isEditing ? (
    <span className="player-name">{playerName}</span>
  ) : (
    <input type="text" value={playerName} onChange={handleChange} />
  );

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {nameField}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{buttonContent}</button>
    </li>
  );
}
