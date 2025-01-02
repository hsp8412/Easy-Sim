"use client";
import {Carrier} from "@/types/carrier";
import {useState, useEffect} from "react";
import InputField from "../common/inputField";
import EditEmailForm from "./editEmailForm";
import PasswordResetForm from "./passwordResetForm";
import MyButton from "../carrier/myButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import {
  updateCarrierEmailById,
  updateCarrierPasswordById,
  getAllCarriers,
} from "@/services/carrierService";
import httpService from "@/services/httpService";

type Props = {
  id: string;
};

const EditCarrierForm = ({id}: Props) => {
  const router = useRouter();
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCarrier = async () => {
    try {
      // Get all carriers and find the specific one by id
      const carriers = await getAllCarriers();
      const foundCarrier = carriers.find((c) => c._id === id);
      setCarrier(foundCarrier || null);
    } catch (err) {
      console.error("Error fetching carrier:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch carrier");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarrier();
  }, [id, fetchCarrier]);

  const handleUpdateEmail = async (
    currentEmail: string,
    updatedEmail: string
  ) => {
    try {
      await updateCarrierEmailById(id, currentEmail, updatedEmail);
      await fetchCarrier(); // Refresh carrier data
    } catch (err) {
      throw err;
    }
  };

  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      await updateCarrierPasswordById(id, currentPassword, newPassword);
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteCarrier = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this carrier? This action cannot be undone."
      )
    ) {
      try {
        await httpService.delete("api/carrier/delete-carrier", {
          data: {id},
        });
        router.push("/admin/users"); // Redirect to users page after deletion
      } catch (err) {
        console.error("Error deleting carrier:", err);
        setError(
          err instanceof Error ? err.message : "Failed to delete carrier"
        );
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !carrier) {
    return (
      <div className="text-red-500">Error: {error || "Carrier not found"}</div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2">
        <div>
          <p className="font-bold text-neutral-700">Name</p>
          <InputField
            id={"name"}
            width={"200px"}
            type={"text"}
            name={"name"}
            handleChange={() => {}}
            handleBlur={() => {}}
            value={carrier.name}
            disabled
          />
        </div>
        <div>
          <p className="font-bold text-neutral-700">Role</p>
          <InputField
            id={"role"}
            width={"200px"}
            type={"text"}
            name={"role"}
            handleChange={() => {}}
            handleBlur={() => {}}
            value={"Carrier"}
            disabled
          />
        </div>
      </div>
      <EditEmailForm
        role={"carrier"}
        initialValue={carrier.email}
        onSubmit={handleUpdateEmail}
      />
      <PasswordResetForm role={"carrier"} onSubmit={handleUpdatePassword} />
      <div className="mt-5">
        <MyButton red onClick={handleDeleteCarrier}>
          <FontAwesomeIcon icon={faTrash} />
          Delete Carrier
        </MyButton>
      </div>
    </div>
  );
};

export default EditCarrierForm;
