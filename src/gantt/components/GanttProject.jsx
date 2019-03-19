import React from 'react';
import Project from '../core/Project';

export default React.createContext({
  project: new Project(),
});