import Home from "./views/Home.js";
import Offers from "./views/Offers.js";
import Blog from "./views/Blog.js";
import BlogView from "./views/BlogView.js";
import About from "./views/About.js";
import Contact from "./views/Contact.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    // Define the routes for the single-page application
    // Each route object contains a path and its corresponding view component
    const routes = [
        { path: "/", view: Home },
        { path: "/blog", view: Blog },
        { path: "/blog/:id", view: BlogView },
        { path: "/offers", view: Offers },
        { path: "/contact", view: Contact },
        { path: "/about", view: About }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));
    document.querySelector("#app").innerHTML = await view.getHtml();

    // Call afterRender if it exists
    if (view.afterRender) {
        console.log("After render");
        await view.afterRender();
    }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});