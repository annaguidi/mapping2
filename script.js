// this function is triggered in the html
function init() {
    //Autocomplete restrictions
    var options = {
      componentRestrictions: {'country': ['US']},
      types:['address']
    } 
    
    // autocomplete function by google, pass in div and restriction parameters
    // autocomplete will be a google place object with google functions and attributes
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchbox'), options);
    
    //Add event to searchbox, activates on place changed (must be broad)
    autocomplete.addListener('place_changed', function(){
    //  these are all google functions
      var place = autocomplete.getPlace();
      
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      
      //Pass the new location's lat, lng to display streetview function
      show_streetview(lat, lng);
      
      //Pass street name in country 1 to country 2
      var current_street = place.address_components[0].long_name;
      console.log(current_street);
      same_street(current_street);
    }) 
  }
  
  //Display first country's streetview (Left Panel)
  function show_streetview(lat, lng) {
    var itp = {lat: lat, lng: lng};
    var sv_options = {
      position: itp,
      pov: {
            heading: 230,
            pitch: 10
      }
    }
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('sv1'), sv_options);
  }
  
  //Display second country's streetview (Right Panel)
  function same_street(current_street) {
    var geocoder = new google.maps.Geocoder();
    
    // just like var options
    var request = {
        'address': current_street,
        'componentRestrictions': {'country': 'HK'}
    }
    
    // before we use google autocomplete to get lat long and other info, here we use geocoder, maybe bc it's better at handling events like not found?
    geocoder.geocode(request, function(results, status){
    if (status === 'OK') {
      console.log("results", results)
      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      
      var sv_options = {
      position: {lat: lat, lng: lng}
      }
      new google.maps.StreetViewPanorama(document.getElementById('sv2'), sv_options);
  
      } else {
        $('#sv2').empty();
        alert("No same streets found, please try a different entry.");
      }
    })
  }