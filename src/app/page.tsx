import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white">
      <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
      <div className="w-[200px] h-[400px] p-12 m-12 bg-[#4E148C] border-4 border-[#2C0735]">Hello There!</div>
      <div className="w-[200px] h-[400px] p-12 m-12 bg-[#2C0735] border-4 border-[#4E148C]">General Kenobi! You are a bold one!</div>
      <div className="w-[200px] h-[400px] p-12 m-12 bg-[#3498db]"></div>
      <div className="w-[200px] h-[400px] p-12 m-12 bg-[#3498db]"></div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
