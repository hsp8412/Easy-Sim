import ContactFormWrapper from "@/components/customer/contactFormWrapper";

export default function ContactPage() {
  return (
    <div className="mx-3 lg:mx-5 xl:mx-8">
      {/* Green/Blue Gradient Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-5 rounded-3xl text-center text-white font-bold py-10">
        <div className="text-3xl lg:text-4xl xl:text-5xl mb-6">
          How May We Help?
        </div>
        <div className="text-xl lg:text-2xl xl:text-3xl font-light">
          We're here to help you with any questions you may have.
        </div>
      </div>

      {/* White Form Section */}
      <div className="bg-white p-5 rounded-lg mt-5 shadow-md text-black">
        <ContactFormWrapper />
      </div>
    </div>
  );
}
