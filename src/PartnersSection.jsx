import borgarLogo from '../assets/borgar.png'
import fabicommLogo from '../assets/Logo Fabicomm.png'
import redblackLogo from '../assets/Red Black Full.png'
import solutronicLogo from '../assets/solutroniclogo.png'
import umamusumeLogo from '../assets/umamusumepku.png'

function PartnersSection() {
    return (
        <section className="mt-20 md:mt-32">
            <div className="text-center mb-12">
                <h3
                    className="text-4xl md:text-5xl font-extrabold mb-6 uppercase pixel-text"
                    style={{
                        color: 'var(--color-deep-blue)',
                        textShadow: '2px 2px 0 var(--color-fuchsia)',
                    }}
                >
                    Komunitas & Studio Terlibat
                </h3>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                    Terima kasih kepada komunitas dan studio yang telah mendukung GAMEDEVPKU.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
                <div className="p-4 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                        src={borgarLogo}
                        alt="Borgar"
                        className="h-16 w-auto object-contain mx-auto"
                    />
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                        src={fabicommLogo}
                        alt="Fabicomm"
                        className="h-16 w-auto object-contain mx-auto"
                    />
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                        src={redblackLogo}
                        alt="Red Black"
                        className="h-16 w-auto object-contain mx-auto"
                    />
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                        src={solutronicLogo}
                        alt="Solutronic"
                        className="h-16 w-auto object-contain mx-auto"
                    />
                </div>
                <div className="p-4 rounded-xl bg-white border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                        src={umamusumeLogo}
                        alt="Umamusume PKU"
                        className="h-16 w-auto object-contain mx-auto"
                    />
                </div>
            </div>
        </section>
    )
}

export default PartnersSection
