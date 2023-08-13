import { create } from "zustand";

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

interface IMusicStore {
  musics: IResultSearch[];
  music: IResultSearch[];
  name: string;
  load: boolean;
  setName: (name: string) => void;
  setLoad: (load: boolean) => void;
  setMusics: (musics: IResultSearch[]) => void;
  setMusicTest: (musica: IResultSearch[]) => void;
}

export const useMusicStore = create<IMusicStore>((set) => ({
  musics: [],
  music: [],
  name: "",
  load: false,
  setMusics: (musics) => set(() => ({ musics })),
  setMusicTest: (musica) => set(() => ({ music: musica })),
  setName: (name) => set({ name }),
  setLoad: (b) => set({ load: b }),
}));
