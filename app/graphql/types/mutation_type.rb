module Types
  class MutationType < Types::BaseObject
    field :rental_agreement_payment_delete, mutation: Mutations::RentalAgreementPaymentDelete
    field :rental_agreement_payment_update, mutation: Mutations::RentalAgreementPaymentUpdate
    field :rental_agreement_payment_create, mutation: Mutations::RentalAgreementPaymentCreate
    field :payment_delete, mutation: Mutations::PaymentDelete
    field :payment_update, mutation: Mutations::PaymentUpdate
    field :payment_create, mutation: Mutations::PaymentCreate
    field :rental_agreement_term_value_delete, mutation: Mutations::RentalAgreementTermValueDelete
    field :rental_agreement_term_value_update, mutation: Mutations::RentalAgreementTermValueUpdate
    field :rental_agreement_term_value_create, mutation: Mutations::RentalAgreementTermValueCreate
    field :rental_agreement_term_delete, mutation: Mutations::RentalAgreementTermDelete
    field :rental_agreement_term_update, mutation: Mutations::RentalAgreementTermUpdate
    field :rental_agreement_term_create, mutation: Mutations::RentalAgreementTermCreate
    field :term_delete, mutation: Mutations::TermDelete
    field :term_update, mutation: Mutations::TermUpdate
    field :term_create, mutation: Mutations::TermCreate
    field :rental_agreement_delete, mutation: Mutations::RentalAgreementDelete
    field :rental_agreement_update, mutation: Mutations::RentalAgreementUpdate
    field :rental_agreement_create, mutation: Mutations::RentalAgreementCreate
    field :customer_delete, mutation: Mutations::CustomerDelete
    field :customer_update, mutation: Mutations::CustomerUpdate
    field :customer_create, mutation: Mutations::CustomerCreate
    field :property_delete, mutation: Mutations::PropertyDelete
    field :property_update, mutation: Mutations::PropertyUpdate
    field :property_create, mutation: Mutations::PropertyCreate
    field :address_create, mutation: Mutations::AddressCreate
    field :address_update, mutation: Mutations::AddressUpdate
    field :address_delete, mutation: Mutations::AddressDelete
    field :unit_delete, mutation: Mutations::UnitDelete
    field :unit_update, mutation: Mutations::UnitUpdate
    field :unit_create, mutation: Mutations::UnitCreate
  end
end
