import React, { useEffect, useState } from "react";

const PricingPlan = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPaymentData = async (plan) => {
    try {
      setIsProcessing(true);
      const response = await fetch(`http://127.0.0.1:8000/?plan=${plan}`, {
        method: "GET",
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setPaymentData(data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      setErrorMessage("Failed to fetch payment details. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.submit();
  };

  const handleSubscription = async (plan) => {
    setSelectedPlan(plan);
    await fetchPaymentData(plan);
  };

  if (errorMessage) {
    return <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>;
  }

  return (
    <div>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
              Choose Your Plan
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl">
              Subscribe to one of our plans and enjoy premium features.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {["Basic", "Standard", "Premium"].map((plan) => (
              <div
                key={plan}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow-xl xl:p-8"
              >
                <h3 className="mb-4 text-2xl font-semibold">{plan}</h3>
                <p className="font-light text-gray-500 sm:text-lg">
                  {plan === "Basic"
                    ? "Best option for personal use & for your next project."
                    : plan === "Standard"
                    ? "Relevant for multiple users, extended & premium support."
                    : "Best for large-scale uses and extended redistribution rights."}
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold text-violet-600">
                    {plan === "Basic" ? "$29" : plan === "Standard" ? "$99" : "$499"}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
                <button
                  onClick={() => handleSubscription(plan.toLowerCase())}
                  className={`text-white ${
                    isProcessing || selectedPlan === plan.toLowerCase()
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-violet-600 hover:bg-violet-700"
                  } focus:ring-4 focus:ring-violet-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                  disabled={isProcessing || selectedPlan === plan.toLowerCase()}
                >
                  {isProcessing && selectedPlan === plan.toLowerCase()
                    ? "Processing..."
                    : selectedPlan === plan.toLowerCase()
                    ? "Subscribed"
                    : "Subscribe Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {paymentData && selectedPlan && (
  <div
    style={{
      textAlign: "center",
      fontFamily: "'Roboto', sans-serif",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      maxWidth: "600px",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
      backgroundColor: "#ffffff",
    }}
  >
    <h1 style={{ fontSize: "28px", color: "#333333", marginBottom: "10px" }}>
      JazzCash Payment
    </h1>
    <h2
      style={{
        fontSize: "22px",
        color: "#555555",
        marginBottom: "15px",
        fontWeight: "500",
      }}
    >
      {paymentData.product_name || selectedPlan}
    </h2>
    <h3
      style={{
        fontSize: "20px",
        color: "#888888",
        marginBottom: "25px",
      }}
    >
      Price: <span style={{ color: "#D30606", fontWeight: "600" }}>{paymentData.product_price || "N/A"} Rs</span>
    </h3>
    <form
      id="jazzcashForm"
      method="post"
      action="https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/"
      onSubmit={handleSubmit}
    >
      {Object.entries(paymentData.post_data).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={value} />
      ))}
      <button
        type="submit"
        disabled={isProcessing}
        style={{
          backgroundColor: isProcessing ? "#b0b0b0" : "#D30606",
          color: "white",
          padding: "15px 30px",
          fontSize: "18px",
          fontWeight: "600",
          border: "none",
          cursor: isProcessing ? "not-allowed" : "pointer",
          borderRadius: "8px",
          transition: "background-color 0.3s ease",
        }}
      >
        {isProcessing ? "Processing..." : "Pay with JazzCash"}
      </button>
    </form>
  </div>
)}

    </div>
  );
};

export default PricingPlan;
