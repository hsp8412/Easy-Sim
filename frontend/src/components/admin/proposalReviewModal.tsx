import {Proposal} from "@/types/proposal";
import MyModal from "../common/myModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faXmark} from "@fortawesome/free-solid-svg-icons";
import MyButton from "../carrier/myButton";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedProposal: Proposal | null;
  setSelectedProposal: (proposal: Proposal | null) => void;
};

const ProposalReviewModal = ({
  open,
  setOpen,
  selectedProposal,
  setSelectedProposal,
}: Props) => {
  return (
    <MyModal open={open} setOpen={setOpen}>
      <div className="flex justify-center items-center gap-2 mb-3">
        <FontAwesomeIcon icon={faEdit} className="text-primary text-3xl" />
        <h1 className="text-3xl font-bold text-primary">Proposal Review</h1>
      </div>
      <p>
        <span className="font-bold">Carrier: </span> {selectedProposal?.carrier}
      </p>
      <p>
        <span className="font-bold">Country: </span>
        {selectedProposal?.country}
      </p>
      <p>
        <span className="font-bold">Price: </span>${selectedProposal?.price}
      </p>
      <p>
        <span className="font-bold">Duration: </span>
        {selectedProposal?.duration} days
      </p>
      <p>
        <span className="font-bold">Size: </span>
        {selectedProposal?.size}
      </p>
      <p>
        <span className="font-bold">Date: </span>
        {selectedProposal?.createdDate.toLocaleDateString()}
      </p>

      <p className="font-bold mt-2">Extra Information</p>
      <textarea
        className="w-full h-32 border border-neutral-300 p-2 rounded-lg mt-2"
        value={selectedProposal?.extraInfo}
        readOnly
      />
      {selectedProposal?.status === "pending" ? (
        <div className="flex justify-between mt-2">
          <MyButton>
            <div className="flex justify-center items-center gap-2 font-bold">
              <FontAwesomeIcon icon={faCheck} className="text-white text-xl" />
              <p>Approve</p>
            </div>
          </MyButton>
          <MyButton red>
            <div className="flex justify-center items-center gap-2 font-bold">
              <FontAwesomeIcon icon={faXmark} className="text-white text-xl" />
              <p>Reject</p>
            </div>
          </MyButton>
        </div>
      ) : selectedProposal?.status === "approved" ? (
        <div className="text-center text-green-600 font-semibold">
          This proposal has been approved
        </div>
      ) : (
        <div className="text-center text-red-500 font-semibold">
          This proposal has been rejected
        </div>
      )}
    </MyModal>
  );
};

export default ProposalReviewModal;
