"use client";
import {Proposal} from "@/types/proposal";
import DataTable from "../common/table/dataTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import MyButton from "./myButton";
import {useEffect, useState} from "react";
import {getMyProposals} from "@/services/proposalService";
import {toast} from "react-toastify";

const ProposalsCard = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const router = useRouter();
  const handleNewProposal = () => {
    console.log("New Proposal");
    router.push("/carrier/proposals/new");
  };

  useEffect(() => {
    const getProposals = async () => {
      try {
        const proposals = await getMyProposals();
        console.log(proposals);
        setProposals(proposals);
      } catch (e: any) {
        toast.error(e.response.data);
      }
    };
    getProposals();
  }, []);

  const columns = [
    {
      path: "country",
      label: "Country",
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
      content: (proposal: Proposal) => {
        const date = new Date(proposal.createdDate);
        return date.toLocaleTimeString();
      },
    },
    {
      path: "status",
      label: "Status",
      content: (proposal: Proposal) => {
        switch (proposal.status.toLowerCase()) {
          case "pending":
            return <p className="text-yellow-600">Pending</p>;
          case "approved":
            return <p className="text-green-600">Approved</p>;
          case "rejected":
            return <p className="text-red-600">Rejected</p>;
          default:
            return <p className="text-black">{proposal.status}</p>;
        }
      },
    },
  ];

  return (
    <div className="bg-white w-full shadow-xl px-6 py-6">
      <div className="flex justify-start items-center mb-6">
        <MyButton onClick={handleNewProposal}>
          <FontAwesomeIcon icon={faPlus} size="xl" />
          <span className="">New Proposal</span>
        </MyButton>
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
