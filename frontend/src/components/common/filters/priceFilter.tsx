import RangeSlider from "../RangeSlider";

type Props = {
  priceRange: [number, number];
  value: number;
  setValue: (value: number) => void;
};

const PriceFilter = ({priceRange, value, setValue}: Props) => {
  return (
    <div>
      <RangeSlider
        min={priceRange[0]}
        max={priceRange[1]}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export default PriceFilter;
