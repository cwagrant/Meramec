module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField


    # NOTE
    # GraphQL requires types to be pretty specific with queries
    # An ID is treated like a string and it appears that useParams from
    # react-router returns a string value
    #
    # Therefore we need to probably update a lot of the pregenerated files
    # to make sure that IDs are used as a proper ID.
    #
    #
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    #
    field :addresses, [Types::AddressType], null: false do
      argument :attributes, Types::AddressInputType, required: false
    end

    field :address, Types::AddressType, null:false do
      argument :attributes, Types::AddressInputType
    end

    field :customers, [Types::CustomerType], null: false do
      argument :attributes, Types::CustomerInputType, required: false
    end

    field :customer, Types::CustomerType, null: false do
      argument :attributes, Types::CustomerInputType
    end

    field :payments, [Types::PaymentType], null: false do
      argument :attributes, Types::PaymentInputType, required: false
    end

    field :payment, Types::PaymentType, null: false do
      argument :attributes, Types::PaymentInputType
    end

    field :properties, [Types::PropertyType], null: false do
      argument :attributes, Types::PropertyInputType, required: false
    end

    field :property, Types::PropertyType, null: false do
      argument :attributes, Types::PropertyInputType
    end

    field :rental_agreements, [Types::RentalAgreementType], null: false do
      argument :attributes, Types::RentalAgreementInputType, required: false
    end

    field :rental_agreement, Types::RentalAgreementType, null: false do
      argument :attributes, Types::RentalAgreementInputType
    end

    field :rental_agreement_payments, [Types::RentalAgreementPaymentType], null: false do
      argument :attributes, Types::RentalAgreementPaymentInputType, required: false
    end

    field :rental_agreement_payment, Types::RentalAgreementPaymentType, null: false do
      argument :attributes, Types::RentalAgreementPaymentInputType
    end

    field :rental_agreement_terms, [Types::RentalAgreementTermType], null: false do
      argument :attributes, Types::RentalAgreementTermInputType, required: false
    end

    field :rental_agreement_term, Types::RentalAgreementTermType, null: false do
      argument :attributes, Types::RentalAgreementTermInputType
    end

    field :rental_agreement_term_values, [Types::RentalAgreementTermValueType], null: false do
      argument :attributes, Types::RentalAgreementTermValueInputType, required: false
    end

    field :rental_agreement_term_value, Types::RentalAgreementTermValueType, null: false do
      argument :attributes, Types::RentalAgreementTermValueInputType
    end

    field :terms, [Types::TermType], null: false do
      argument :attributes, Types::TermInputType, required: false
    end

    field :term, Types::TermType, null: false do
      argument :attributes, Types::TermInputType
    end

    field :units, [Types::UnitType], null: true do
      argument :attributes, Types::UnitInputType, required: false
    end

    field :unit, Types::UnitType, null: false do
      argument :attributes, Types::UnitInputType
    end

    def addresses(attributes: nil)
      return Address.all if attributes.blank?

      Address.where(**attributes)
    end

    def address(attributes:)
      Address.where(**attributes)
    end

    def customers(attributes: nil)
      return Customer.all if attributes.blank?
      attr_hash = attributes.to_hash
      name = attr_hash.delete(:name)
      customers = Customer.where(attr_hash)

      if name.present?
        customers = name.split(' ').reduce(customers) do |scope, value|
          newScope = scope
            .where('first_name like ?', "%#{value}%")
            .or(scope.where(
              'last_name like ?', "%#{value}%"))
          
          newScope
        end
      end

      customers
    end

    def customer(attributes:)
      attr_hash = attributes.to_hash
      Customer.find_by(attr_hash)
    end

    def payments(attributes: nil)
      return Payment.all if attributes.blank?

      Payment.where(**attributes)
    end

    def payment(attributes: nil)
      Payment.where(**attributes)
    end

    def properties(attributes: nil)
      return Property.all if attributes.blank?

      attr_hash = attributes.to_hash
      name = attr_hash.delete(:name)
      properties = Property.where(attr_hash)

      if name.present?
        properties = properties.where('lower(name) like ?', "%#{name&.downcase}%")
      end

      properties
    end

    def property(attributes:)
      attr_hash = attributes.to_hash
      name = attr_hash.delete(:name)

      # Property
      #   .where('lower(name) like ?', "%#{name&.downcase}%")
      #   .where(attr_hash)
      
      Property.where(attr_hash).first
    end

    def rental_agreements(attributes: nil)
      return RentalAgreement.all if attributes.blank?

      attr_hash = attributes.to_hash
      search = attr_hash.delete(:search)
      agreements = RentalAgreement.joins(:unit, :customer).where(attr_hash)

      if search.present?
        agreements = agreements.where(Unit.arel_table[:name].matches("%#{search}%"))
          .or(agreements.where(Customer.arel_table[:first_name].matches("%#{search}")))
          .or(agreements.where(Customer.arel_table[:last_name].matches("%#{search}")))
      end

      agreements
    end

    def rental_agreement(attributes:)
      attr_hash = attributes.to_hash
      name = attr_hash.delete(:name)

      RentalAgreement.where(attr_hash).first
    end

    def rental_agreement_payments(attributes:)
      return RentalAgreementPayment.all if attributes.blank?

      RentalAgreementPayment.where(**attributes)
    end

    def rental_agreement_payment(attributes:)
      RentalAgreementPayment.where(**attributes)
    end

    def rental_agreement_terms(attributes:)
      return RentalAgreementTerm.all if attributes.blank?

      RentalAgreementTerm.where(**attributes)
    end

    def rental_agreement_term(attributes:)
      RentalAgreementTerm.where(**attributes)
    end

    def rental_agreement_term_values(attributes:)
      return RentalAgreementTermValue.all if attributes.blank?

      RentalAgreementTermValue.where(**attributes)
    end

    def rental_agreement_term_value(attributes:)
      RentalAgreementTermValue.where(**attributes)
    end

    def terms(attributes: nil)
      return Term.all if attributes.blank?

      Term.where(**attributes)
    end

    def term(attributes:)
      Term.where(**attributes)
    end

    def units(attributes: nil)
      return Unit.all if attributes.blank?

      attr_hash = attributes.to_hash
      name = attr_hash.delete(:name)
      units = Unit.where(attr_hash)

      if name.present?
        units = units.where('lower(name) like ?', "%#{name&.downcase}%")
      end

      units
    end

    def unit(attributes:)
      attr_hash = attributes.to_hash
      Unit.where(attr_hash).first
    end
  end
end
