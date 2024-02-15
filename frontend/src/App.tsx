import { Outlet } from "react-router-dom"


function App() {

  return (
    <>
      <div>
        <h1 className='bg-red-500 text-2xl' style={{fontFamily: "PTSans"}}>
          tailwind test Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit ipsam incidunt nihil dolorum, ducimus, molestiae voluptatibus qui illum amet eligendi reprehenderit quo eveniet?
        </h1>
      </div>
      <Outlet />
    </>

  )
}

export default App
