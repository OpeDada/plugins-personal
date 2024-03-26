const html = `
  <style>
    html, body {
      margin: 0;
      width: 100%;
    }
    #wrapper {
      padding: 18px;
      border: 2px solid transparent;
      background-image: linear-gradient(#011, #011),
      linear-gradient(120deg, #f09 0%, #0ff 50%, #9f0 100%);
      background-origin: border-box;
      background-clip: padding-box, border-box;
      border-radius: 16px;
      background-size: 200% 100%;
    }
    input {
      width: 97%;
      border-radius: 6px;
      margin-bottom: 10px;
      padding: 4px;
      border: 1px solid #E91E63
    }
    #fly {
      cursor: pointer;
      border-radius: 6px;
      padding: 2px 12px;
      border: 1px solid #E91E63
    }
  </style>

  <div id="wrapper">
    <input type="text" id="address" placeholder="Enter address/name of place">
    <button id="fly">Locate</button>
  </div>

  <script>
    // Function to get input address
    const getAddress = () => ({
      address: document.getElementById("address").value.trim()
    });

    // Event listener for "Fly to" button
    document.getElementById("fly").addEventListener("click", async () => {
      const { address } = getAddress();
      if (address) {
        try {
          const response = await fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address));
          const data = await response.json();
          if (data && data.length > 0) {
            const location = data[0];
            parent.postMessage({ fly: { lat: parseFloat(location.lat), lng: parseFloat(location.lon), height: 500 } }, "*");
          } else {
            alert("Location not found");
          }
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      } else {
        alert("Please enter an address");
      }
    });
  </script>
`;

// Display the UI
reearth.ui.show(html);

// Listen for messages from Re:Earth
reearth.on("message", (msg) => {
  if (msg.fly) {
    // Perform camera flyTo
    reearth.camera.flyTo(
      {
        lat: msg.fly.lat,
        lng: msg.fly.lng,
        height: msg.fly.height,
      },
      {
        duration: 2, // Default duration
      }
    );
  }
});
