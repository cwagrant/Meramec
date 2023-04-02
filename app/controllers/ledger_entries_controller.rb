class LedgerEntriesController < ApplicationController
  def index
    render json: LedgerEntry.where(rental_agreement_id: params[:rental_agreement_id]).as_json(include: :source)
  end
end
