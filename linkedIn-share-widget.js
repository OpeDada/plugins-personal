reearth.ui.show(
  `<style>
      body {
        margin: 0;
      }
  </style>
<!-- Linkedin -->

	<div class="linkedin-share-button" data-href="https://reearth.io/" data-layout="button" data-size="large" id="linkedin-share">
		<a target="_blank" href="https://www.linkedin.com/sharing/share-offsite/?url=https://reearth.io/">
		Share
		</a>
	</div>

<script>
	// recieve message
  window.addEventListener("message", e => {
    if (e.source !== parent || !e.data || e.data.type !== "linkedin") return;
    property = e.data.property;
    if (property) {
      let link = document.getElementById("linkedin-share")
      link.setAttribute('data-href', property.url);
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
