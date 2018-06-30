import React from 'react';

export default class NoteList extends React.Component {
  constructor(){
    super()
  }
  render() {
    return (
      <div className='page-layout'>
        <div className='page-left'>
          <Switch>
            <Route path='/home' component={Home}/>
            <Route exact path='/categories' component={Categories}/>
          </Switch>
        </div>
        <div className='page-right'>
          1231
        </div>
      </div>
    )
  }
}