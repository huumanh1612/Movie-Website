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

router.get("/homepage", (req, res) => {
    res.render("homepage");
});

router.get("/movie", (req, res) => {
    res.render("movie");
});

router.get("/admin", (req, res) => {
    res.render("adminLogin");
});

router.get("/adminHomepage", (req, res) => {
    res.render("adminHomepage");
});
module.exports = router;
