import { useState } from "react"

const Join = () => {
    const [isOpen, setIsOpen] = useState(true)

    return(
        <> {
            isOpen &&
                <div className="w-full h-full bg-white absolute top-0 left-0 flex flex-col justify-center">
                    <p>Wanna help someone find their...</p>
                    <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl font-exo">Forever Home?</h1>
                    <div className="prose max-w-sm text-left mx-auto">
                        <ul>
                            <li>Find the pet that best matches your client</li>
                            <li>Help as many pets as you can find their forever home!</li>
                        </ul>
                    </div>
                    <div className="my-5">
                        <button onClick={() => {setIsOpen(false)}} className="bg-slate-200 px-4 py-2 rounded-md">Get Started!</button>
                    </div>
                </div>

            }
        </>
    )
}

export default Join