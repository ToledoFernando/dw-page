import yt_search from "yt-search";
import yt_core, { videoFormat } from "ytdl-core";
import { Request, Response } from "express";

interface IResultSearch {
  videoId: string;
  url: string;
  title: string;
  img: string;
  thumbnail: string;
  seconds: number;
  views: number;
  author: string;
}

export async function searchNameMusic(req: Request, res: Response) {
  try {
    const { name } = req.body;
    const result = await yt_search(name);

    const musics: IResultSearch[] = [];

    for (let a = 0; a < result.videos.length; a++) {
      musics.push({
        videoId: result.videos[a].videoId,
        url: result.videos[a].url,
        title: result.videos[a].title,
        img: result.videos[a].image,
        thumbnail: result.videos[a].thumbnail,
        seconds: result.videos[a].seconds,
        views: result.videos[a].views,
        author: result.videos[a].author.name,
      });
    }
    return res.json(musics);
  } catch (error) {
    res.status(400);
  }
}

export async function searchTestMusic(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const url = `https://www.youtube.com/watch?v=${id}`;

    const musicInfor = await yt_core.getInfo(url);

    let musics: videoFormat[] = [];

    for (let a = 0; a < musicInfor.formats.length; a++) {
      if (
        musicInfor.formats[a].container === "webm" &&
        musicInfor.formats[a].hasVideo === false &&
        musicInfor.formats[a].hasAudio === true
      ) {
        musics.push(musicInfor.formats[a]);
      }
    }

    return res.json(musics[0]);
  } catch (error) {
    return res.status(400);
  }
}

export async function searchURLMusic(req: Request, res: Response) {
  try {
    const { url } = req.body;
    const result = await yt_search(url);

    const musics: IResultSearch[] = [];

    for (let a = 0; a < result.videos.length; a++) {
      musics.push({
        videoId: result.videos[a].videoId,
        url: result.videos[a].url,
        title: result.videos[a].title,
        img: result.videos[a].image,
        thumbnail: result.videos[a].thumbnail,
        seconds: result.videos[a].seconds,
        views: result.videos[a].views,
        author: result.videos[a].author.name,
      });
    }
    return res.json(musics);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
}
