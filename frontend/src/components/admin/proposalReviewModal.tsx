"use client";
import { Proposal } from "@/types/proposal";
import MyModal from "../common/myModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import MyButton from "../carrier/myButton";
import { reviewProposal } from "@/services/proposalService";

type Props = {
 open: boolean;
 setOpen: (open: boolean) => void;
 selectedProposal: Proposal | null;
 setSelectedProposal: (proposal: Proposal | null) => void;
 refreshProposals: () => Promise<void>;
};

const ProposalReviewModal = ({
 open,
 setOpen,
 selectedProposal,
 setSelectedProposal,
 refreshProposals,
}: Props) => {
 const handleApprove = async () => {
   if (!selectedProposal) return;

   try {
     await reviewProposal(
       selectedProposal._id,
       "Approved",
       "Proposal approved by admin"
     );

     setSelectedProposal({
       ...selectedProposal,
       status: "Approved"
     });

     // Close modal and refresh table
     setOpen(false);
     await refreshProposals();
   } catch (error) {
     console.error("Error approving proposal:", error);
   }
 };
 
 const handleReject = async () => {
   if (!selectedProposal) return;

   try {
     await reviewProposal(
       selectedProposal._id, 
       "Rejected",
       "Proposal rejected by admin"
     );
     
     setSelectedProposal({
       ...selectedProposal,
       status: "Rejected"
     });
     
     // Close modal and refresh table
     setOpen(false);
     await refreshProposals();
   } catch (error) {
     console.error("Error rejecting proposal:", error);
   }
 };

 return (
   <MyModal open={open} setOpen={setOpen}>
     <div className="flex justify-center items-center gap-2 mb-3">
       <FontAwesomeIcon icon={faEdit} className="text-primary text-3xl" />
       <h1 className="text-3xl font-bold text-primary">Proposal Review</h1>
     </div>

     <div className="grid grid-cols-2 gap-4">
       <div>
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
           {selectedProposal?.size}GB
         </p>
         <p>
           <span className="font-bold">Speed: </span>
           {selectedProposal?.speed}
         </p>
       </div>
       <div>
         <p>
           <span className="font-bold">Created: </span>
           {new Date(selectedProposal?.createdDate || '').toLocaleDateString()}
         </p>
         <p>
           <span className="font-bold">Identity Verification: </span>
           {selectedProposal?.identityVerification ? 'Required' : 'Not Required'}
         </p>
         <p>
           <span className="font-bold">Top-up Available: </span>
           {selectedProposal?.topUp ? 'Yes' : 'No'}
         </p>
         <p>
           <span className="font-bold">Status: </span>
           <span className={`font-semibold ${
             selectedProposal?.status.toLowerCase() === 'pending' 
               ? 'text-yellow-600' 
               : selectedProposal?.status.toLowerCase() === 'approved'
                 ? 'text-green-600'
                 : 'text-red-600'
           }`}>
             {selectedProposal?.status}
           </span>
         </p>
       </div>
     </div>

     <div className="mt-4">
       <p className="font-bold">Extra Information</p>
       <textarea
         className="w-full h-32 border border-neutral-300 p-2 rounded-lg mt-2 bg-gray-50"
         value={selectedProposal?.extraInfo || 'No additional information provided.'}
         readOnly
       />
     </div>

     {selectedProposal?.status.toLowerCase() === "pending" ? (
       <div className="flex justify-between mt-4">
         <MyButton onClick={handleApprove}>
           <div className="flex justify-center items-center gap-2 font-bold">
             <FontAwesomeIcon icon={faCheck} className="text-white text-xl" />
             <p>Approve</p>
           </div>
         </MyButton>
         <MyButton red onClick={handleReject}>
           <div className="flex justify-center items-center gap-2 font-bold">
             <FontAwesomeIcon icon={faXmark} className="text-white text-xl" />
             <p>Reject</p>
           </div>
         </MyButton>
       </div>
     ) : selectedProposal?.status.toLowerCase() === "approved" ? (
       <div className="text-center text-green-600 font-semibold mt-4">
         This proposal has been approved and a new product has been created
       </div>
     ) : (
       <div className="text-center text-red-500 font-semibold mt-4">
         This proposal has been rejected
       </div>
     )}
   </MyModal>
 );
};

export default ProposalReviewModal;