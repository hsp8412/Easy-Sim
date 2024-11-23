import {
  faCogs,
  faRocket,
  faShoppingCart,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const HomeCards = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-0">
      <div id="grid-1" className="flex justify-center items-center">
        <div className="shadow-xl py-10 px-5 md:px-10 bg-white rounded flex flex-col justify-start items-center w-full max-w-[375px] h-full">
          <div className="flex flex-col justify-center items-center gap-5 text-3xl font-semibold text-neutral-700">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-5xl text-primary"
            />
            Purchase an eSIM
          </div>
          <p className="text-center mt-5 text-2xl font-light">
            Visit our website from desktop or mobile to select a data plan
            tailored to your destination and needs.
          </p>
        </div>
      </div>
      <div id="grid-1" className="flex justify-center items-center">
        <div className="shadow-xl py-10 px-5 md:px-10 bg-white rounded flex flex-col justify-start items-center w-full max-w-[375px] h-full">
          <div className="flex flex-col justify-center items-center gap-5 text-3xl font-semibold text-neutral-700">
            <FontAwesomeIcon icon={faCogs} className="text-5xl text-primary" />
            Install the eSIM
          </div>
          <p className="text-center mt-5 text-2xl font-light">
            Follow the provided instructions to install the eSIM on your
            compatible device, either by scanning a QR code or through direct
            installation.
          </p>
        </div>
      </div>
      <div id="grid-1" className="flex justify-center items-center">
        <div className="shadow-xl py-10 px-5 md:px-10 bg-white rounded flex flex-col justify-start items-center w-full max-w-[375px] h-full">
          <div className="flex flex-col justify-center items-center gap-5 text-3xl font-semibold text-neutral-700">
            <FontAwesomeIcon
              icon={faRocket}
              className="text-5xl text-primary"
            />
            Activate & Connect
          </div>
          <p className="text-center mt-5 text-2xl font-light">
            Upon arrival, activate the eSIM via your device settings to enjoy
            seamless internet access without the need for physical SIM cards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
