# Pet Shelter API

This application provides RESTful APIs to store and manage the database of pets along with its location information. The GET and POST APIs help in adding new pet, retrieving a pet profile and list of all pets. 

## Setup
The server is built on node.js and for the database storage SQLite is used. Along with the node packages `express`, `sqlite3`, `cors` and `body-parser`. In order to setup the project, download the source and perform following steps.
```
$cd /pet-shelter-api
$npm install
$npm start
``` 
The server will be launched at port `3000`, go to `http://localhost:3000/pets`.


The API details are listed below. 

## List of REST APIs
1. GET /pets: Returns list of all pets from the pets with each pet's name, type and breed.
2. GET /pet/{id}: Returns a specific pet's information including location, latitude and longitude.
3. POST /pet: Adds a new pet to the database. The post parameters are:
    1. name: the name of the pet
    2. type: the type of the pet
    3. breed: the breed of the pet
    4. location: the city/state information of the pet's location
    5. latitude: the latitude coordinate of the pet's location, which must be between -90 and +90 inclusive
    6. longitude: the longitude coordinate of the pet's location, which must be between -180 and +180 inclusive
4. GEt /pet?name={{name}}&breed={{breed}}: Returns pet by name and breed
## API Error Handling
The pet creation API handles following error checks.
1. The server identifies a pet uniquely with the pair (name, type), if such pair is already exists then the operation finishes with failure.
2. The pet location takes latitude and longitude, if the latitude/longitude is not in the valid range then the operation finished with failure. A latitude valid range is -90 to +90 (inclusive) and longitude valid range is -180 to + 180 (inclusive). 

## API Response Format:
Each API returns whether the operation has been performed successfully or not with the `success` field. APIs that return specific data contains the `data` parameter with the resulted information and if finished with error it returns the specific error message with the `error` field, like in the examples given below.
1. On Success 
```
{
    "success": true,
    "data": [
         {
      "id": 1,
      "name": "daredevil",
      "type": "dog",
      "breed": "beagle",
      "location": "Boston, MA",
      "latitude": 42.3,
      "longitude": 71.0
    }
    ]
}
```
2. On Failure
```
{
    "success": false,
    "error": "Invalid latitude 123.45"
}
```
