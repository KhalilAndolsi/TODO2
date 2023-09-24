import "./Error.css"


function Error() {
  return (
    <div className="bg-white fixed left-0 top-0 z-50 w-screen h-screen grid place-items-center font-bold text-5xl px-2 text-center">
      There is a server malfunction, please refrech the page or try again later.
    </div>
  )
}

export default Error