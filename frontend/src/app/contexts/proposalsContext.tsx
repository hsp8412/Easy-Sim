import { Proposal } from "@/types/proposal";

interface IProposalsContext {
  proposals: Proposal[] | null;
  loading: boolean;
  proposalsGet: () => void;
  proposalCreate: (proposal: Proposal) => void;
  proposalUpdate: (proposal: Proposal) => void;
  proposalDelete: (proposal: Proposal) => void;
}
