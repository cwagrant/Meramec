class Property < ApplicationRecord
  include Searchable

  belongs_to :address, optional: true
  has_many :units

  validates :name, presence: true, uniqueness: true

  def self.searchable_attributes
    [:name]
  end
end
