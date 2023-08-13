import { useMusicStore } from "./store/musicStore";

function Loading() {
  const state = useMusicStore((state) => state.name);
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-black bg-opacity-40 flex items-center justify-center">
      <p className="text-white font-bold text-5xl w-full text-center">
        Obteniendo datos de {state}...
      </p>
    </div>
  );
}

export default Loading;
