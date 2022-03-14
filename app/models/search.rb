# frozen_string_literal: true

class Search < ActiveModelSerializers::Model
  attributes :accounts, :more, :statuses, :hashtags
end
