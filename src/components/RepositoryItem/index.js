import './index.css'

const RepositoryItem = props => {
  const {repo} = props
  const {name, avatarUrl, issuesCount, forksCount, starsCount} = repo

  return (
    <li className="repo-item">
      <img className="repo-avatar-img" alt={name} src={avatarUrl} />
      <h1>{name}</h1>
      <div className="repo-brief-details">
        <div className="repo-details">
          <img
            className="icons"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          />
          <p>{`${starsCount}`}</p>
        </div>
        <div className="repo-details">
          <img
            className="icons"
            alt="forks"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          />
          <p>{`${forksCount} forks`}</p>
        </div>
        <div className="repo-details">
          <img
            className="icons"
            alt="open-issues"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          />
          <p>{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
