require 'rails_helper'

describe "Ping server", type: :request do

  it "returns status OK" do
    post session_timeout_prompter_server_pings_path
    expect(response).to have_http_status :ok
  end

end
