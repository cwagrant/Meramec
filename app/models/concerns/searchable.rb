module Searchable
  extend ActiveSupport::Concern

  included do
    scope :search, ->(search_terms, models: [self]) do
      return self if search_terms.blank?
      models = [models] if !models.is_a?(Array)

      queries = models.reduce([]) do |query_acc, model|
        arel_table = model.arel_table

        query_acc << search_terms.downcase.split(' ').reduce([]) do |acc, term|
          model.searchable_attributes.map(&:to_s).each do |attr|
            next unless model.column_names.include?(attr)

            acc << arel_table[attr.to_sym()].lower().matches("%#{term}%")
          end

          acc
        end
      end

      queries.reject! { |c| c.blank? }

      associations = models.reduce([]) do |search, model|
        if model.name != self.model.name
          association = self.reflect_on_all_associations.find do |assoc|
            assoc.class_name == model.to_s
          end

          if !association
            raise StandardError.new("#{self.to_s} does not have a searchable association to #{model.to_s}.")
          else
            search << association.name
          end
        end

        search
      end

      self.joins!(associations) if associations.any?

      scopes = queries.map do |terms|
        self.where(terms.reduce(:or))
      end

      scopes.reduce(:or).distinct
    end
  end

  class_methods do
    def searchable_attributes
      warn("warning: #{self.to_s} should implement a searchable_attributes Class method.")
      []
    end
  end
end
