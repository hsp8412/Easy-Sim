"use client";

import { Proposal } from "@/types/proposal";
import { faEdit, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import MyButton from "../carrier/myButton";
import DataTable from "../common/table/dataTable";
import ProposalReviewModal from "./proposalReviewModal";
import { getAllProposals } from "@/services/proposalService";

const AdminProposalsTable = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProposals = async () => {
    try {
      const data = await getAllProposals();
      setProposals(data);
    } catch (err) {
      console.error('Error fetching proposals:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch proposals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleFilter = () => {
    console.log("Filter");
  };

  const columns = [
    {
      path: "carrier",
      label: "Carrier",
      content: (proposal: Proposal) => {
        // Handle both possible data structures
        if (typeof proposal.carrier === 'string') {
          return proposal.carrier;
        }
        // If carrier name is in carrierId
        if (proposal.carrierId && typeof proposal.carrierId === 'object' && 'name' in proposal.carrierId) {
          return proposal.carrierId.name;
        }
        return 'Unknown Carrier';
      },
    },
    {
      path: "country",
      label: "Country",
      content: (proposal: Proposal) => proposal.country,
    },
    {
      path: "size",
      label: "Size",
      content: (proposal: Proposal) => `${proposal.size}GB`,
    },
    {
      path: "speed",
      label: "Speed",
      content: (proposal: Proposal) => `${proposal.speed}`,
    },
    {
      path: "duration",
      label: "Duration",
      content: (proposal: Proposal) => `${proposal.duration} days`,
    },
    {
      path: "price",
      label: "Price",
      content: (proposal: Proposal) => `$${proposal.price}`,
    },
    {
      path: "createdDate",
      label: "Date",
      content: (proposal: Proposal) => new Date(proposal.createdDate).toLocaleDateString(),
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
    {
      path: "",
      label: "Review",
      disableSorting: true,
      content: (proposal: Proposal) => (
        <button
          className="bg-secondary hover:bg-secondaryDark px-4 py-2 text-white rounded-xl"
          onClick={() => {
            setSelectedProposal(proposal);
            setOpenModal(true);
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      ),
    },
  ];

  if (loading) {
    return <div className="bg-white w-full shadow-xl px-6 py-6">Loading...</div>;
  }

  if (error) {
    return <div className="bg-white w-full shadow-xl px-6 py-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white w-full shadow-xl px-6 py-6">
      <div className="flex justify-start items-center mb-6">
        <MyButton onClick={handleFilter}>
          <FontAwesomeIcon icon={faFilter} size="xl" />
          <span className="">Filter</span>
        </MyButton>
      </div>
      <DataTable
        columns={columns}
        items={proposals}
        keyPath={"_id"}
        itemsPerPage={3}
      />
      <ProposalReviewModal
        open={openModal}
        setOpen={setOpenModal}
        selectedProposal={selectedProposal}
        setSelectedProposal={setSelectedProposal}
        refreshProposals={fetchProposals}
      />
    </div>
  );
};

export default AdminProposalsTable;