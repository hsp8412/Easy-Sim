"use client";

import {Proposal} from "@/types/proposal";
import DataTable from "../common/table/dataTable";
import {proposals} from "@/app/(carrier)/data";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const ProposalsCard = () => {
  const columns = [
    {
      path: "country",
      label: "Avatar",
      content: (proposal: Proposal) => proposal.country,
    },
    {
      path: "size",
      label: "Size(GB)",
      content: (proposal: Proposal) => proposal.size,
    },
    {
      path: "duration",
      label: "Duration(day)",
      content: (proposal: Proposal) => proposal.duration,
    },
    {
      path: "price",
      label: "price(USD)",
      content: (proposal: Proposal) => proposal.price,
    },
    {
      path: "created",
      label: "Date",
      content: (proposal: Proposal) => proposal.created.toLocaleDateString(),
    },
    {
      path: "status",
      label: "Status",
      content: (proposal: Proposal) => proposal.status,
    },
  ];
  return (
    <div className="bg-white w-full shadow-xl px-10 py-10">
      <div className="flex justify-start items-center mb-10">
        <button className="bg-primary hover:bg-primaryDark flex justify-center gap-2 text-white py-3 px-4 rounded-md">
          <FontAwesomeIcon icon={faPlus} size="xl" />
          <span className="">New Proposal</span>
        </button>
      </div>
      <DataTable
        columns={columns}
        items={proposals}
        keyPath={"_id"}
        itemsPerPage={3}
      />
    </div>
  );
};

export default ProposalsCard;
