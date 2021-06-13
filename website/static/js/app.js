/*-------------- navigation menu -----------*/

(() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
        navMenu = document.querySelector(".nav-menu"),
        closeNavBtn = document.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect() {
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300)
    }

    // attach an event handler to document
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains('link-item')) {
            /* make sure event.target.hash has a value before overridding 
            default behavior*/
            if (event.target.hash !== "") {
                // prevent default anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                // deactivating existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // activate new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                /* deactivating existing active navigation menu 'link-item' */
                navMenu.querySelector(".active").classList.add("outer-shadow",
                    "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active",
                    "inner-shadow");
                /* if clicked 'link-item' is contained within the navigation menu*/
                if (navMenu.classList.contains("open")) {
                    // activate new navigation menu 'link-item'
                    event.target.classList.add("active", "inner-shadow");
                    event.target.classList.remove("outer-shadow", "hover-in-shadow");
                    // hide navigation menu
                    hideNavMenu();
                } else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            // activate new navigation menu 'link-item'
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                // add hash (#) to url 
                window.location.hash = hash;
            }
        } else {

        }
    })

})();

/*---------------- hide all section except active ---------------
(() => {

    const sections = document.querySelectorAll(".section");

    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })

})();*/

window.addEventListener("load", () => {
    //preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".preloader").style.display = "none";
    })
})

/*----------------- predict ------------------*/

function openCity(evt, cityName) {
    var i, tabcontent, tablinks
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "grid";
    evt.currentTarget.className += " active";
}

/********* mumbai *******/
function getBathValue() {
    var mBathrooms = document.getElementsByName("mBathrooms");
    for (var i in mBathrooms) {
        if (mBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var mBHK = document.getElementsByName("mBHK");
    for (var i in mBHK) {
        if (mBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePriceM() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("mSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("mLocations");
    var estPrice = document.getElementById("mEstimatedPrice");
    var money = document.getElementById("money");

    var url = "http://127.0.0.1:5000/predict_home_price_m"; //Use this if you are NOT using nginx 
    // var url = "/api/predict_home_price_m"; // Use this if  you are using nginx. 

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + "</h2>";
        console.log(status);
    });

    money.play();

}

/********* delhi *******/
function getBathValue() {
    var dBathrooms = document.getElementsByName("dBathrooms");
    for (var i in dBathrooms) {
        if (dBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var dBHK = document.getElementsByName("dBHK");
    for (var i in dBHK) {
        if (dBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePriceD() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("dSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("dLocations");
    var estPrice = document.getElementById("dEstimatedPrice");
    var money = document.getElementById("money");

    var url = "http://127.0.0.1:5000/predict_home_price_d"; //Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/predict_home_price_d"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + "</h2>";
        console.log(status);
    });

    money.play();

}

/********* bangalore *******/
function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    var money = document.getElementById("money");

    var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + "</h2>";
        console.log(status);
    });

    money.play();

}

// locations

function onPageLoad() {

    console.log("mumbai document loaded");
    var urlm = "http://127.0.0.1:5000/get_location_names_m"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var urlm = "/api/get_location_names_m"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(urlm, function(data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var mLocations = document.getElementById("mLocations");
            $('#mLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#mLocations').append(opt);
            }
        }
    });

    console.log("delhi document loaded");
    var urld = "http://127.0.0.1:5000/get_location_names_d"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var urld = "/api/get_location_names_d"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(urld, function(data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var dLocations = document.getElementById("dLocations");
            $('#dLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#dLocations').append(opt);
            }
        }
    });

    console.log("bangalore document loaded");
    var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
    // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
    $.get(url, function(data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;