import React from 'react';

const Like = ({ liked, toggleLike }) => {
  let classes = 'fa fa-heart';
  if(liked !== true) classes += '-o'
  return ( 
    <i 
      className={ classes } 
      onClick={ toggleLike }
      style={{ cursor: 'pointer' }}
    ></i>
  );
}
 
export default Like;
