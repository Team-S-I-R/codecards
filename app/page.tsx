import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-screen bg-slate-900 text-green-300">
     
      <div className="w-full h-full overflow-y-scroll">

      <section className="w-full h-full">
        <div className="w-full h-full flex sm:flex-row flex-col place-content-center place-items-center">
          
          <div className="sm:w-1/2 sm:h-full w-full h-1/2 flex place-content-center place-items-center">
            <h1>Image will go here</h1>
          </div>

          <div className="sm:w-1/2 sm:h-full w-full h-1/2 flex flex-col place-content-center place-items-center">
            <h1>CodeCards</h1>
            <h1>Landing Page text</h1>
          </div>

        </div>
      </section>

      {/* <section className="w-full h-full">
        <div className="w-full h-full flex sm:flex-row flex-col place-content-center place-items-center">
          
          <div className="sm:w-1/2 sm:h-full w-full h-1/2 flex place-content-center place-items-center">
            <h1>Image will go here</h1>
          </div>

          <div className="sm:w-1/2 sm:h-full w-full h-1/2 flex flex-col place-content-center place-items-center">
            <h1>CodeCards</h1>
            <h1>Landing Page text</h1>
          </div>

        </div>
      </section> */}

      </div>

    </main>
  );
}
