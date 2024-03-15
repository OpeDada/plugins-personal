reearth.ui.show(
  `<style>
      body {
        margin: 0
      }
    </style>

    <!-- LinkedIn -->

    <a class="linkedin-share-button"
      target="_blank"
      href="https://www.linkedin.com/sharing/share-offsite/?url=https://reearth.io/"
      data-size="large"
      data-text="Default text"
      data-url="https://reearth.io/"
      data-lang="en"
      data-dnt="true"
      id="linkedin-button">
      Share
    </a>

    <script>
          // receive message
          window.addEventListener("message", e => {
          if (e.source !== parent || !e.data || e.data.type !== "linkedin") return;
          property = e.data.property;
          if (property.url) {
            let link = document.getElementById("linkedin-button")
            link.setAttribute('data-url', property.url);
            link.setAttribute('data-text', property.text);
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
