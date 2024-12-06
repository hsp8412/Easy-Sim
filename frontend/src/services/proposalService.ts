import { NewProposal, Proposal } from "@/types/proposal";
import httpService from "./httpService";

export const getMyProposals = async () => {
  try {
    const response = await httpService.get<Proposal[]>(
      "api/proposal/get-my-proposals"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProposal = async (proposal: NewProposal) => {
  console.log(proposal);
  try {
    const response = await httpService.post<NewProposal>(
      "api/proposal",
      proposal
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProposals = async () => {
  try {
    const response = await httpService.get<Proposal[]>(
      "api/proposal/all"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const reviewProposal = async (proposalId: string, status: string, reviewNotes: string = '') => {
  try {
    const response = await httpService.put<Proposal>(
      `api/proposal/${proposalId}/review`,
      { 
        status,
        reviewNotes
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};