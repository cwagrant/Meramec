class InvoicesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:print_test]

  layout 'pdfs'

  def index
    invoices = Invoice.search(params[:search], models: [Invoice, Customer])

    if params[:not_paid] == "1"
      ids = [nil]
      ids << params[:payment_id] if params[:payment_id].present?
      invoices = invoices.where(payment_id: ids)
    end

    if params[:customer_id].present?
      invoices = invoices.where(customer_id: params[:customer_id])
    end

    render json: invoices.as_json(include: [:customer, :invoice_adjustments, invoice_items: { include: :item}])
  end

  def show
    invoice = Invoice.find(params[:id])

    render json: invoice.as_json(
      include: {
        customer: {}, 
        invoice_adjustments:{},
        invoice_items: {
          include: {
            item: {
              methods: :name
            }
          }
        },
      }
    )

  end

  def create
    full_params = invoice_params.to_h
    full_params.merge!({invoice_items_attributes: full_params.delete(:invoice_items)})

    full_params.merge!({invoice_adjustments_attributes: full_params.delete(:invoice_adjustments) || []})

    invoice = Invoice.new(full_params)

    if invoice.save
      render json: invoice.as_json(
        include: {
          customer: {}, 
          invoice_adjustments: {},
          invoice_items: {
            include: {
              item: {
                methods: :name
              }
            }
          }
        }
      )
    else
      render json: {errors: invoice.errors.full_messages}, status: 500
    end
  end

  def update
    invoice = Invoice.find(params[:id])

    full_params = invoice_params.to_h
    full_params.merge!({invoice_items_attributes: full_params.delete(:invoice_items)})

    full_params.merge!({invoice_adjustments_attributes: full_params.delete(:invoice_adjustments) || []})

    invoice.update(full_params)

    if invoice.errors.none?
      render json: invoice.as_json(
        include: {
          customer: {}, 
          invoice_adjustments: {},
          invoice_items: {
            include: {
              item: {
                methods: :name
              }
            }
          }
        }
      )
    else
      render json: {errors: invoice.errors.full_messages}, status: 500
    end
  end

  def destroy
    invoice = Invoice.find(params[:id])

    if invoice.destroy
      render json: {}, status: :ok
    else
      render json: { errors: invoice.errors.full_messages}, status: 500
    end
  end

  def print
    @invoice = Invoice.find(params[:id])
    @pdf_type = 'Invoice'
    html = render_to_string('invoices/print', layout: 'pdfs')
    pdf = Grover.new(html).to_pdf
    filename = "#{Date.today.strftime("%Y-%m-%d")} #{@invoice.customer.first_name}-#{@invoice.customer.last_name}.pdf"
    send_data pdf, filename: filename
  end

  def print_test
    @invoice = Invoice.find(params[:id])
    @pdf_type = 'Invoice'
    html = render_to_string('invoices/print', layout: 'pdfs')
    pdf = Grover.new(html).to_pdf
    filename = "#{Date.today.strftime("%Y-%m-%d")} #{@invoice.customer.first_name}-#{@invoice.customer.last_name}.pdf"
    send_data pdf, filename: filename
  end

  private

  def invoice_params
    params.require(:invoice).permit(
      :customer_id,
      :date,
      :subtotal_in_cents,
      :total_in_cents,
      :paid,
      :state, 
      invoice_adjustments: [:id, :_destroy, :price, :price_in_cents, :type_of, :reason, :reason_description],
      invoice_items: [:id, :item_id, :item_type, :item_count])
  end
end
