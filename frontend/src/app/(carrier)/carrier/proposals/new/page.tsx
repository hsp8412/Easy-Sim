"use client";
import NewProposalForm from "@/components/carrier/newProposalForm";
import {useRouter} from "next/navigation";

export default function NewProposalPage() {
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/carrier/proposals");
  };
  return (
    <div className="h-full w-full flex flex-col justify-start items-start bg-neutral-100 px-8 py-8 gap-6">
      <h1 className="font-bold text-4xl text-neutral-600">New Proposal</h1>
      <button
        className="bg-primary hover:bg-primaryDark px-4 py-3 rounded-xl text-white"
        onClick={handleGoBack}
      >
        Back
      </button>
      <div className="bg-white rounded-2xl shadow-2xl p-5 w-full">
        <NewProposalForm />
      </div>
    </div>
  );
}
