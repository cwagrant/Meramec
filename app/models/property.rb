class Property < ApplicationRecord
  include Searchable

  belongs_to :address, optional: true
  has_many :units, dependent: :restrict_with_error

  accepts_nested_attributes_for :address, reject_if: :empty_address?

  validates :name, presence: true, uniqueness: true

  def self.searchable_attributes
    [:name]
  end

  private

  def empty_address?(attr)
    attr[:address_1].blank?
  end
end
