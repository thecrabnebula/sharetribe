module PaypalService::API
  Api =
    if Rails.env.test?
      FakeApiImplementation
    else
      require "#{Rails.root}/spec/services/paypal_service/fake_api_implementation"
      FakeApiImplementation
      # ApiImplementation
    end
end
