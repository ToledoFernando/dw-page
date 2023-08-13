import { IResultSearch } from "./App";
import { useMusicStore } from "./store/musicStore";
import axios from "axios";

function Card(props: IResultSearch) {
  const { thumbnail, title } = props;

  const state = useMusicStore.getState();

  const searchTest = async (id: string) => {
    try {
      state.setName(props.title);
      state.setLoad(true);
      const { data } = await axios.post("/test", {
        id,
      });
      state.setName("");
      state.setLoad(false);
      state.setMusicTest([data]);
      window.open(data.url, "_blank");
    } catch (error) {
      state.setLoad(false);
      state.setName("");
    }
  };
  return (
    <div
      onClick={() => searchTest(props.videoId)}
      className="min-w-[300px] cursor-pointer w-3/12 bg-white shadow-lg rounded-sm overflow-hidden hover:-translate-y-1 transition-all duration-300"
    >
      <img src={thumbnail} />
      <p className="text-center font-semibold my-2">{title}</p>
    </div>
  );
}

export default Card;
