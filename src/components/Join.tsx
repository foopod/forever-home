import { useState } from "react"

const Join = () => {
    const [isOpen, setIsOpen] = useState(true)
    

    return(
        <> {
            isOpen &&
                <div className="w-full h-full bg-white absolute top-0 left-0 flex flex-col justify-center">
                    <p>Wanna help someone find their...</p>
                    <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">Forever Home?</h1>
                    <div>
                        <button onClick={() => {setIsOpen(false)}} className="bg-slate-200 px-4 py-2 rounded-md">Get Started!</button>
                    </div>
                </div>

            }
        </>
    )
}

export default Join