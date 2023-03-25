class ProcessRentalAgreementsJob
  include Sidekiq::Job

  def perform(*args)
    RentalAgreement.active.payment_due_on(Date.today) do |agreement|
      agreement.owes!
    end
  end
end
