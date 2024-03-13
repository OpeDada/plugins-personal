const html = `
<style>
  body {
    margin: 0
  }
</stye>

<!-- LinkedIn -->
<a class="linkedIn-share-button"
  href="https://www.linkedin.com/share"
    data-size="large"
    data-text="Default text"
    data-url="https://reearth.io/"
    data-hashtags="reearth"
    data-lang="en"
    data-dnt="true"
    id="linkedIn-button">
    Share
    </a>
<script>
     // receive message
    window.addEventListener("message", e => {
    if (e.source !== parent || !e.data || e.data.type !== "linkedIn") return;
    property = e.data.property;
    if (property.url) {
      let link = document.getElementById("linkedIn-button")
      link.setAttribute('data-url', property.url);
      link.setAttribute('data-text', property.text);
    }
  });
</script>
  `;
reearth.ui.show(html);

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
