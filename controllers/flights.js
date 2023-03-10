const Destination = require("../models/ticket");
const Flight = require("../models/flight");
const Ticket = require("../models/flight")

module.exports = {
    index,
    show,
    new: newFlight,
    create
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render("flights/index", { title: "All Flights", flights })
    })
}

function show(req, res) {
    Flight.findById(req.params.id)
        .populate('list')
        .exec(function (err, flight) {
            // Ticket.find({}).where('_id').nin(flight.list) <-- Mongoose query builder
            // Native MongoDB approach
            Destination.find({}, 
                function (err, destinations) {
                    console.log("destinations", destinations);
                    res.render('flights/show', { title: 'Flight Detail', flight, destinations })
                }
            )
        })
}

function newFlight(req, res) {
    res.render('flights/new', { title: "Add Flight" })
}

function create(req, res) {
    const flight = new Flight(req.body);
    flight.save(function(err) {
        // one way to handle errors
        if (err) return res.redirect('flights/new')
        console.log(flight)
            // for now, redirect right back to new.ejs
        res.redirect(`/flights/${flight._id}`)
    })
}