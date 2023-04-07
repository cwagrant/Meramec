# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_04_06_042359) do
  create_table "addresses", force: :cascade do |t|
    t.text "address_1"
    t.text "address_2"
    t.string "city"
    t.string "state_code"
    t.string "zipcode"
    t.string "country_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customers", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "gate_code"
    t.integer "address_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone_number"
    t.string "company"
    t.string "formal_name", default: ""
    t.index ["address_id"], name: "index_customers_on_address_id"
  end

  create_table "invoice_adjustments", force: :cascade do |t|
    t.integer "invoice_id", null: false
    t.string "type_of"
    t.string "reason"
    t.string "reason_description"
    t.integer "price_in_cents", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invoice_id"], name: "index_invoice_adjustments_on_invoice_id"
  end

  create_table "invoice_items", force: :cascade do |t|
    t.integer "invoice_id", null: false
    t.string "item_type"
    t.integer "item_id"
    t.integer "item_count", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invoice_id"], name: "index_invoice_items_on_invoice_id"
    t.index ["item_type", "item_id"], name: "index_invoice_items_on_item"
  end

  create_table "invoices", force: :cascade do |t|
    t.integer "customer_id", null: false
    t.string "state", default: "draft", null: false
    t.date "date"
    t.integer "subtotal_in_cents", default: 0
    t.integer "total_in_cents", default: 0
    t.boolean "paid", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "payment_id"
    t.index ["customer_id"], name: "index_invoices_on_customer_id"
    t.index ["payment_id"], name: "index_invoices_on_payment_id"
  end

  create_table "payments", force: :cascade do |t|
    t.integer "customer_id"
    t.integer "attachment_id"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "paid_in_cents", default: 0, null: false
    t.string "payment_type"
    t.integer "check_number"
    t.integer "discounts_in_cents", default: 0
    t.integer "fees_in_cents", default: 0
    t.integer "subtotal_in_cents", default: 0
    t.integer "total_in_cents", default: 0
    t.index ["customer_id"], name: "index_payments_on_customer_id"
  end

  create_table "properties", force: :cascade do |t|
    t.string "name"
    t.integer "address_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address_id"], name: "index_properties_on_address_id"
  end

  create_table "rental_agreements", force: :cascade do |t|
    t.integer "unit_id"
    t.integer "customer_id"
    t.integer "price_in_cents"
    t.date "start_date"
    t.date "end_date"
    t.date "next_due_date"
    t.integer "frequency_in_months", default: 1
    t.index ["customer_id"], name: "index_rental_agreements_on_customer_id"
    t.index ["unit_id"], name: "index_rental_agreements_on_unit_id"
  end

  create_table "units", force: :cascade do |t|
    t.string "name"
    t.integer "type_of"
    t.integer "price_in_cents"
    t.integer "property_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "occupied", default: false
    t.integer "address_id"
    t.index ["address_id"], name: "index_units_on_address_id"
    t.index ["property_id"], name: "index_units_on_property_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "customers", "addresses"
  add_foreign_key "invoice_adjustments", "invoices"
  add_foreign_key "invoice_items", "invoices"
  add_foreign_key "invoices", "customers"
  add_foreign_key "invoices", "payments"
  add_foreign_key "payments", "customers"
  add_foreign_key "properties", "addresses"
  add_foreign_key "rental_agreements", "customers"
  add_foreign_key "rental_agreements", "units"
  add_foreign_key "units", "addresses"
  add_foreign_key "units", "properties"
end
