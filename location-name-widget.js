const html = `
  <style>
    html, body {
      margin: 0;
      width: 350px;
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
      width: 95%;
      border-radius: 6px;
      border: 1px solid #E91E63
      margin-bottom: 10px;
      padding: 4px 0;
    }
    .suggestions {
      overflow-y: auto; /* Enable vertical scrolling when content exceeds the height */
      color: #FFFFFF;
      cursor: pointer;
      padding: 4px;
    }
    .suggestion-item {
      padding:10px;
      cursor: pointer;
    }
    .suggestion-item:hover {
      border-radius: 6px;
      background-color: #01494B
    }
    #fly {
      cursor: pointer;
      border-radius: 6px;
      padding: 2px 12px;
      margin-top: 8px;
      border: 1px solid #E91E63
    }
  </style>

  <div id="wrapper">
    <input type="text" id="address" autocomplete="off" placeholder="Enter address/name of place">
    <div class="suggestions" id="suggestions"></div>
    <button id="fly">Locate</button>
  </div>

  <script>

    // implement a debounce fnc for the input search queries to create a delay and wait for 300ms as user is typing
      function debounce(func, delay) {
      let debounceTimer;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    }

     // Function to get input address
    const getAddress = () => ({
      address: document.getElementById("address").value.trim()
    });

    // Event listener for input changes and fnc responsible for handling the input event and making async requests to fetch location data.
    document.getElementById("address").addEventListener("input", debounce(async () => {
      const { address } = getAddress();

      if (address) {
        try {
          // fetch location data based on user input
          const response = await fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address))
          const data = await response.json();

          //get the suggestions div and clear previous suggestions
          const suggestions = document.getElementById("suggestions");
          suggestions.innerHTML = "";

          if (data && data.length > 0){
            data.slice(0, 5).forEach(location => {
              const item = document.createElement('div');
              item.classList.add('suggestion-item');
              item.textContent = location.display_name;
              item.addEventListener('click', () => {
                document.getElementById("address").value = location.display_name;
                suggestions.innerHTML = '';
              });
              suggestions.appendChild(item);
            });
            suggestions.style.display = 'block'; // Show suggestions if there is a location
          } else {
            suggestions.style.display = 'none'; // Hide suggestions if there is no location
          }
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      } else {
        suggestions.style.display = 'none'; // Hide suggestions if input is empty
      }
    }, 300))

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
