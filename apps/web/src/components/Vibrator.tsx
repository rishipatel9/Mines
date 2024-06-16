

const VibrateButton = () => {
  const vibrateDevice = () => {
    if ('vibrate' in navigator) {
      // Vibrate for 200ms
      navigator.vibrate(200);
    }
  };

  return (
    <button onClick={vibrateDevice}>
      Click to Vibrate
    </button>
  );
};

export default VibrateButton;
