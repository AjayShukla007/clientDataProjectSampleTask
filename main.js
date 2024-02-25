const getLocalIP = () => {
  return new Promise((resolve, reject) => {
    const rtcPeerConnection = new RTCPeerConnection({ iceServers: [] });
    rtcPeerConnection.createDataChannel("");

    rtcPeerConnection
      .createOffer()
      .then(sessionDescription =>
        rtcPeerConnection.setLocalDescription(sessionDescription)
      )
      .catch(error => reject(error));

    rtcPeerConnection.onicecandidate = event => {
      if (event.candidate) {
        const ipRegex = /(\d+\.\d+\.\d+\.\d+)/;
        const match = ipRegex.exec(event.candidate.candidate);
        resolve(match ? match[0] : null);
      }
    };
  });
};

getLocalIP()
  .then(ipAddress => {
    document.getElementById("ip").innerHTML = ipAddress;
  })
  .catch(error => console.error("Error fetching IP address:", error));

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      document.getElementById("location").innerHTML = `Latitude: ${latitude} Longitude: ${longitude}`;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    },
    error => {
      document.getElementById("location").innerHTML = `Permision denied`;

      console.error("Error getting location:", error);
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}

// using third party Api
// which will give us accurate results but as the task mentioned we cannot use any third party Api
// async function getClientInfo() {
//   try {
//     const response = await fetch("https://ipapi.co/json/");
//     const data = await response.json();

//     const ipAddress = data.ip;
//     const location = `${data.city}, ${data.region}, ${data.country_name}`;

//     console.log(`IP Address: ${ipAddress}`);
//     console.log(`Location: ${location}`);
//   } catch (error) {
//     console.error("Error fetching client information:", error);
//   }
// }

// getClientInfo();
