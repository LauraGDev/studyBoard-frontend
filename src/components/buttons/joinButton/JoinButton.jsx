import "./joinButton.scss"

const JoinButton = ( { color, onClick} ) => {
  return (
    <button className={`btn ${color}`}>
        <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 1 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21C7.043 21 4.862 20.355 3 19.234v.001Z"/>
        </svg>
        </div>
    </button>
  )
}

export default JoinButton
