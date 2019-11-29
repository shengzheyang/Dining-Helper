const axios = require('axios');

function getDis(startPoint, endPoint) {
    axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
        params: {
            origins : startPoint,
            destinations: endPoint,
            key: 'AIzaSyBTBQq3meN2QqOruFQ--ueYgHgoIWxZqbY',

        }
    })
}