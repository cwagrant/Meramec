module ApiHelper
  def auth_headers(user = nil)
    user ||= User.first
    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }

    Devise::JWT::TestHelpers.auth_headers(headers, user)
  end
end
