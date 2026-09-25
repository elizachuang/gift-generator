import './SiteHeader.css'

// Brand bar at the top of every screen. The page's main heading lives in the content below.
function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <img
          className="site-header__logo"
          src={`${import.meta.env.BASE_URL}favicon.svg`}
          alt=""
          width="32"
          height="32"
        />
        <span className="site-header__name">Gift Generator</span>
      </div>
    </header>
  )
}

export default SiteHeader
