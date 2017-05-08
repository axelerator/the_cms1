require 'test_helper'

class CmsElementsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cms_element = cms_elements(:one)
  end

  test "should get index" do
    get cms_elements_url
    assert_response :success
  end

  test "should get new" do
    get new_cms_element_url
    assert_response :success
  end

  test "should create cms_element" do
    assert_difference('CmsElement.count') do
      post cms_elements_url, params: { cms_element: { markup: @cms_element.markup, styles: @cms_element.styles } }
    end

    assert_redirected_to cms_element_url(CmsElement.last)
  end

  test "should show cms_element" do
    get cms_element_url(@cms_element)
    assert_response :success
  end

  test "should get edit" do
    get edit_cms_element_url(@cms_element)
    assert_response :success
  end

  test "should update cms_element" do
    patch cms_element_url(@cms_element), params: { cms_element: { markup: @cms_element.markup, styles: @cms_element.styles } }
    assert_redirected_to cms_element_url(@cms_element)
  end

  test "should destroy cms_element" do
    assert_difference('CmsElement.count', -1) do
      delete cms_element_url(@cms_element)
    end

    assert_redirected_to cms_elements_url
  end
end
