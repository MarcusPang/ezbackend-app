interface AlertPropsInterface {
  message: string;
  buttons: {
    name: string;
    class: string;
    fn: () => void;
  }[];
}

const Alert = ({ message, buttons }: AlertPropsInterface) => {
  return (
    <div className={'alert mb-3 p-2'}>
      <div className="flex-1">
        <label className="mx-3">{message}</label>
      </div>
      <div className="flex-none">
        {buttons.map((btn, index) => {
          let className = 'btn btn-sm' + btn.class;
          if (index !== buttons.length - 1) {
            className += 'mr-2';
          }
          return (
            <button className={className} onClick={btn.fn} key={btn.name}>
              {btn.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Alert;
