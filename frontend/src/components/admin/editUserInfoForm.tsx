"use client";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import InputField from "../common/inputField";
import EditEmailForm from "./editEmailForm";
import PasswordResetForm from "./passwordResetForm";
import MyButton from "../carrier/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getCustomerById, updateCustomerEmail, updateCustomerPassword, deleteCustomer } from "@/services/customerService";
import { useRouter } from "next/navigation";

type Props = {
 id: string;
};

const EditUserInfoForm = ({ id }: Props) => {
 const router = useRouter();
 const [user, setUser] = useState<User | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   fetchUser();
 }, [id]);

 const fetchUser = async () => {
   try {
     const userData = await getCustomerById(id);
     setUser(userData);
   } catch (err) {
     console.error('Error fetching user:', err);
     setError(err instanceof Error ? err.message : 'Failed to fetch user');
   } finally {
     setLoading(false);
   }
 };

 const handleUpdateEmail = async (currentEmail: string, updatedEmail: string) => {
   try {
     await updateCustomerEmail(id, currentEmail, updatedEmail);
     await fetchUser(); // Refresh user data
   } catch (err) {
     throw err;
   }
 };

 const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
   try {
     await updateCustomerPassword(id, currentPassword, newPassword);
   } catch (err) {
     throw err;
   }
 };

const handleDeleteUser = async () => {
  if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    try {
      await deleteCustomer(id);
      router.push('/admin/users');  
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  }
};

 if (loading) {
   return <div>Loading...</div>;
 }

 if (error || !user) {
   return <div className="text-red-500">Error: {error || 'User not found'}</div>;
 }

 return (
   <div className="">
     <div className="grid grid-cols-2">
       <div>
         <p className="font-bold text-neutral-700">Name</p>
         <InputField
           id={"name"}
           width={"450px"}
           type={"text"}
           name={"name"}
           handleChange={() => {}}
           handleBlur={() => {}}
           value={`${user.firstName} ${user.lastName}`}
           disabled
         />
       </div>
       <div>
         <p className="font-bold text-neutral-700">Role</p>
         <InputField
           id={"role"}
           width={"450px"}
           type={"text"}
           name={"role"}
           handleChange={() => {}}
           handleBlur={() => {}}
           value={"User"}
           disabled
         />
       </div>
     </div>
     <EditEmailForm 
       role={"user"} 
       initialValue={user.email} 
       onSubmit={handleUpdateEmail}
     />
     <PasswordResetForm 
       role={"user"} 
       onSubmit={handleUpdatePassword}
     />
     <div className="mt-5">
       <MyButton red onClick={handleDeleteUser}>
         <FontAwesomeIcon icon={faTrash} />
         Delete User
       </MyButton>
     </div>
   </div>
 );
};

export default EditUserInfoForm;