import Spinner from "../common/Spinner";

type Props = {
  submitted: boolean;
  children?: React.ReactNode;
};

const SubmitButton = ({submitted, children}: Props) => {
  return (
    <div>
      <button
        type="submit"
        className="bg-primary hover:bg-primaryDark px-4 py-3 rounded-xl text-white"
      >
        <Spinner show={submitted} />
        {children ? children : "Submit"}
      </button>
    </div>
  );
};

export default SubmitButton;
