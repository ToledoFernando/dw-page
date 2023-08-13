"use client";
import {
  useRef,
  useEffect,
  useState,
  FormEventHandler,
  ChangeEventHandler,
} from "react";
import axios from "axios";
import { useMusicStore } from "./store/musicStore";
import toast, { Toaster } from "react-hot-toast";
import Card from "./Card";
import Loading from "./Loading";
import Typed from "typed.js";

export interface IResultSearch {
  videoId: string;
  url: string;
  title: string;
  img: string;
  thumbnail: string;
  seconds: number;
  views: number;
  author: string;
}

export type TypeSearch = "name" | "url";

export default function App() {
  const title = useRef<HTMLSpanElement>(null);
  const [dataSearch, setDataSearch] = useState<string>("");
  const musicStore = useMusicStore((state) => state.musics);
  const setMusicStore = useMusicStore((state) => state.setMusics);
  const State = useMusicStore((state) => state);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      State.setLoad(true);
      State.setName(dataSearch);
      const { data }: { data: IResultSearch[] } = await axios.post(`/name`, {
        name: dataSearch,
      });
      if (data.length == 0) toast.error("No se encontro musica");

      State.setLoad(false);
      State.setName("");
      setMusicStore(data);
    } catch (error) {
      State.setLoad(false);
      State.setName("");
      console.log(error);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDataSearch(e.target.value);
  };

  useEffect(() => {
    if (title.current) {
      new Typed(title.current, {
        strings: [`musica.<span class="resaltar">mp3</span>`],
        typeSpeed: 50,
        loop: false,
        showCursor: false,
      });
    }
  }, []);

  return (
    <article className="min-h-screen  max-[1000px] h-max flex flex-col items-center justify-center relative overflow-hidden">
      <Toaster />
      {State.load && <Loading />}
      <span className="absolute w-6/12 h-[32rem] bg-gradient-to-tl from-[--cl1] to-[--cl2] top-0 right-0 rounded-full blur-3xl block -z-10 opacity-25"></span>
      <span className="absolute w-2/12 h-[10rem] bg-gradient-to-tl from-[--cl1] to-[--cl2] -bottom-10 -left-28 rounded-full blur-3xl block -z-10 opacity-50"></span>
      <h1 className="mt-32 text-7xl max-[500px]:text-5xl toTop font-extrabold w-full text-center mx-auto">
        Descargar <br /> <span ref={title}></span> <br />
      </h1>
      <section className=" w-full flex flex-col items-center justify-center mx-auto mt-10">
        <div className="w-6/12 max-[800px]:rounded-lg max-[800px]:w-11/12 border-0 rounded-[2rem] overflow-hidden flex justify-between shadow-xl">
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleChange}
              value={dataSearch}
              placeholder="Nombre de la musica"
              className="w-10/12 max-[800px]:w-9/12 px-6 py-3 font-semibold text-zinc-500 border-zinc-300 text-xl outline-none"
            />
            <button className="bg-gradient-to-tl from-[--cl1] to-[--cl2] text-white rounded-r-3xl max-[800px]:w-3/12 max-[800px]:rounded-r-lg py-3 text-xl w-2/12">
              Buscar
            </button>
          </form>
        </div>
      </section>
      <section>
        {musicStore.length == 0 ? (
          <p className="text-zinc-400 font-bold w-6/12 mx-auto mt-10 text-center">
            Escribe el nombre de la musica que quiera descargar, tambien puede
            colocar la url de youtube de la musica que desea descargar. <br />
            En la segunda ventana, de a los tres puntos y en descargar
          </p>
        ) : (
          <div className="flex flex-wrap gap-10 justify-center mt-10">
            {musicStore.map((musica, index) => (
              <Card
                key={index}
                author={musica.author}
                img={musica.img}
                title={musica.title}
                url={musica.url}
                views={musica.views}
                seconds={musica.seconds}
                thumbnail={musica.thumbnail}
                videoId={musica.videoId}
              />
            ))}
          </div>
        )}
      </section>
    </article>
  );
}
