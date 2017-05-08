class CreateCmsElements < ActiveRecord::Migration[5.1]
  def change
    create_table :cms_elements do |t|
      t.text :markup
      t.text :styles

      t.timestamps
    end
  end
end
