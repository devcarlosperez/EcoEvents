import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[linear-gradient(175deg,#C0DDC2_0.09%,#E8F5E9_50%,#C0DDC2_99.91%)]">
      <h1 className="font-poppins font-semibold text-[6rem] text-neutral-01 leading-none">
        404
      </h1>
      <p className="font-roboto text-xl text-neutral-01 mt-4 mb-8">
        Page not found.
      </p>
      <Link
        to="/about"
        className="font-poppins font-medium text-lg text-white bg-[#2E7D32] px-6 py-2 rounded-[13px] hover:bg-[#1b5e20] transition-colors"
      >
        Go back to home
      </Link>
    </div>
  );
}
