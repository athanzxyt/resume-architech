import MultilineInput from "../components/MultilineInput.jsx";
import Navbar from "../components/Navbar";

export default function Apply() {
  return (
    <>
      <NavBar />
      <div className="header text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide lg:mt-40">
        Apply
      </div>
      <MultilineInput />
    </>
  );
}