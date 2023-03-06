class Customer < ApplicationRecord
  include Searchable
  belongs_to :address, optional: true
  has_many :payments

  def name
    "#{first_name} #{last_name}"
  end

  def formal_name
    "#{last_name}, #{first_name}"
  end

  def self.searchable_attributes
    %w(first_name last_name)
  end
end
