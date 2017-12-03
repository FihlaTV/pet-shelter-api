/**
 * Created by vyshaalnarayanam on 12/2/17.
 */

module.exports = function (app,db) {

    app.post('/api/pet',createPet);
    app.get('/api/pet', findPetByNameAndBreed);
    app.get('/api/pets', findPets);
    app.get('/api/pet/:id',findPetById);

    // Add table if not exists
    db.serialize(function(){
        db.run("CREATE TABLE IF NOT EXISTS pets (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, type TEXT, breed TEXT, location TEXT, latitude TEXT, longitude TEXT)");
    });

// API:1 Get all pets
    function findPets(req,res) {
        var pets = [];
        res.contentType('application/json');
        db.all("SELECT id as id, name as name, type as type, breed as breed FROM pets",
            function (err, rows) {
                if (err) {
                    res.send(createError(err));
                } else {
                    res.send(createResponse(rows));
                }
            });
    }

// API:2 Get a pet profile
    function findPetById(req,res) {
        var id = req.params.id;
        console.log(id);
        res.contentType('application/json');
        db.all("SELECT * FROM pets WHERE id = ?", Number(id), function (err, row) {
            if (err) {
                res.send(createError(err));
            } else {
                console.log(row);
                res.send(createResponse(row));
            }
        });
    }

// API:3 Register a pet
    function createPet(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.contentType('application/json');
        var name = req.body.name;
        var type = req.body.type;
        var breed = req.body.breed;
        var location = req.body.location;
        var latitude = req.body.latitude;
        var longitude = req.body.longitude;
        if (!validLatitude(latitude)) {
            res.json(createError('Invalid latitude ' + latitude));
            return;
        }
        if (!validLongitude(longitude)) {
            res.json(createError('Invalid longitude ' + longitude));
            return;
        }
        // Add new pet
        db.run("INSERT INTO pets (name, type, breed, location, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)", name, type, breed, location, latitude, longitude, function (err, row) {
            if (err) {
                res.send(err);
            } else {
                res.send({'success': true});
            }
        });
    }

    // API:4 Get a pet by name and breed
    function findPetByNameAndBreed(req,res) {
        var name = req.query.name;
        var breed = req.query.breed;
        console.log(name,breed);
        res.contentType('application/json');
        db.all("SELECT * FROM pets WHERE name = ? AND breed = ?", name, breed, function (err, row) {
            if (err) {
                res.send(createError(err));
            } else {
                console.log(row);
                res.send(createResponse(row));
            }
        });
    }

// Helper functions
    function createResponse(data) {
        return {'success': true, 'data': data}
    }

    function createError(err) {
        return {'success': false, 'error': err}
    }

    function validLatitude(x) {
        return -90 <= x && x <= 90;
    }

    function validLongitude(x) {
        return -180 <= x && x <= 180;
    }
}