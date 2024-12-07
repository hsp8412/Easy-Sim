import SignUpForm from "@/components/customer/signupForm";

const SignUp = () => {
  return (
    <div className="flex justify-center w-full px-3 md:px-10">
      <div className="w-full max-w-[700px] p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-center text-primary mb-10">
          Sign Up
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
