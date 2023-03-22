# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Racetrack.destroy_all

Racetrack.create(name: "Barber Motorsports Park", address: "6040 Barber Motorsports Pkwy", state: "Alabama", city: "Leeds", zipcode: "35094", length: "2.38", style: "Circuit")
Racetrack.create(name: "Hallett Motor Racing Circuit", address: "59901 E 5500 Rd", state: "Oklahoma", city: "Jennings", zipcode: "74038", length: "1.8", style: "Circuit")
Racetrack.create(name: "Watkins Glen International", address: "2790 County Route 16", state: "New York", city: "Watkins Glen", zipcode: "14891", length: "3.4", style: "Circuit")
Racetrack.create(name: "Weathertech Raceway Laguna Seca", address: "1021 Monterey Salinas Hwy", state: "California", city: "Salinas", zipcode: "93908", length: "2.238", style: "Circuit")
Racetrack.create(name: "Road America", address: "N 7390, WI-67", state: "Wisconsin", city: "Plymouth", zipcode: "53073", length: "4.048", style: "Circuit")

Racetrack.create(name: "Thunder Valley Raceway Park", address: "10500 48th St", state: "Oklahoma", city: "Lexington", zipcode: "73051", length: "0.25", style: "Drag")
Racetrack.create(name: "Lassiter Mountain Dragway", address: "3995 Raceway Park Rd", state: "Alabama", city: "Mt Olive", zipcode: "35117", length: "0.125", style: "Drag")
Racetrack.create(name: "Bradenton Motorsports Park", address: "21000 FL-64", state: "Florida", city: "Bradenton", zipcode: "34212", length: "0.25", style: "Drag")
Racetrack.create(name: "Irwindale Dragstrip", address: "500 Speedway Dr", state: "California", city: "Irwindale", zipcode: "91706", length: "0.125", style: "Drag")
Racetrack.create(name: "Great Lakes Dragaway", address: "18411 1st St", state: "Wisconsin", city: "Union Grove", zipcode: "53182",length: "0.25", style: "Drag")
