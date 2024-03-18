reearth.ui.show(
  `<style>
      body {
        margin: 0;
      }
  </style>

  <!-- LinkedIn SDK -->
<script src="https://platform.linkedin.com/in.js" type="text/javascript">
  lang: en_US
</script>
<div id="linkedin-share">
<!-- Initialize with default URL -->
  <script type="IN/Share" data-url="https://reearth.io/" data-counter="right"></script>
</div>

<script>
  function updateLinkedInShareUrl(url) {
      // Remove any existing LinkedIn share button
      const linkedInShareDiv = document.getElementById("linkedin-share");
      linkedInShareDiv.innerHTML = '';

      // Create a new LinkedIn share button with the new URL
      const script = document.createElement("script");
      script.type = "IN/Share";
      script.setAttribute("data-url", url);
      script.setAttribute("data-counter", "right");
      linkedInShareDiv.appendChild(script);

      // Reload LinkedIn scripts to reinitialize buttons
      IN.parse();
    }
      // Receive message from Reearth
      window.addEventListener("message", e => {
        if (e.source !== parent || !e.data || e.data.type !== "linkedin") return;
        let property = e.data.property;
      if (property && property.url) {
        // Update LinkedIn share URL dynamically
            updateLinkedInShareUrl(property.url);
        }
        });
</script>

  `,
  { visible: true }
);

// post message
reearth.on("update", send);
send();

function send() {
  if (reearth.widget?.property?.default) {
    reearth.ui.postMessage({
      type: "linkedin",
      property: reearth.widget.property.default,
    });
  }
}
