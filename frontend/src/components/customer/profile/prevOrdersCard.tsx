import PrevOrderList from "../prevOrderList";

const PrevOrdersCard = () => {
  return (
    <div
      className={` bg-white rounded-2xl p-4 w-full h-full flex flex-col justify-start items-center gap-4 max-w-[555px]`}
    >
      <p className="font-bold text-2xl">My Data Plans</p>
      <PrevOrderList />
    </div>
  );
};

export default PrevOrdersCard;
