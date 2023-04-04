class BillingCycleWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  queue_as :default

  def perform

    # Need to find all instances of Customers with Rental Agreements that have
    # a Next Due Date < Today. We then create an Invoice for the Customer that
    # adds all of said Rental Agreements to them. If no rental agreements need
    # one we don't generate an invoice. Once the invoice is generated we push
    # the next due date to the future date.
    #
    invoice_date = Date.today
    next_due_on = invoice_date + 14.days

    customers = RentalAgreement.active.payment_due_on(next_due_on).map(&:customer).uniq

    customers.each do |customer|
      begin
        ActiveRecord::Base.transaction do
          invoice = customer.invoices.new(date: invoice_date, state: 'pending')
          invoice.generate_for_date(next_due_on)

          invoice.save!

          invoice.rental_agreements.each do |agreement|
            agreement.push_due_date!
          end
        end
      rescue StandardError=> e
        logger.error e.message
        e.backtrace.each{ |line| logger.error line }
      end
    end

    # RentalAgreement.active.payment_due_on(Time.now).each do |agreement|
    #   begin
    #     agreement.owes!
    #   rescue StandardError=> e
    #     logger.error e.message
    #     e.backtrace.each{ |line| logger.error line }
    #   end
    # end

    logger.info 'BillingCycleManagerJob completed'
  end
end
