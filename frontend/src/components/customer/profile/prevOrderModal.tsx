import MyModal from "@/components/common/myModal";

const PrevOrderModal = () => {
  return (
    <MyModal open={openModal} setOpen={setOpenModal}>
      <div className="flex gap-10 justify-center items-center">
        <img src={selectedOrder?.flag} alt="flag" className="h-20" />
        <img src={selectedOrder?.carrierLogo} alt="logo" className="h-20" />
      </div>
      <div className="mt-5">
        <p className="flex font-bold justify-center text-white-700 text-3xl">{`${selectedOrder?.country}`}</p>
      </div>
      <div className="mt-3">
        <p className="flex font-bold justify-center text-xl text-white-700">{`${selectedOrder?.planSize} - GB by ${selectedOrder?.carrierName}`}</p>
        <p className="flex font-bold justify-center text-xl text-white-700">{`${datePurchase}`}</p>
      </div>
      <div className="mt-4">
        <p className="font-bold text-lg mb-2">Data Left (in GB)</p>
        <div className="flex items-center space-x-2">
          <div className="text-center w-10">0</div>
          <div className="flex-grow h-9 border-solid border border-black rounded-lg bg-white relative">
            <div
              className="h-full inset-0 rounded-lg bg-[#00A2FF] absolute"
              style={{
                width: `${
                  ((Number(selectedOrder?.planSize) -
                    Number(selectedOrder?.usage)) /
                    Number(selectedOrder?.planSize)) *
                  100
                }%`,
              }}
            ></div>
          </div>
          <div className="text-center w-10">{`${selectedOrder?.planSize}`}</div>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold text-lg mb-2">Days Left</p>
        <div className="flex items-center space-x-2">
          <div className="text-center w-10">0</div>
          <div className="flex-grow h-9 border-2 rounded-lg bg-white"></div>
          <div className="text-center w-10">{`${selectedOrder?.duration}`}</div>
        </div>
      </div>
    </MyModal>
  );
};

export default PrevOrderModal;
