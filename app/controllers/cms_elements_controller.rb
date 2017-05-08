class CmsElementsController < ApplicationController
  before_action :set_cms_element, only: [:show, :edit, :update, :destroy]

  # GET /cms_elements
  # GET /cms_elements.json
  def index
    @cms_elements = CmsElement.all
  end

  # GET /cms_elements/1
  # GET /cms_elements/1.json
  def show
  end

  # GET /cms_elements/new
  def new
    @cms_element = CmsElement.new
  end

  # GET /cms_elements/1/edit
  def edit
  end

  # POST /cms_elements
  # POST /cms_elements.json
  def create
    @cms_element = CmsElement.new(cms_element_params)

    respond_to do |format|
      if @cms_element.save
        format.html { redirect_to @cms_element, notice: 'Cms element was successfully created.' }
        format.json { render :show, status: :created, location: @cms_element }
      else
        format.html { render :new }
        format.json { render json: @cms_element.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cms_elements/1
  # PATCH/PUT /cms_elements/1.json
  def update
    respond_to do |format|
      if @cms_element.update(cms_element_params)
        format.html { redirect_to @cms_element, notice: 'Cms element was successfully updated.' }
        format.json { render :show, status: :ok, location: @cms_element }
      else
        format.html { render :edit }
        format.json { render json: @cms_element.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cms_elements/1
  # DELETE /cms_elements/1.json
  def destroy
    @cms_element.destroy
    respond_to do |format|
      format.html { redirect_to cms_elements_url, notice: 'Cms element was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cms_element
      @cms_element = CmsElement.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def cms_element_params
      params.require(:cms_element).permit(:markup, :styles)
    end
end
