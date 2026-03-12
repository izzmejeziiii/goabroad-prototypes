import Image from "next/image";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";

const partners = [
    {
        image: "https://images.goabroad.com/image/upload/v1765827450/images2/clients/logos/MAIN/b7aQwxqKkTQs1TCbQKDnmQAVGPjGCilE6Nj4ktx5.jpg",
        href: "https://www.goabroad.com/providers/international-volunteer-hq",
        provider: "IVHQ",
    },
    {
        image: "https://images.goabroad.com/image/upload/v1695788080/images2/clients/logos/MAIN/9E9WyRUBh0iru0I5WP8zo1xULwvH0MAc1lLETFHP.png",
        href: "https://www.goabroad.com/providers/ciee",
        provider: "CIEE",
    },
    {
        image: "https://images.goabroad.com/image/upload/v1734453618/images2/clients/logos/MAIN/cK4U0IJEuaWxzIvExE6eOkuCPKU3wCbrWxayg0QK.png",
        href: "https://www.goabroad.com/providers/the-intern-group",
        provider: "The Intern Group",
    },
    {
        image: "https://images.goabroad.com/image/upload/v1538028440/images/clients/logos/MAIN/logo-goabroad-final-1535591337.png",
        href: "https://www.goabroad.com/providers/maximo-nivel",
        provider: "Maximo Nivel",
    },
    {
        image: "https://images.goabroad.com/image/upload/v1678994951/images2/clients/logos/MAIN/Tx2D2UOk498CrB0y5hGM0yeatZWDaSPcjPe9bpOB.png",
        href: "https://www.goabroad.com/providers/aifs-abroad",
        provider: "AIFS",
    },
    {
        image: "https://images.goabroad.com/image/upload/v1532762087/images/clients/logos/MAIN/download-1512589034.png",
        href: "https://www.goabroad.com/providers/international-tefl-academy",
        provider: "ITA",
    },
];

export default function FeaturedPartners() {
    return (
        <section className="w-full items-center flex flex-col justify-center mt-14 px-4 md:px-6 lg:px-8 xl:px-0">
            <div className="w-full max-w-7xl gap-12 flex flex-col items-center">
                <h2 className="text-slate-800 font-bold text-[28px] text-center">
                    Featured Partners
                </h2>
                <div className="grid w-full grid-cols-2 lg:grid-cols-3 gap-8">
                    {partners.map((partner, index) => (
                        <Link
                            key={index}
                            href={partner.href}
                            className="p-6 border border-gray-200 rounded-lg flex items-center hover:scale-105 hover:shadow-md hover:shadow-primary-50 transition-all duration-300 justify-center flex-col gap-2 group"
                        >
                            <Image
                                src={partner.image}
                                alt={partner.provider}
                                width={80}
                                height={80}
                                className="grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                            <p className="font-bold">{partner.provider}</p>
                        </Link>
                    ))}
                </div>
                <Link
                    href="https://www.goabroad.com/providers"
                    className="rounded-md text-white py-3 px-6 bg-cobalt-500 hover:bg-cobalt-700 transition-colors duration-300 font-semibold text-sm hover:text-white group flex items-center gap-1.5 w-max"
                >
                    Find Out More About Who We Work With
                    <HiArrowSmRight
                        size={16}
                        className="transition-all duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </section>
    );
}
