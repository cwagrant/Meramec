class BillingCycleWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  queue_as :default

  def perform
    logger.info "BillingCycleManagerJob started #{Time.now}"

    invoice_date = Date.today
    next_due_on = invoice_date + 14.days

    customers = RentalAgreement.active.payment_due_on(next_due_on).map(&:customer).uniq

    customers.each do |customer|
      begin
        ActiveRecord::Base.transaction do
          invoice = customer.invoices.new(date: invoice_date, state: 'pending')
          invoice.generate_for_date(next_due_on)

          invoice.save!

          # invoice.rental_agreements.each do |agreement|
          #   agreement.push_due_date!
          # end
        end
      rescue StandardError=> e
        logger.error e.message
        e.backtrace.each{ |line| logger.error line }
      end
    end

    logger.info "BillingCycleManagerJob completed #{Time.now}"
  end
end
