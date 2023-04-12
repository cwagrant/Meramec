class Property < ApplicationRecord
  include Searchable

  belongs_to :address, optional: true
  has_many :units, dependent: :restrict_with_error

  accepts_nested_attributes_for :address, allow_destroy: true, reject_if: :empty_address?

  validates :name, presence: true, uniqueness: true

  def self.searchable_attributes
    [:name]
  end

  def as_json(args = {})
    super({include: :address})
  end

  private

  def empty_address?(attr)
    attr.blank? || attr[:address_1].blank?
  end
end
