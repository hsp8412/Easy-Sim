"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RefundsTable from "./refundsTable";
import MyButton from "./myButton";
import {faFilter} from "@fortawesome/free-solid-svg-icons";

const RefundsCard = () => {
  return (
    <div className="bg-white w-full shadow-xl px-6 py-6">
      <div className="mb-4">
        <MyButton>
          <FontAwesomeIcon icon={faFilter} size="lg" />
          Filter
        </MyButton>
      </div>
      <RefundsTable />
    </div>
  );
};

export default RefundsCard;
