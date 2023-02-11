function getPermissions() {
    // Geolocation
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
        
        // Create a div for the map
        var mapContainer = document.createElement('div');
        mapContainer.id = 'map';
        mapContainer.style.width = window.innerWidth;
        mapContainer.style.height = '500px';
        
        // Add the map container to the body
        document.body.appendChild(mapContainer);
        
        // Create a map and set the view to the user's current location
        var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
        
        // Add a tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Add a marker to the user's current location
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
      });

      // Microphone
      navigator.mediaDevices.getUserMedia({ video: false, audio: true })
  .then(function(stream) {
    console.log("Access to microphone granted");

    // Create an audio element
    var audioElement = document.createElement("audio");
    audioElement.controls = true;
    audioElement.srcObject = stream;

    // Append the audio element to the body
    document.body.appendChild(audioElement);

    // Get the audio context and the source node
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var source = audioContext.createMediaStreamSource(stream);

    // Create an analyser node
    var analyser = audioContext.createAnalyser();
    source.connect(analyser);

    // Set up the data arrays for the waveform and frequency data
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    var waveformArray = new Uint8Array(bufferLength);

    // Create a canvas to draw the waveform on
    var canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = 500;
    document.body.appendChild(canvas);

    var canvasCtx = canvas.getContext("2d");

    // Render the waveform every animation frame
    function render() {
      requestAnimationFrame(render);

      // Get the frequency data
      analyser.getByteFrequencyData(dataArray);

      // Clear the canvas
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the waveform
      canvasCtx.beginPath();
      var sliceWidth = canvas.width * 1.0 / bufferLength;
      var x = 0;
      for (var i = 0; i < bufferLength; i++) {
        var v = dataArray[i] / 128.0;
        var y = v * canvas.height / 2;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    }

    render();
  })
  .catch(function(error) {
    console.error("Error accessing microphone: " + error);
  });
  
      // Notifications
      Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
          new Notification("Ok ive gotten into your device, 👍");
          new Notification("VBUCK STEALING PROCESS 0%");
          new Notification("VBUCK STEALING PROCESS 25%");
          new Notification("VBUCK STEALING PROCESS 50%");
          new Notification("VBUCK STEALING PROCESS 75%");
          new Notification("VBUCK STEALING PROCESS COMPLETE");
          new Notification("lol all your vbucks are gone, hahahahahaha");
        }
      });

      // Camera
      navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(function(stream) {
          console.log("Access to camera granted");

          // Create a div to hold the camera feed
          var cameraDiv = document.createElement("div");
          cameraDiv.style.width = "500px";
          cameraDiv.style.height = "500px";
          
          // Create a video element and set its source to the camera stream
          var video = document.createElement("video");
          video.style.width = "100%";
          video.style.height = "100%";
          video.srcObject = stream;
          video.autoplay = true;
          
          // Append the video element to the div
          cameraDiv.appendChild(video);
          
          // Append the div to the body
          document.body.appendChild(cameraDiv);
        })
        .catch(function(error) {
          console.error("Error accessing camera: " + error);
        });
    
      // Clipboard access
      navigator.permissions.query({name: "clipboard-write"})
        .then(function(permissionStatus) {
          console.log("Clipboard access granted");
        });
    
      // IndexedDB
      var request = window.indexedDB.open("MyDatabase", 1);
      request.onsuccess = function(event) {
        console.log("Access to IndexedDB granted");
      };

      // Push Notifications
      Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
          console.log("Push Notifications granted");
        }
      });

      // Battery Status
      navigator.getBattery().then(function(battery) {
        var canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;
        document.body.appendChild(canvas);
        
        var ctx = canvas.getContext("2d");
        
        // Draw the battery icon
        ctx.fillStyle = "#333";
        ctx.fillRect(150, 200, 300, 100);
        ctx.fillRect(425, 250, 50, 50);
        
        // Draw the level of power
        var powerLevel = battery.level * 100;
        ctx.fillStyle = "#0f0";
        ctx.fillRect(200, 225, powerLevel * 1.5, 50);
        
        // Add the battery level as a text display
        ctx.fillStyle = "#fff";
        ctx.font = "36px Arial";
        ctx.textAlign = "center";
        ctx.fillText(powerLevel + "%", 375, 270);
        
        // Add an estimate of the time remaining
        var timeRemaining;
        if (battery.charging) {
          timeRemaining = "Charging...";
        } else {
          timeRemaining = Math.round(battery.dischargingTime / 60) + " min remaining";
        }
        ctx.fillStyle = "#000";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText(timeRemaining, 375, 325);
      });

      // Vibration 
      var slider = document.createElement("input");
        slider.setAttribute("type", "range");
        slider.setAttribute("min", "0");
        slider.setAttribute("max", "5000");
        slider.setAttribute("value", "0");
        slider.style.width = "500px";

        var sliderValue = document.createElement("p");
        sliderValue.innerHTML = "Vibration Duration (ms): 0";

        var button = document.createElement("button");
        button.innerHTML = "Vibrate";

        button.addEventListener("click", function() {
        navigator.vibrate(slider.value);
        });

        slider.addEventListener("input", function() {
        sliderValue.innerHTML = "Vibration Duration (ms): " + slider.value;
        });

        document.body.appendChild(sliderValue);
        document.body.appendChild(slider);
        document.body.appendChild(button);

      // Device Orientation
      window.addEventListener("deviceorientation", function(event) {
        console.log("Alpha: " + event.alpha + " Beta: " + event.beta + " Gamma: " + event.gamma);
      });

      // File System Access
      window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
        console.log("Access to file system granted");
      });

      // Fullscreen
      document.getElementById("myButton").addEventListener("click", function() {
        document.documentElement.requestFullscreen();
      });

      // Payment Request
      var supportedInstruments = [{
        supportedMethods: ["basic-card"]
      }];
      var details = {
        total: {
          label: "Total",
          amount: {
            currency: "USD",
            value: "1.00"
          }
        }
      };
      var paymentRequest = new PaymentRequest(supportedInstruments, details);
      paymentRequest.show().then(function(result) {
        console.log("Payment successful");
      });
      window.addEventListener("devicelight", function(event) {
        console.log("Ambient light level: " + event.value);
      });

      // Proximity Sensor
      if ("onuserproximity" in window) {
        window.addEventListener("userproximity", function(event) {
          console.log("Proximity: " + event.near);
        });
      }

      // Magnetometer
      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function(event) {
          console.log("Magnetometer: " + event.magneticHeading);
        });
      }

      // Accelerometer
      if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function(event) {
          console.log("Accelerometer: " + event.acceleration.x + ", " + event.acceleration.y + ", " + event.acceleration.z);
        });
      }

      // Gyroscope
      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function(event) {
          console.log("Gyroscope: " + event.gamma + ", " + event.beta + ", " + event.alpha);
        });
      }

      // Access to Contacts
      if (navigator.contacts) {
        navigator.contacts.find(["name"], function(contacts) {
          console.log("Access to contacts granted");
        });
      }
    }

    window.onload = getPermissions