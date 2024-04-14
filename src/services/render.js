
exports.homeRoute = (req, res) => {
    // Check if JWT token is present in request cookies
  const jwtToken = req.cookies.jwt;
  if (jwtToken) {
    // Redirect to indexafterlogin route
    res.redirect("/login");
  } else {
    // Render the index page
    res.render("sign_page");
  }
  };
exports.secret = (req, res) => {
    res.render("secret");
  };
exports.alreadylogin = (req, res) => {
    res.render("login");
  };
  
