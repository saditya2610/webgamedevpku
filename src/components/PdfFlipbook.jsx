import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = workerSrc

function clampNumber(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

function PdfFlipbook({ src, title = 'Ebook', initialPage = 1 }) {
    const bookRef = useRef(null)
    const pdfRef = useRef(null)
    const renderingRef = useRef(new Map())

    const [numPages, setNumPages] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [zoom, setZoom] = useState(1.2)
    const [currentPage, setCurrentPage] = useState(initialPage)
    const [pageImages, setPageImages] = useState(() => new Map())

    useEffect(() => {
        setCurrentPage(initialPage)
    }, [initialPage])

    useEffect(() => {
        let cancelled = false

        async function loadPdf() {
            if (!src) return
            setIsLoading(true)
            setError('')
            setNumPages(0)
            setPageImages(new Map())
            pdfRef.current = null
            renderingRef.current = new Map()

            try {
                const task = getDocument(src)
                const pdf = await task.promise
                if (cancelled) return
                pdfRef.current = pdf
                setNumPages(pdf.numPages)
            } catch (e) {
                if (cancelled) return
                setError(e?.message || 'Gagal memuat PDF')
            } finally {
                if (!cancelled) setIsLoading(false)
            }
        }

        loadPdf()

        return () => {
            cancelled = true
        }
    }, [src])

    const renderPageToDataUrl = useCallback(
        async (pageNumber) => {
            const pdf = pdfRef.current
            if (!pdf) return
            if (pageNumber < 1 || pageNumber > pdf.numPages) return

            if (pageImages.has(pageNumber)) return
            if (renderingRef.current.get(pageNumber)) return

            const renderPromise = (async () => {
                const page = await pdf.getPage(pageNumber)
                const viewport = page.getViewport({ scale: clampNumber(zoom, 0.8, 2.2) })

                const canvas = document.createElement('canvas')
                const context = canvas.getContext('2d')
                canvas.width = Math.ceil(viewport.width)
                canvas.height = Math.ceil(viewport.height)

                await page.render({ canvasContext: context, viewport }).promise
                const dataUrl = canvas.toDataURL('image/png')

                setPageImages((prev) => {
                    if (prev.has(pageNumber)) return prev
                    const next = new Map(prev)
                    next.set(pageNumber, dataUrl)
                    return next
                })
            })()

            renderingRef.current.set(pageNumber, renderPromise)

            try {
                await renderPromise
            } finally {
                renderingRef.current.delete(pageNumber)
            }
        },
        [pageImages, zoom]
    )

    useEffect(() => {
        if (!numPages) return

        const p = clampNumber(currentPage, 1, numPages)
        renderPageToDataUrl(p)
        renderPageToDataUrl(p + 1)
        renderPageToDataUrl(p + 2)
        renderPageToDataUrl(p - 1)
    }, [currentPage, numPages, renderPageToDataUrl])

    const pagesArray = useMemo(() => {
        return Array.from({ length: numPages }, (_, i) => i + 1)
    }, [numPages])

    const goPrev = () => {
        if (bookRef.current?.pageFlip) bookRef.current.pageFlip().flipPrev()
    }

    const goNext = () => {
        if (bookRef.current?.pageFlip) bookRef.current.pageFlip().flipNext()
    }

    const zoomOut = () => setZoom((z) => clampNumber(Number((z - 0.1).toFixed(2)), 0.8, 2.2))
    const zoomIn = () => setZoom((z) => clampNumber(Number((z + 0.1).toFixed(2)), 0.8, 2.2))

    const onFlip = (e) => {
        const next = e?.data + 1
        if (typeof next === 'number') setCurrentPage(next)
    }

    return (
        <div className="w-full bg-white rounded-2xl border-4 border-gray-300 shadow-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b-2 border-gray-200">
                <div className="font-extrabold uppercase tracking-wider text-gray-800">{title}</div>

                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={goPrev}
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 bg-white text-gray-900 text-sm font-bold uppercase hover:bg-gray-100"
                    >
                        Prev
                    </button>
                    <div className="text-sm font-bold text-gray-700 px-2">{numPages ? `${currentPage}/${numPages}` : '...'} </div>
                    <button
                        type="button"
                        onClick={goNext}
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 bg-white text-gray-900 text-sm font-bold uppercase hover:bg-gray-100"
                    >
                        Next
                    </button>

                    <div className="w-px h-7 bg-gray-300 mx-1" />

                    <button
                        type="button"
                        onClick={zoomOut}
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 bg-white text-gray-900 text-sm font-bold uppercase hover:bg-gray-100"
                    >
                        -
                    </button>
                    <div className="text-sm font-bold text-gray-700 min-w-[64px] text-center">{Math.round(zoom * 100)}%</div>
                    <button
                        type="button"
                        onClick={zoomIn}
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 bg-white text-gray-900 text-sm font-bold uppercase hover:bg-gray-100"
                    >
                        +
                    </button>

                    <div className="w-px h-7 bg-gray-300 mx-1" />

                    <a
                        href={src}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-xl border-2 border-gray-300 bg-white text-gray-900 text-sm font-bold uppercase hover:bg-gray-100"
                    >
                        Open
                    </a>
                </div>
            </div>

            <div className="w-full bg-gray-100 p-4 sm:p-6 flex items-center justify-center">
                {error ? (
                    <div className="text-red-700 font-bold">{error}</div>
                ) : isLoading ? (
                    <div className="text-gray-700 font-bold">Loading...</div>
                ) : !numPages ? (
                    <div className="text-gray-700 font-bold">Tidak ada halaman</div>
                ) : (
                    <div className="w-full flex justify-center">
                        <HTMLFlipBook
                            ref={bookRef}
                            width={420}
                            height={560}
                            size="stretch"
                            minWidth={315}
                            maxWidth={800}
                            minHeight={420}
                            maxHeight={1000}
                            maxShadowOpacity={0.35}
                            showCover
                            mobileScrollSupport
                            onFlip={onFlip}
                            className="shadow-2xl"
                        >
                            {pagesArray.map((p) => {
                                const img = pageImages.get(p)
                                return (
                                    <div key={p} className="bg-white">
                                        <div className="w-full h-full flex flex-col">
                                            <div className="flex-1 flex items-center justify-center bg-white">
                                                {img ? (
                                                    <img src={img} alt={`Page ${p}`} className="w-full h-full object-contain" />
                                                ) : (
                                                    <div className="text-gray-500 font-bold">Rendering page {p}...</div>
                                                )}
                                            </div>
                                            <div className="text-center text-xs font-bold text-gray-500 py-2 border-t border-gray-200">
                                                {p}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </HTMLFlipBook>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PdfFlipbook
