Rails.application.routes.draw do
  get '/current_user', to: 'current_user#index'
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  get 'site/index'
  devise_for :users, path: 'api', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  }, 
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "site#index"
  scope :api do
    resources :properties, except: [:new, :edit]
    resources :units, except: [:new, :edit] 
    resources :customers, except: [:new, :edit]
    resources :rental_agreements, except: [:new, :edit]
    resources :payments, except: [:new, :edit]
  end

  get '/*path' => 'site#index'
end
