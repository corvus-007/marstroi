document.addEventListener('DOMContentLoaded', function () {
  svg4everybody();
  $('input[type="tel"]').mask("+7 (999) 999-99-99", {});

  /*==================================
  =            Toggle nav            =
  ==================================*/

  var siteNav = document.querySelector('.site-nav');
  var categoriesNav = document.querySelector('.categories-nav');
  var primaryNav = document.querySelector('.primary-nav');
  var secondaryNav = document.querySelector('.secondary-nav');
  var siteCover = document.querySelector('.site-cover');
  var siteCoverClose = siteCover.querySelector('.site-cover__close');
  var dataNavValue = '';
  var scrollPage = 0;

  function openSiteCover() {
    scrollPage = window.pageYOffset;
    document.body.classList.add('no-scroll');
    siteCover.classList.add('site-cover--opened');
  }

  function closeSiteCover() {
    document.body.classList.remove('no-scroll');
    siteCover.classList.remove('site-cover--opened');
    window.scrollTo(0, scrollPage);
  }

  $(siteCoverClose).on('click', function (event) {
    event.preventDefault();
    closeSiteCover();
  });

  $(siteNav).on('click', 'a, .site-nav__toggle', function (event) {
    event.preventDefault();
    openSiteCover();
  });

  $(categoriesNav).on('click', 'a', function (event) {
    event.preventDefault();
    openSiteCover();
  });

  $(siteNav).on('click', '[data-nav]', updateNavs);
  $(categoriesNav).on('click', '[data-nav]', updateNavs);
  $(primaryNav).on('click', '[data-nav]', updateNavs);

  function updateNavs(event) {
    event.preventDefault();
    dataNavValue = this.dataset.nav;

    primaryNavUpdate();
    secondaryNavUpdate();
  }

  function primaryNavUpdate() {
    var primaryNavItems = primaryNav.querySelectorAll('[data-nav]');
    for (var item of primaryNavItems) {
      item.classList.remove('primary-nav__item--active');
    }
    primaryNav.querySelector('[data-nav="' + dataNavValue + '"]').classList.add('primary-nav__item--active');
  }

  function secondaryNavUpdate() {
    var secondaryNavLists = secondaryNav.querySelectorAll('[data-nav]');
    for (var item of secondaryNavLists) {
      item.classList.remove('secondary-nav__list--active');
    }
    secondaryNav.querySelector('[data-nav="' + dataNavValue + '"]').classList.add('secondary-nav__list--active');
  }


  /*=====  End of Toggle nav  ======*/

  $('.contacts-header__control-toggler').on('click', function (event) {
    event.preventDefault();
    $('.contacts-header__control-dropdown').toggleClass('contacts-header__control-dropdown--hidden');
  });

  var welcomeSlider = document.querySelector('.welcome-slider__content');

  if (welcomeSlider) {
    var welcomeSliderItems = welcomeSlider.querySelectorAll('.welcome-slider__item');
    var welcomeSliderItemsContent = welcomeSlider.querySelectorAll('.welcome-slider__item-content');
    var welcomeSliderArrows = document.querySelector('.welcome-slider__arrows');
    var welcomeSliderArrowsGap = 25;

    $(welcomeSlider).on('init', function (event, instanceSlider) {
      setTimeout(function () {
        var maxHeightContent = getMaxHeight(welcomeSliderItemsContent);
        welcomeSliderArrows.style.top = welcomeSliderItemsContent[0].offsetTop + maxHeightContent + welcomeSliderArrowsGap + 'px';
      }, 150);
    });

    $(welcomeSlider).slick({
      accessibility: false,
      autoplay: true,
      autoplaySpeed: 5500,
      appendArrows: '.welcome-slider__arrows',
      fade: true,
      speed: 1000,
      responsive: [{
        breakpoint: 768,
        settings: {
          fade: false,
          speed: 300,
          arrows: false
        }
      }]
    });
  }


  $('.reviews__slider [data-fancybox]').fancybox({
    transitionEffect: 'slide',
    loop: true,
    infobar: true,
    afterShow: function (instance, slide) {
      $('.reviews__slider').slick('slickGoTo', instance.currIndex - 1);
    }
  });

  $('.reviews__slider').slick({
    accessibility: false,
    dots: true,
    arrows: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1300,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 770,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }]
  });


  // Location map
  var contactsMap = document.querySelector('#contacts-map');

  if (contactsMap) {
    loadMapScript();
  }
});



// Загрузка карты
function loadMapScript() {
  var script = document.createElement("script");
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBYB-6kDqq0irkf8ztbpFPR2ouM6c5seAg&callback=initializeMap";

  document.head.appendChild(script);
}

// Две метки инициализация карты
function initializeMap() {
  var mapLocations = [];
  var markers = [];
  var locationPlaces = document.querySelectorAll('[data-place-location]');
  // var ICONPATH = 'images/location-pin.svg';
  var ICONPATH = 'http://marstroi.ru/wp-content/themes/marstroi/images/location-pin.svg';
  var locationCenter = null;

  Array.prototype.forEach.call(locationPlaces, function (place, i) {
    var placeItem = {};

    if ($('.js-show-map').length) {
      if (i === 0) {
        locationCenter = getLocationCenter(place);
      }
    } else {
      if (i === 0) {
        place.classList.add('contacts-info__trigger--active');
        locationCenter = getLocationCenter(place);
      }
    }
    placeItem.position = getLocationCenter(place);
    placeItem.title = place.dataset.placeCaption;

    mapLocations.push(placeItem);
  });


  var mapProp = createProp(locationCenter);
  var map = new google.maps.Map(document.getElementById("contacts-map"), mapProp);

  mapLocations.forEach(function (mapLocation) {
    addMarker(mapLocation);
  });

  if ($('.js-show-map').length) {
    clearMarkers();
  }


  $(locationPlaces).on('click', function (event) {
    event.preventDefault();
    if (!$('.js-show-map').length) {
      $(locationPlaces).removeClass('contacts-info__trigger--active');
      $(this).addClass('contacts-info__trigger--active');
    }
    map.panTo(getLocationCenter(this));
  });

  $('.js-show-map').on('click', function (event) {
    event.preventDefault();
    $('.contacts__places-holder').addClass('contacts__places-holder--closed');
    $('.contacts__toggle').removeClass('contacts__toggle--hidden');
    showMarkers();
  });

  $('.js-hide-map').on('click', function (event) {
    event.preventDefault();
    $('.contacts__places-holder').removeClass('contacts__places-holder--closed');
    $('.contacts__toggle').addClass('contacts__toggle--hidden');
    clearMarkers();
  });

  function getLocationCenter(element) {
    return JSON.parse(element.dataset.placeLocation);
  }


  function createProp(defaultLocation) {
    return {
      center: defaultLocation,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      disableDefaultUI: true,
      zoomControl: true,
      styles: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#5b0e2b"
          }]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#ffffff"
          }]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#b20e40"
          }]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#64779e"
          }]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#e086a1"
          }]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [{
            "color": "#70193a"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#ffffff"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#5b0e2b"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#023e58"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#b20e40"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#ffffff"
          }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#5b0e2b"
          }]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#283d6a"
          }]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3a4762"
          }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#0e1626"
          }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#4e6d70"
          }]
        }
      ]
    };
  }

  // Adds a marker to the map and push to the array.
  function addMarker(markerOption) {
    var svgIcon = {
      url: ICONPATH,
    };

    var marker = new google.maps.Marker({
      position: markerOption.position,
      map: map,
      title: markerOption.title,
      icon: svgIcon
    });
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }
}

function getMaxHeight(elements) {
  var maxHeight = 0;
  if (typeof (elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }
  if (!elements.length) {
    return;
  }
  Array.prototype.forEach.call(elements, function findMaxHeight(element) {
    maxHeight = (maxHeight > element.clientHeight) ? maxHeight : element.clientHeight;
  });

  return maxHeight;
}
