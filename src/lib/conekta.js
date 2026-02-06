// Conekta payment integration stub.
// All doctors start on the free plan. Payment integration
// will be implemented when Conekta credentials are provided.

export const createCustomer = async (/* doctorId, email */) => {
  console.warn("[Conekta] Stub: createCustomer called");
  return { id: "stub_customer_id" };
};

export const createSubscription = async (/* customerId, planId */) => {
  console.warn("[Conekta] Stub: createSubscription called");
  return { id: "stub_subscription_id", status: "active" };
};

export const cancelSubscription = async (/* subscriptionId */) => {
  console.warn("[Conekta] Stub: cancelSubscription called");
  return { status: "cancelled" };
};
