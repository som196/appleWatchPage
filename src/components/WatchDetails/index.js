import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import RenderCardDetails from '../RenderCardDetails'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const WatchDetails = () => {
  const [select, setSelect] = useState(categoriesList[0].id)
  const [data, setData] = useState([])
  const [currentStatus, setCurrentStatus] = useState(apiStatusConstants.initial)

  const optionChanged = async event => {
    await setSelect(event.target.value)
  }

  const getData = async () => {
    setCurrentStatus(apiStatusConstants.inProgress)
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${select}`
    console.log(apiUrl)
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.projects.map(eachProject => ({
        id: eachProject.id,
        imageUrl: eachProject.image_url,
        name: eachProject.name,
      }))
      setData(updatedData)
      setCurrentStatus(apiStatusConstants.success)
    } else {
      setCurrentStatus(apiStatusConstants.failure)
    }
  }

  const retryButtonClicked = () => {
    getData()
  }

  const selectElementsRender = () => (
    <div className="select-container">
      <select name="categories" onChange={optionChanged}>
        {categoriesList.map(eachItem => (
          <option
            value={eachItem.id}
            className="option-class"
            key={eachItem.id}
          >
            {eachItem.displayText}
          </option>
        ))}
      </select>
    </div>
  )

  const renderSuccess = () => (
    <div className="all-success-container">
      {selectElementsRender()}
      <ul className="all-cards-container">
        {data.map(eachItem => (
          <RenderCardDetails eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    </div>
  )

  const renderLoadingView = () => (
    <div className="all-pending-container">
      {selectElementsRender()}
      <div className="products-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  const renderFailureView = () => (
    <div className="all-failure-container">
      {selectElementsRender()}
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-para">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="retry-button"
          onClick={retryButtonClicked}
        >
          Retry
        </button>
      </div>
    </div>
  )

  useEffect(() => {
    getData()
  }, [select])

  switch (currentStatus) {
    case apiStatusConstants.success:
      return renderSuccess()
    case apiStatusConstants.failure:
      return renderFailureView()
    case apiStatusConstants.inProgress:
      return renderLoadingView()
    default:
      return null
  }
}

export default WatchDetails
