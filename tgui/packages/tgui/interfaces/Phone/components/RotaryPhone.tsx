export const RotaryPhone = (props, context) => {
  return (
    <div className="Phone__rotary">
      {new Array(9).fill(0).map((_, i) => (
        <div className="Phone__rotary-dials-dial" key={i}>
          {i + 1}
        </div>
      ))}
      <div className="Phone__rotary-dials-dial">0</div>
    </div>
  );
};
