import './index.css'

const LanguageFilterItem = props => {
  const {selectedLanguage, languageFilterItem, onSelectLanguage} = props
  const {id, language} = languageFilterItem
  return (
    <li onClick={onSelectLanguage(id)}>
      <button
        className={`language-button ${id === selectedLanguage && 'active'}`}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
