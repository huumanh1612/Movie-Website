const express =require("express");

const router = express.Router();

router.get("/", (req, res)=>{
    res.render("index");
});

router.get("/register", (req, res)=>{
    res.render("register");
});

router.get("/login", (req, res)=>{
    res.render("login");
});

router.get('/movie-details', (req, res) => {
        res.render('movie-details');
});

router.get('/homepage', (req, res) => {
    res.render('homepage', {
        username: req.session.username
    });
});
router.get("/movie", (req, res) => {
    res.render("movie");
});

router.get('/adminHomepage', (req, res) => {
    res.render('adminHomepage', {
        username: req.session.username
    });
});

router.get("/adminHomepage", (req, res) => {
    res.render("adminHomepage");
});

router.get("/addmovie", (req, res) => {
    res.render("addmovie");
});
module.exports = router;
