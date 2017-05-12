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

    def self.from_hashes(array_of_hashes)
      array_of_hashes.map{|h| MarkupNode.from_hash(h)}
    end

    def self.from_hash(hash)
      name = hash['name']
      new_node = MarkupNode.new(name)
      new_node.children = MarkupNode.from_hashes(hash['children'])
      new_node.style_properties = hash['style_properties'].map{|sp_hash| StyleProperty.new(sp_hash['name'], sp_hash['value'])}
      new_node
    end


    def to_html
      child_markup = @children.map(&:to_html).join('').html_safe
      styles = @style_properties.map { |p| "  #{p.name}: #{p.value}" }.join(";")
      content_tag(:div, child_markup, class: @name, style: styles)
    end

    def as_json
      { 'name' => @name,
        'style_properties' => @style_properties.map(&:as_json),
        'children' => @children.map(&:as_json)
      }
    end

    def to_css(parent_selector=nil)
      current_selector = "#{parent_selector}#{parent_selector ? ' > ' : ''}.#{@name}"
      current_styles = [make_style(current_selector, @style_properties)]
      children_styles = @children.map{|c| c.to_css(current_selector)}

      (current_styles + children_styles).join("\n")
    end

    def make_style(selector, props_list)
      assigns = @style_properties.map { |p| "  #{p.name}: #{p.value};" }
      "#{selector} {\n#{assigns.join("\n")}\n}\n"
    end
  end

  def parsed

    MarkupNode.from_hashes(JSON.parse(markup))
  end

end
