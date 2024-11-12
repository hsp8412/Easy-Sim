type Props = {
  show: boolean;
};

const Spinner = ({show}: Props) => {
  return (
    <div
      className={`${
        !show && "hidden"
      } animate-spin inline-block w-5 h-5 border-[4px] border-current border-t-transparent text-white rounded-full`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
