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

ActiveRecord::Schema[7.0].define(version: 2023_03_24_183925) do
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
    t.index ["address_id"], name: "index_customers_on_address_id"
  end

  create_table "ledger_entries", force: :cascade do |t|
    t.integer "rental_agreement_id"
    t.string "source_type"
    t.integer "source_id"
    t.integer "amount_in_cents", default: 0
    t.index ["rental_agreement_id"], name: "index_ledger_entries_on_rental_agreement_id"
    t.index ["source_type", "source_id"], name: "index_ledger_entries_on_source"
  end

  create_table "payments", force: :cascade do |t|
    t.integer "customer_id"
    t.integer "attachment_id"
    t.integer "amount_in_cents"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_payments_on_customer_id"
  end

  create_table "properties", force: :cascade do |t|
    t.string "name"
    t.integer "address_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["address_id"], name: "index_properties_on_address_id"
  end

  create_table "rental_agreement_payments", force: :cascade do |t|
    t.integer "rental_agreement_id"
    t.integer "payment_id"
    t.integer "paid_months"
    t.date "paid_until"
    t.integer "amount_in_cents", default: 0
    t.text "note", default: ""
    t.index ["payment_id"], name: "index_rental_agreement_payments_on_payment_id"
    t.index ["rental_agreement_id"], name: "index_rental_agreement_payments_on_rental_agreement_id"
  end

  create_table "rental_agreement_term_values", force: :cascade do |t|
    t.integer "rental_agreement_term_id"
    t.string "key"
    t.text "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rental_agreement_term_id"], name: "index_rental_agreement_term_values_on_rental_agreement_term_id"
  end

  create_table "rental_agreement_terms", force: :cascade do |t|
    t.integer "rental_agreement_id"
    t.integer "term_id"
    t.date "starts_at"
    t.date "ends_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rental_agreement_id"], name: "index_rental_agreement_terms_on_rental_agreement_id"
    t.index ["term_id"], name: "index_rental_agreement_terms_on_term_id"
  end

  create_table "rental_agreements", force: :cascade do |t|
    t.integer "unit_id"
    t.integer "customer_id"
    t.integer "price_in_cents"
    t.date "start_date"
    t.date "end_date"
    t.date "next_due_date"
    t.index ["customer_id"], name: "index_rental_agreements_on_customer_id"
    t.index ["unit_id"], name: "index_rental_agreements_on_unit_id"
  end

  create_table "terms", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "term_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "units", force: :cascade do |t|
    t.string "name"
    t.integer "type_of"
    t.integer "price_in_cents"
    t.integer "property_id"
    t.integer "address_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "customers", "addresses"
  add_foreign_key "ledger_entries", "rental_agreements"
  add_foreign_key "payments", "customers"
  add_foreign_key "properties", "addresses"
  add_foreign_key "rental_agreement_payments", "rental_agreements"
  add_foreign_key "rental_agreement_term_values", "rental_agreement_terms"
  add_foreign_key "rental_agreement_terms", "rental_agreements"
  add_foreign_key "rental_agreement_terms", "terms"
  add_foreign_key "rental_agreements", "customers"
  add_foreign_key "rental_agreements", "units"
  add_foreign_key "units", "properties"
  add_foreign_key "units", "properties", column: "address_id"
end
