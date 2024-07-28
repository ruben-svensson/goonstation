import { useDispatch } from 'common/redux';
import { backendSuspendStart, useBackend } from '../../backend';


export const SlotMachine = (_props, context) => {
  const { data } = useBackend(context);
  const dispatch = useDispatch(context);

  const close = () => {
    dispatch(backendSuspendStart());
  };

  const spin = () => {};

  return (
    <div className="slot-machine">
      <div className="top" />
      <div className="front">
        <div className="slots">
          <div className="slot">Slot</div>
          <div className="slot">Slot</div>
          <div className="slot">Slot</div>
        </div>
        <div className="lever" />
      </div>
      <div className="bottom" />
    </div>
  );
};
