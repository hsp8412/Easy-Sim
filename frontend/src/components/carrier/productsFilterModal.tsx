import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MyModal from "../common/myModal";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  priceRange: [number, number];
  value: number;
  setValue: (value: number) => void;
};
const ProductsFilterModal = ({open, setOpen}: Props) => {
  return (
    <MyModal open={open} setOpen={setOpen}>
      <h1 className="text-3xl font-bold text-neutral-700 flex justify-center items-center gap-3">
        <FontAwesomeIcon icon={faFilter} className="text-secondary" />
        Filter
      </h1>
    </MyModal>
  );
};

export default ProductsFilterModal;
