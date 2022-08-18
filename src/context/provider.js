import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './context';

function PlanetsProvider(props) {
  const { children } = props;
  const [planets, setPlanets] = useState([]);
  const [filterStatement, setFilter] = useState({ name: '' });

  function addAllPlanets(allPlanets) {
    setPlanets(allPlanets);
  }
  function addFilterStatement(filter) {
    setFilter(filter);
  }
  const { Provider } = AppContext;
  return (
    <Provider value={ { planets, addAllPlanets, addFilterStatement, filterStatement } }>
      {children}
    </Provider>
  );
}
PlanetsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
export default PlanetsProvider;
