document.addEventListener('DOMContentLoaded', function () {
  svg4everybody();

  /*==================================
  =            Toggle nav            =
  ==================================*/

  var siteNav = document.querySelector('.site-nav');
  var primaryNav = document.querySelector('.primary-nav');
  var secondaryNav = document.querySelector('.secondary-nav');
  var siteCover = document.querySelector('.site-cover');
  var siteCoverClose = siteCover.querySelector('.site-cover__close');
  var dataNavValue = '';

  function toggleSiteCover() {
    document.body.classList.toggle('no-scroll');
    // document.body.style.overflow = 'hidden';
    siteCover.classList.toggle('site-cover--opened');
  }

  $(siteNav).on('click', 'a, .site-nav__toggle', function (event) {
    event.preventDefault();
    toggleSiteCover();
  });

  $(siteCoverClose).on('click', function(event) {
    event.preventDefault();
    toggleSiteCover();
  });

  $(siteNav).on('click', '[data-nav]', function (event) {
    event.preventDefault();
    dataNavValue = this.dataset.nav;

    primaryNavUpdate();
    secondaryNavUpdate();
  });

  $(primaryNav).on('click', '[data-nav]', function (event) {
    event.preventDefault();
    dataNavValue = this.dataset.nav;

    primaryNavUpdate();
    secondaryNavUpdate();
  });

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
    $(welcomeSlider).on('init', function (event, instanceSlider) {
      console.log(instanceSlider)
    });

    $(welcomeSlider).slick({
      accessibility: false,
      // autoplay: true,
      appendArrows: '.welcome-slider__arrows',
      // useTransform: false,
      // useCSS: false,
      fade: true,
      speed: 1000,
      responsive: [{
        breakpoint: 770,
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
  var locationMap = document.querySelector('#location-map');

  if (locationMap) {
    loadMapScript();
  }
});



// Загрузка карты
function loadMapScript() {
  var script = document.createElement("script");
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBYB-6kDqq0irkf8ztbpFPR2ouM6c5seAg&callback=initializeMap";

  document.head.appendChild(script);
}

// Инициализация карты
function initializeMap() {
  var locationOffice = {
    lat: 53.266494,
    lng: 34.355551
  };

  var centerMap = {
    lat: 53.266494,
    lng: 34.358716
  };

  centerMap = (window.matchMedia("(min-width: 768px)").matches) ? centerMap : locationOffice;

  function createProp(defaultLocation) {
    return {
      center: centerMap,
      zoom: 17,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
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
  }

  var mapProp = createProp(locationOffice);
  var map = new google.maps.Map(document.getElementById("location-map"), mapProp);
  var ICONPATH = 'http://marstroi.ru/wp-content/themes/marstroi/images/location-pin.svg';
  // var ICONPATH = 'images/location-pin.svg';
  var marker = new google.maps.Marker({
    position: locationOffice,
    map: map,
    title: '«MARSTROI» — ул. Дуки, д. 69, оф. 407',
    icon: {
      url: ICONPATH,
      scale: 1
    }
  });
}
