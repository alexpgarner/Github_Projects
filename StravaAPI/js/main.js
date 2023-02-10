const auth_link = 'https://www.strava.com/oauth/token'
var map = L.map('map').setView([47.399627, -122.070913], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
function getActivites(access_token,pageNum='1'){
  //console.log(access_token)
  const url = `https://www.strava.com/api/v3/activities?access_token=${access_token}&per_page=200&page=${pageNum}`
  //console.log(url)

  return fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        // var map = L.map('map').setView([47.399627, -122.070913], 12);
        // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     maxZoom: 19,
        //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        //   }).addTo(map);

          data.forEach(element=>{
            let polyline = L.Polyline.fromEncoded(element.map.summary_polyline);

            // prints an array of 3 LatLng objects.
            let coordinates = polyline.getLatLngs();
            //console.log(coordinates);
            //console.log(element.map.summary_polyline)
            L.polyline(
              coordinates,
              {
                color: 'red',
                weight: 5,
                opacity: 7,
                lineJoin: 'round'
              }
            ).addTo(map)
          })
          return data;
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function reAuthorize(){
  fetch(auth_link, {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      //bad to have client info in JS!!! We just trying to get app working
      client_id: '101662',
      client_secret: '209a2403d1d6334bfaa4cb0c259bf96503a65735',
      refresh_token:'970e8bba0038b738d8aaa2bc1756a70a305ce360',
      grant_type: 'refresh_token'


    })
  })
    .then((res) => res.json())
    .then(async (json) => {
      //console.log(json.access_token);
      let pageNum=1;
      let pageEmpty = false;
      let data;
      while(!pageEmpty){
         data =await getActivites(json.access_token,pageNum);
        //console.log(data)
        //console.log(data['[[PromiseResult]]'])
        console.log(pageNum)
        console.log(data.length)
        console.log(pageEmpty)
        if(data.length==0){
          pageEmpty = true;
        }else{
          pageNum++;
        }
      }
    })
}
reAuthorize();

