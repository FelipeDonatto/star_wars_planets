import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './context';

function PlanetsProvider(props) {
  const { children } = props;
  const [planets, setPlanets] = useState([
    {
      id: 1,
      name: 'planeta',
    },
  ]);

  function addAllPlanets(allPlanets) {
    setPlanets(allPlanets);
  }
  const { Provider } = AppContext;
  return (
    <Provider value={ { planets, addAllPlanets } }>
      {children}
    </Provider>
  );
}
PlanetsProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};
export default PlanetsProvider;
