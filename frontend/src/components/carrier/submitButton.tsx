import Spinner from "../common/spinner";

type Props = {
  submitted: boolean;
};

const SubmitButton = ({submitted}: Props) => {
  return (
    <div>
      <button
        type="submit"
        className="bg-primary hover:bg-primaryDark px-4 py-3 rounded-xl text-white"
      >
        <Spinner show={submitted} />
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;
