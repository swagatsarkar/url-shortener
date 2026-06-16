import { useState } from "react";

function App() {
 const [url, setUrl] = useState("");
 const [shortUrl, setShortUrl] = useState("");

 const shortenUrl = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/shorten",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url: url
        })
      }
    );

    const data = await response.json();

    setShortUrl(
      `http://localhost:5000/${data.shortCode}`
    );
  } catch (error) {
    console.error(error);
  }
 };

 return (
  <div style={{ padding: "40px" }}>
    <h1>URL Shortener</h1>

    <input
      type="text"
      placeholder="Enter URL"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
    />

    <button onClick={shortenUrl}>
      Shorten
    </button>

    <br />
    <br />

    {shortUrl && (
      <div>
        <strong>Short URL:</strong>
        <p>{shortUrl}</p>
      </div>
    )}
  </div>
 );
}

export default App;
