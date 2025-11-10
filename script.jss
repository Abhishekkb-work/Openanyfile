const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

dropArea.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", handleFile);
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.background = "#eef2ff";
});
dropArea.addEventListener("dragleave", () => {
  dropArea.style.background = "#f8faff";
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.background = "#f8faff";
  handleFile({ target: { files: e.dataTransfer.files } });
});

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  preview.innerHTML = "";
  const fileType = file.type;
  const fileURL = URL.createObjectURL(file);

  if (fileType.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = fileURL;
    preview.appendChild(img);
  } 
  else if (fileType === "application/pdf") {
    const iframe = document.createElement("iframe");
    iframe.src = fileURL;
    iframe.width = "100%";
    iframe.height = "500px";
    preview.appendChild(iframe);
  } 
  else if (fileType.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = fileURL;
    video.controls = true;
    preview.appendChild(video);
  } 
  else if (fileType.startsWith("audio/")) {
    const audio = document.createElement("audio");
    audio.src = fileURL;
    audio.controls = true;
    preview.appendChild(audio);
  } 
  else if (fileType.startsWith("text/") || file.name.endsWith(".json")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const pre = document.createElement("pre");
      pre.textContent = e.target.result;
      preview.appendChild(pre);
    };
    reader.readAsText(file);
  } 
  else if (file.name.match(/\.(docx|pptx|xlsx)$/i)) {
    const encodedURL = encodeURIComponent(fileURL);
    const officeViewer = document.createElement("iframe");
    officeViewer.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodedURL}`;
    officeViewer.width = "100%";
    officeViewer.height = "600px";
    preview.appendChild(officeViewer);
  } 
  else {
    const info = document.createElement("p");
    info.textContent = "Preview not available. You can download the file below:";
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = file.name;
    link.textContent = "⬇️ Download " + file.name;
    preview.appendChild(info);
    preview.appendChild(link);
  }
}
