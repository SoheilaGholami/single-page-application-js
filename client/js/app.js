import Dashboard from "/client/pages/dashboard.js";
import Posts from "/client/pages/posts.js";
import Products from "/client/pages/products.js";

//  what view show to user based on route?
function router() {
  const routes = [
    { path: "/client/index.html", view: Dashboard },
    { path: "/posts", view: Posts },
    { path: "/products", view: Products },
  ];
  const potentialRoutes = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });
  let match = potentialRoutes.find((route) => route.isMatch);
  if (!match) {
    match = {
      route: {
        path: "/not-found",
        view: () => console.log("not-found page"),
      },
      isMatch: true,
    };
  }
  document.querySelector("#app").innerHTML = match.route.view();
}

// 2. push user to new url:
function navigateTo(url) {
  console.log(url, 1);
  history.pushState(null, null, url);
  router();
}

window.addEventListener("popstate", router);

// sidebar toggler :
const sidebarToggler = document.querySelector(".sidebar-toggler");
const nav = document.querySelector(".nav");
const root = document.documentElement;

sidebarToggler.addEventListener("click", () => {
  nav.classList.toggle("mini-sidebar");
  if (nav.classList.contains("mini-sidebar")) {
    root.style.setProperty("--nav-width", 70 + "px");
  } else {
    root.style.setProperty("--nav-width", 250 + "px");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    // console.log(e.target.parentElement.hasAttribute("data-link"));
    if (
      e.target.hasAttribute("data-link") ||
      e.target.parentElement.hasAttribute("data-link") ||
      e.target.parentElement.parentElement.hasAttribute("data-link")
    ) {
      e.preventDefault();
      console.log(
        e.target.href ||
          e.target.parentElement.href ||
          e.target.parentElement.parentElement.href
      );
      navigateTo(
        e.target.href ||
          e.target.parentElement.href ||
          e.target.parentElement.parentElement.href
      );
    }
  });
  router();
});
