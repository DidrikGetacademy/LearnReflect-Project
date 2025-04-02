import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function YouTubeTranscriptApp() {
  const [url, setUrl] = useState("");
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTranscript = async () => {
    setLoading(true);
    try {
      const videoId = url.split("v=")[1]?.split("&")[0];
      if (!videoId) throw new Error("Invalid URL");
      
      const response = await fetch("https://yourdomain.com/backend/get_transcript.php?video_id=" + videoId);

      const data = await response.json();
      setTranscript(data.transcript || "No transcript available");
    } catch (error) {
      setTranscript("Error fetching transcript");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    alert("Copied to clipboard!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">YouTube Transcript Fetcher</h1>
      <Input 
        placeholder="Enter YouTube link..." 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
      />
      <Button onClick={fetchTranscript} disabled={loading}>
        {loading ? "Loading..." : "Get Transcript"}
      </Button>
      {transcript && (
        <Card>
          <CardContent className="p-4 space-y-2">
            <pre className="whitespace-pre-wrap">{transcript}</pre>
            <Button onClick={copyToClipboard}>Copy</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
