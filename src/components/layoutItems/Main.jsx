import layout from './Layout.module.scss';

const Main = ({ children }) => {
  return (
    <div className={layout.container}>
      {children}
    </div>
  )
}

export default Main