class InvoicesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:show]

  layout 'pdfs'

  def show
    html = render_to_string('invoices/show', layout: 'pdfs')

    pdf = Grover.new(html).to_pdf

    send_data pdf, filename: 'test.pdf'
    # respond_to do |format|
    #   format.html
    #   # format.pdf do
    #   #   render pdf: "show", template: "invoices/show", formats: [:html], layout: 'pdfs'
    #   # end
    # end
  end
end
