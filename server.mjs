import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import PQueue from 'p-queue';

const app = express();
const port = process.env.PORT || 5000;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }
});

const ffmpegInstance = createFFmpeg({ log: true });
let ffmpegLoadingPromise = ffmpegInstance.load();

async function getFFmpeg() {
  if (ffmpegLoadingPromise) {
    await ffmpegLoadingPromise;
    ffmpegLoadingPromise = undefined;
  }

  return ffmpegInstance;
}

const requestQueue = new PQueue({ concurrency: 1 });

app.use(cors());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`[info] ffmpeg-api listening at http://localhost:${port}`));

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// TODO remove
// app.use('/request_type', (req, res, next) => {
//   console.log('Request type: ', req.method);
//   res.send({ express: `Successful ${req.method}`});
//   next();
// });

// GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });


// POST route
app.post('/thumbnail', upload.single('video'), async (req, res) => {
  try {
    const videoData = req.file.buffer;

    const ffmpeg = await getFFmpeg();

    const inputFileName = `input-video`;
    const outputFileName = `thumbnail.gif`;
    let outputData = null;

    await requestQueue.add(async () => {
      ffmpeg.FS('writeFile', inputFileName, videoData);

      await ffmpeg.run(
        '-i', inputFileName,
        '-filter_complex', "[0:v] fps=12,scale=w=480:h=-1,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1",
        '-f', 'gif',
        outputFileName
      );

      outputData = ffmpeg.FS('readFile', outputFileName);
      ffmpeg.FS('unlink', inputFileName);
      ffmpeg.FS('unlink', outputFileName);
    });

    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Disposition': `attachment;filename=${outputFileName}`,
      'Content-Length': outputData.length
    });
    res.end(Buffer.from(outputData, 'binary'));
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});