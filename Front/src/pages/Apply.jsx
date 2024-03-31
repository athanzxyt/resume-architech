import MultilineInput from '../components/MultilineInput.jsx'
import NavBar from '../components/Navbar.jsx'

export default function FinalizeResume() {
    return (
        <>
        <NavBar />
        <div className="header text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide lg:mt-40">
            Apply
        </div>
        <MultilineInput />
        </>
    )
}