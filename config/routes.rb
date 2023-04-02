Rails.application.routes.draw do
  get '/current_user', to: 'current_user#index'
  get 'site/index'
  devise_for :users, path: 'api', path_names: {
    sign_in: 'login',
    sign_out: 'logout'
  }, 
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "site#index"
  scope :api do
    resources :users, except: [:new, :edit] 
    resources :properties, except: [:new, :edit]
    resources :units, except: [:new, :edit] 
    resources :customers, except: [:new, :edit]
    resources :rental_agreements, except: [:new, :edit]
    resources :payments, except: [:new, :edit]
    resources :invoices, only: [:show]
    resources :ledger_entries, only: [:index]
  end

  get '/*path' => 'site#index'
end
