const PaymentStatusDisplay = () => {
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-gray-100 w-full">
      <div>
        <p className="font-semibold text-lg">
          You haven't complete the payment.
        </p>
        <p className="text-sm">
          Please complete the payment to start using the service.
        </p>
        <button className="mt-4 bg-primary hover:bg-primaryDark transition-all duration-300 ease-in text-white rounded-lg px-4 py-2">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentStatusDisplay;
