import Link from "next/link";

export default function Custom404() {
  return (
    <div className="grid h-screen px-4 place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl animate-text bg-gradient-to-r from-primarycolor to-secondrycolor bg-clip-text text-transparent">
          404
        </h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">You are lost!</p>

        <Link
          href="/"
          className="transition-colors inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-primarycolor rounded hover:bg-secondrycolor"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
