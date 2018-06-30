import { Route, Link } from 'react-router-dom';
import React from 'react';
const ActiveLink = ({to, activeOnlyWhenExact, current, onSelect ,...rest}) => {
  return <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({match}) => {
      if(match && !match.path.includes(current)){
        /* 处理警告：Warning: Cannot update during an existing state transition 
        (such as within `render` or another component's constructor). 
        Render methods should be a pure function of props and state; 
        constructor side-effects are an anti-pattern, but can be moved to `compon*/
        setTimeout(() => {
          onSelect && onSelect();
        }, 0)
      }
      return <Link to={to} onClick={onSelect} {...rest}/>
    }}
  />
}

export default ActiveLink;