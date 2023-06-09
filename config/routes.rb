Rails.application.routes.draw do
  
  resources :likes
  resources :media
  resources :timescores
  resources :racecars
  resources :friends
  resources :posts
  resources :messages
  resources :favorites
  resources :attendinglists
  resources :events
  resources :racetracks
  resources :users

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/login", to: "sessions#create"

  delete "logout", to: "sessions#destroy"

  get "/tracks", to: "racetracks#index"

  post "/racecars", to: "racecars#create"

  patch "/racecars", to: "racecars#update"

  get "/posts", to: "posts#index"
  post "/posts", to: "posts#create"
  patch "/posts", to: "posts#update"
  delete "/posts", to: "posts#destroy"

  get "/likes", to: "likes#index"
  post "/likes", to: "likes#create"
  delete "/likes", to: "likes#destroy"

  get "/favorites", to: "favorites#index"
  post "/favorites", to: "favorites#create"
  delete "/favorites", to: "favorites#destroy"

  get "/friends", to: "friends#index"
  get "/friends", to: "friends#create"
  get "/friends", to: "friends#destroy"

  get "/timescores", to: "timescores#index"
  post "/timescores", to: "timescores#create"
  delete "/timescores", to: "timescores#destroy"

  get "/others", to: "users#index"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
