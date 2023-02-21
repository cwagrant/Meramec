class Customer < ApplicationRecord
  belongs_to :address, optional: true
  has_many :payments

  def name
    "#{first_name} #{last_name}"
  end

  def formal_name
    "#{last_name}, #{first_name}"
  end
end
