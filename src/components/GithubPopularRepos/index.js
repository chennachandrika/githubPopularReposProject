import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const API_LOADING = 100
const API_FAILURE = 404
const API_SUCCESS = 200

class GithubPopularRepos extends Component {
  state = {
    selectedLanguage: languageFiltersData[0].id,
    apiStatus: API_LOADING,
    listOfRepositories: [],
  }

  componentDidMount = () => {
    this.getSelectedLanguageRepos()
  }

  onSelectLanguage = language => () => {
    this.setState({selectedLanguage: language}, this.getSelectedLanguageRepos)
  }

  getSelectedLanguageRepos = async () => {
    const {selectedLanguage} = this.state
    this.setState({apiStatus: 100})
    const options = {
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/popular-repos?language=${selectedLanguage}`
    const promise = await fetch(url, options)
    if (promise.ok === true) {
      const response = await promise.json()
      this.setState({
        listOfRepositories: response.popular_repos.map(repos => ({
          name: repos.name,
          id: repos.id,
          issuesCount: repos.issues_count,
          forksCount: repos.forks_count,
          starsCount: repos.stars_count,
          avatarUrl: repos.avatar_url,
        })),
        apiStatus: promise.status,
      })
    } else {
      this.setState({listOfRepositories: [], apiStatus: API_FAILURE})
    }
  }

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderErrorView = () => (
    <div className="error-view-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {listOfRepositories} = this.state
    return (
      <ul className="repos-list">
        {listOfRepositories.map(repo => (
          <RepositoryItem key={repo.id} repo={repo} />
        ))}
      </ul>
    )
  }

  getSelectedLanguageReposUI = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case API_LOADING:
        return this.renderLoaderView()
      case API_FAILURE:
        return this.renderErrorView()
      case API_SUCCESS:
        return this.renderSuccessView()
      default:
        return this.renderLoaderView()
    }
  }

  render() {
    const {selectedLanguage} = this.state

    return (
      <div className="app-container">
        <h1>Popular</h1>
        <ul className="languages-bar">
          {languageFiltersData.map(language => (
            <LanguageFilterItem
              key={language.id}
              selectedLanguage={selectedLanguage}
              languageFilterItem={language}
              onSelectLanguage={this.onSelectLanguage}
            />
          ))}
        </ul>
        <div className="repos-container">
          {this.getSelectedLanguageReposUI()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
