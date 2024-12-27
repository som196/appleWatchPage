import './index.css'

const RenderCardDetails = props => {
  const {eachItem} = props
  const {name, imageUrl} = eachItem
  return (
    <li className="each-container">
      <img src={imageUrl} alt={name} className="each-img" />
      <p className="para-name">{name}</p>
    </li>
  )
}

export default RenderCardDetails
