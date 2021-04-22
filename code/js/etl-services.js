'use strict';

function services(data, db){
 
    const theServices = {
    
    getIssues: async function(){
      return data.getIssues()
    }
  };
  return theServices;
}

module.exports = services;
