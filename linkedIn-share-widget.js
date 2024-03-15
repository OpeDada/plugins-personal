reearth.ui.show(
  `
<style>
  body {
    margin: 0
  }
</style>

<!-- LinkedIn -->
<div class="linkedIn-share-button" data-url="https://reearth.io/" data-layout="button" data-size="large" id="linkedIn-share">
    <a
      target="_blank"
      href="https://www.linkedin.com/share"
      data-size="large"
      data-text="Default text"
      data-hashtags="reearth"
      data-lang="en"
      data-dnt="true"
      Share
      </a>
  </div>

<script>
     // receive message
    window.addEventListener("message", e => {
    if (e.source !== parent || !e.data || e.data.type !== "linkedIn") return;
    property = e.data.property;
    if (property.url) {
      let link = document.getElementById("linkedIn-share")
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
      type: "linkedIn",
      property: reearth.widget.property.default,
    });
  }
}
