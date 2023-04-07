const Address = {
  address_1: "",
  address_2: "",
  city: "",
  state_code: "",
  zipcode: "",
  country_code: "",
};

const Customer = {
  first_name: "",
  last_name: "",
  email: "",
  gate_code: "",
  phone_number: "",
  company: "",
};

const Payment = {
  date: "",
  paid_in_cents: 0,
  payment_type: "",
  check_number: "",
  discounts_in_cents: 0,
  fees_in_cents: 0,
  subtotal_in_cents: 0,
  total_in_cents: 0,
};

const Property = {
  name: "",
};

const RentalAgreement = {
  price_in_cents: 0,
  start_date: null,
  end_date: null,
  next_due_date: null,
  frequency_in_months: 1,
  customer_id: null,
  unit_id: null,
};

const Unit = {
  name: "",
  type_of: "",
  price_in_cents: 0,
  occupied: false,
};

const Invoice = {
  customer_id: null,
  state: "draft",
  date: null,
  subtotal_in_cents: 0,
  total_in_cents: 0,
  payment_id: null,
  invoice_adjustments: [],
  invoice_items: [],
};

const InvoiceAdjustment = {
  invoice_id: null,
  type_of: "discount",
  reason: "",
  reason_description: "",
  price_in_cents: 0,
  price: "",
};

export {
  Address,
  Customer,
  Invoice,
  InvoiceAdjustment,
  Payment,
  Property,
  RentalAgreement,
  Unit,
};
