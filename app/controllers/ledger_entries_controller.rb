class LedgerEntriesController < ApplicationController
  def index
    render json: LedgerEntry.where(rental_agreement_id: params[:rental_agreement_id])
  end
end
