import borgarLogo from '../assets/borgar.png'
import cardPortalLogo from '../assets/card_portal.png'
import fabicommLogo from '../assets/Logo Fabicomm.png'
import redblackLogo from '../assets/Red Black Full.png'
import reieclipseLogo from '../assets/reieclipse.png'
import solutronicLogo from '../assets/solutroniclogo.png'
import umamusumeLogo from '../assets/umamusumepku.png'
import umamusumeSumateraLogo from '../assets/umamusumesumatera.png'

function PartnersSection() {
    return (
        <section className="mt-16 md:mt-32 px-4">
            <div className="text-center mb-8 sm:mb-12">
                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <img
                        src={reieclipseLogo}
                        alt="Rei Eclipse"
                        className="h-12 sm:h-16 md:h-20 w-auto animate-bounce"
                    />
                    <h3
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase pixel-text"
                        style={{
                            color: 'var(--color-deep-blue)',
                            textShadow: '2px 2px 0 var(--color-fuchsia)',
                        }}
                    >
                        Komunitas & Studio Terlibat
                    </h3>
                    <img
                        src={reieclipseLogo}
                        alt="Rei Eclipse"
                        className="h-12 sm:h-16 md:h-20 w-auto animate-bounce"
                    />
                </div>
                <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto px-4">
                    Terima kasih kepada komunitas dan studio yang telah mendukung GAMEDEVPKU.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-items-center mb-6 sm:mb-8">
                    <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={borgarLogo}
                            alt="Borgar"
                            className="h-10 sm:h-12 md:h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={cardPortalLogo}
                            alt="Card Portal"
                            className="h-10 sm:h-12 md:h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={fabicommLogo}
                            alt="Fabicomm"
                            className="h-10 sm:h-12 md:h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={redblackLogo}
                            alt="Red Black"
                            className="h-10 sm:h-12 md:h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-center justify-items-center">
                    <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={solutronicLogo}
                            alt="Solutronic"
                            className="h-10 sm:h-12 md:h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={umamusumeLogo}
                            alt="Umamusume PKU"
                            className="h-10 sm:h-12 md:h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-3 sm:p-4 md:p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={umamusumeSumateraLogo}
                            alt="Umamusume Sumatera"
                            className="h-10 sm:h-12 md:h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PartnersSection
