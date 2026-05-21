import './Header.css'

interface HeaderProps {
  title: string
}

function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <span className="header-title">{title}</span>
      <div className="header-right">
        <span className="header-badge">FISCAL Q4 &middot; FY2026</span>
      </div>
    </header>
  )
}

export default Header
