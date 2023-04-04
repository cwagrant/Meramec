class BillingCycleWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  queue_as :default

  def perform

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
