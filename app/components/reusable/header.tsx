import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
    return (
        <nav className="h-21 w-full flex px-4 lg:px-0 items-center justify-center bg-white shadow-lg z-10">
            <div className="w-full max-w-7xl flex items-center justify-between">
                <Link href="/">
                    <img
                        className="w-[60px] object-cover"
                        src="https://res.cloudinary.com/gacom/image/upload/v1701404178/images2/goabroad-logo.webp"
                        alt=""
                    />
                </Link>
                <div className="block lg:hidden">
                    <GiHamburgerMenu className="text-neutral-700 text-xl" />
                </div>
                <nav className="hidden lg:flex gap-6 font-bold">
                    <a href="">Choose Experience</a>
                    <a href="">Online Programs</a>
                    <a href="">How it Works</a>
                    <a href="">Help Me</a>
                    <a href="">Sign In</a>
                </nav>
            </div>
        </nav>
    );
}
