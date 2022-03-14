# frozen_string_literal: true

class REST::SearchSerializer < ActiveModel::Serializer
  has_many :accounts, serializer: REST::AccountSerializer
  has_many :statuses
  has_many :more
  has_many :hashtags, serializer: REST::TagSerializer
end
