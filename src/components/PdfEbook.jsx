import { useEffect, useMemo, useRef, useState } from 'react'

function clampNumber(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

function PdfEbook({ src, title = 'Ebook', initialPage = 1 }) {
    const containerRef = useRef(null)
    const [page, setPage] = useState(initialPage)
    const [zoom, setZoom] = useState(120)

    useEffect(() => {
        setPage(initialPage)
    }, [initialPage])

    const pdfUrl = useMemo(() => {
        if (!src) return ''
        const safeZoom = clampNumber(zoom, 50, 300)
        const safePage = Math.max(1, page)
        return `${src}#page=${safePage}&zoom=${safeZoom}`
    }, [src, page, zoom])

    const goPrev = () => setPage((p) => Math.max(1, p - 1))
    const goNext = () => setPage((p) => p + 1)

    const zoomOut = () => setZoom((z) => clampNumber(z - 10, 50, 300))
    const zoomIn = () => setZoom((z) => clampNumber(z + 10, 50, 300))

    const toggleFullscreen = async () => {
        const el = containerRef.current
        if (!el) return

        if (document.fullscreenElement) {
            await document.exitFullscreen()
            return
        }

        if (el.requestFullscreen) {
            await el.requestFullscreen()
        }
    }

    return (
        <div ref={containerRef} className="w-full bg-white rounded-2xl border-4 border-gray-300 shadow-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b-2 border-gray-200">
                <div className="font-extrabold uppercase tracking-wider text-gray-800">
                    {title}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={goPrev}
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 text-sm font-bold uppercase hover:bg-gray-50"
                    >
                        Prev
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase text-gray-600">Page</span>
                        <input
                            value={page}
                            onChange={(e) => {
                                const next = Number.parseInt(e.target.value, 10)
                                if (Number.isNaN(next)) return
                                setPage(Math.max(1, next))
                            }}
                            className="w-20 px-2 py-2 rounded-xl border-2 border-gray-300 text-sm font-bold"
                            inputMode="numeric"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={goNext}
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 text-sm font-bold uppercase hover:bg-gray-50"
                    >
                        Next
                    </button>

                    <div className="w-px h-7 bg-gray-300 mx-1" />

                    <button
                        type="button"
                        onClick={zoomOut}
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 text-sm font-bold uppercase hover:bg-gray-50"
                    >
                        -
                    </button>
                    <div className="text-sm font-bold text-gray-700 min-w-[64px] text-center">{zoom}%</div>
                    <button
                        type="button"
                        onClick={zoomIn}
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 text-sm font-bold uppercase hover:bg-gray-50"
                    >
                        +
                    </button>

                    <div className="w-px h-7 bg-gray-300 mx-1" />

                    <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 text-sm font-bold uppercase hover:bg-gray-50"
                    >
                        Fullscreen
                    </button>

                    <a
                        href={src}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 text-sm font-bold uppercase hover:bg-gray-50"
                    >
                        Open
                    </a>
                </div>
            </div>

            <div className="w-full bg-gray-100">
                <iframe
                    title={title}
                    src={pdfUrl}
                    className="w-full"
                    style={{ height: '75vh' }}
                />
            </div>
        </div>
    )
}

export default PdfEbook
