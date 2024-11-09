import LoginForm from "@/components/customer/loginForm";

export default function Login() {
  return (
    <div className="w-full flex justify-center px-4 lg:px-0">
      <div
        id="auth-card"
        className="w-full lg:w-1/2 lg:max-w-[800px] bg-white p-10 rounded-2xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-primary mb-10">
          Login
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
