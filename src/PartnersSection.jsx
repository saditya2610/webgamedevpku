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
        <section className="mt-20 md:mt-32">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <img
                        src={reieclipseLogo}
                        alt="Rei Eclipse"
                        className="h-20 w-auto animate-bounce"
                    />
                    <h3
                        className="text-4xl md:text-5xl font-extrabold uppercase pixel-text"
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
                        className="h-20 w-auto animate-bounce"
                    />
                </div>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                    Terima kasih kepada komunitas dan studio yang telah mendukung GAMEDEVPKU.
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center mb-8">
                    <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={borgarLogo}
                            alt="Borgar"
                            className="h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={cardPortalLogo}
                            alt="Card Portal"
                            className="h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={fabicommLogo}
                            alt="Fabicomm"
                            className="h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={redblackLogo}
                            alt="Red Black"
                            className="h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-items-center">
                    <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={solutronicLogo}
                            alt="Solutronic"
                            className="h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={umamusumeLogo}
                            alt="Umamusume PKU"
                            className="h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                    <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <img
                            src={umamusumeSumateraLogo}
                            alt="Umamusume Sumatera"
                            className="h-16 w-auto object-contain mx-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PartnersSection
