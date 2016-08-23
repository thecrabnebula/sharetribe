Then("I expect transaction with PayPal test to pass") do
  marketplace = FeatureTests::Data.create_marketplace()
  admin = FeatureTests::Data.create_member(username: "paypal_admin", marketplace_id: marketplace[:id], admin: true)
  member = FeatureTests::Data.create_member(username: "paypal_buyer", marketplace_id: marketplace[:id], admin: false)

  FeatureTests::Navigation.navigate_in_marketplace!(ident: marketplace[:ident])

  visit("/")

  find(".header").click_link("Log in")

  fill_in("main_person_login", with: admin[:username])
  fill_in("main_person_password", with: admin[:password])
  find("#main_log_in_button").click

  binding.pry
  save_screenshot("tmp/screenshots/dev.png")
end


