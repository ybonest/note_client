import { Route, Link } from 'react-router-dom';

export default LinkRoute = (props) => {
  return (
    <Route
      path={path}
      children={({match}) => {
        if(match) {
          console.log(test)
        }
        return <Link to={path}/>
      }}
    />
  )
}