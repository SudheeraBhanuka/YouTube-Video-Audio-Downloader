const express = require('express');
const ytdl = require('@distube/ytdl-core');
const app = express();

//download video
app.get("/downloadVideo", async (req, res) => {
  const videoURL = req.query.url;
  const quality = req.query.quality;

  if (!ytdl.validateURL(videoURL)) return res.status(400).send("Invalid URL");

  const info = await ytdl.getInfo(videoURL);
  const format = ytdl.chooseFormat(info.formats, { quality });

  res.header("Content-Disposition", `attachment; filename="video_${quality}.mp4"`);
  ytdl(videoURL, { format }).pipe(res);
});

//download audio
app.get("/downloadAudio", async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) return res.status(400).send("Invalid URL");

  res.header("Content-Disposition", 'attachment; filename="audio.mp3"');
  ytdl(videoURL, { quality: "highestaudio" }).pipe(res);
});

//start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});