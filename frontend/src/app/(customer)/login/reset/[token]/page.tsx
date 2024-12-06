import ResetPasswordForm from "@/components/customer/resetPasswordForm";
import {redirect} from "next/navigation";

export default async function PasswordResetPage({
  params,
}: {
  params: {token: string};
}) {
  const {token} = params;
  if (!token) {
    return <div className="text-center">Invalid token</div>;
  }

  try {
    const response = await fetch(
      `${process.env.API_URL_SERVER}/api/auth/validate-token/${token}`,
      {
        method: "GET", // or 'POST', depending on your request type
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      redirect("/login");
    }
  } catch (error: any) {
    redirect("/login");
  }

  return (
    <div className="w-full flex justify-center px-4 lg:px-0">
      <div
        id="auth-card"
        className="w-full lg:w-1/2 lg:max-w-[800px] bg-white p-10 rounded-2xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-primary mb-10">
          Reset Password
        </h1>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
