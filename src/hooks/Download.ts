export const downloadImage = (imageUrl) => {
  const fileExtension = imageUrl.split(".").pop().toLowerCase();
  console.log("🚀 ~ downloadImage ~ fileExtension:", fileExtension);
  const proxyUrl = "https://corsproxy.io/?";
  const fullUrl = proxyUrl + imageUrl;

  const image = new Image();
  image.crossOrigin = "Anonymous";

  image.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const dataUrl = canvas.toDataURL("image/jpeg");

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `downloaded-image.${fileExtension}`;
    a.click();
  };

  image.src = fullUrl;
};

export const downloadPDF = async (pdfUrl) => {
  const proxyUrl = "https://corsproxy.io/?";
  try {
    const response = await fetch(proxyUrl + pdfUrl);
    const blob = await response.blob(); // Convert response to a blob

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "downloaded.pdf"); // Set the filename

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download by simulating a click
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url); // Release the blob URL
  } catch (error) {
    console.error("Error downloading the PDF:", error);
  }
};
