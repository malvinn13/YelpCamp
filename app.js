var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    app         = express(),
    seedDB      = require('./seeds');

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true,  useUnifiedTopology: true});

//seedDB();

var Campground   = require("./models/campground");
var Comment      = require("./models/comment");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    Campground.find((err, foundCampgrounds) => {
        if(err) console.log(err)
        else res.render("campgrounds/campgrounds", {campgrounds: foundCampgrounds});
    });
});

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

app.get("/campgrounds/:id", (req, res) =>{
     Campground.findOne({_id: req.params.id}).populate('comments').exec(async (err, foundCampground) =>{
        if(err || !foundCampground) res.redirect("/campgrounds")
        else res.render('campgrounds/show', {campground: foundCampground});
    });
});

app.post("/campgrounds", (req, res) => {
    var newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    Campground.create(newCampground, (err) =>{
        if(err) console.log(err)
        else res.redirect("/campgrounds");
    });
});

// ======================
// COMMENTS ROUTE
// ======================

app.get("/campgrounds/:id/comments/new", (req, res) =>{
    Campground.findOne({_id: req.params.id}, (err, found) => {
        if(err) console.log(err)
        else res.render("comments/new", {campground: found});
    });
});

app.post("/campgrounds/:id/comments", (req, res) => {
    Campground.findById(req.params.id, (err, found) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, (err, comment) => {
                found.comments.push(comment);
                found.save();
                res.redirect("/campgrounds/" + req.params.id);
            });
        }    
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});