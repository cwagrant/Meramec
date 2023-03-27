class Property < ApplicationRecord
  include Searchable

  belongs_to :address, optional: true
  has_many :units, dependent: :restrict_with_error

  validates :name, presence: true, uniqueness: true

  def self.searchable_attributes
    [:name]
  end
end
