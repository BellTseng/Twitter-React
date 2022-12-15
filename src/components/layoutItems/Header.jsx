import layout from './Layout.module.scss';

const Header = ({ type, title, subTitle }) => {
  return (
    <div className={layout.header + ' ' + layout[type]}>
      <span className="back"></span>
      <h2>{title}</h2>
      {!!subTitle && <p>{subTitle}</p>}
    </div>
  )
}

export default Header;