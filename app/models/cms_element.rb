class CmsElement < ApplicationRecord

  StyleProperty = Struct.new(:name, :value) do

  end

  class MarkupNode
    include ActionView::Helpers::TagHelper
    attr_accessor :name, :children, :style_properties

    def initialize(name)
      @name = name
      @children = []
      @style_properties = []
    end

    def to_html
      child_markup = @children.map(&:to_html).join
      content_tag(:div, child_markup)
    end

    def as_json
      { name: @name,
        style_property: @style_properties.map(&:as_json),
        children: @children.map(&:as_json)
      }
    end

  end


end
