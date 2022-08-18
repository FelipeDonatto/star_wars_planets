import React, { useContext, useState } from 'react';
import AppContext from '../context/context';

function Table() {
  const { planets, addFilterStatement, filterStatement } = useContext(AppContext);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [filterStatus, setFilterStatus] = useState(false);
  function mountTable(element) {
    return (
      <tr key={ element.name }>
        <td>
          {element.name}
        </td>
        <td>
          {element.rotation_period}
        </td>
        <td>
          {element.orbital_period}
        </td>
        <td>
          {element.diameter}
        </td>
        <td>
          {element.climate}
        </td>
        <td>
          {element.gravity}
        </td>
        <td>
          {element.terrain}
        </td>
        <td>
          {element.surface_water}
        </td>
        <td>
          {element.population}
        </td>
        <td>
          {element.films}
        </td>
        <td>
          {element.created}
        </td>
        <td>
          {element.edited}
        </td>
        <td>
          {element.url}
        </td>
      </tr>
    );
  }
  function filterPlanets(comparison) {
    let applyFilter = '';
    if (comparison === 'maior que') {
      applyFilter = planets
        .filter((planet) => planet.name.includes(filterStatement.name)
       && parseInt(planet[filters.column], 10) > parseInt(filters.value, 10));
    }
    if (comparison === 'igual a') {
      applyFilter = planets
        .filter((planet) => planet.name.includes(filterStatement.name)
       && parseInt(planet[filters.column], 10) === parseInt(filters.value, 10));
    }
    if (comparison === 'menor que') {
      applyFilter = planets
        .filter((planet) => planet.name.includes(filterStatement.name)
       && parseInt(planet[filters.column], 10) < parseInt(filters.value, 10));
    }

    return (applyFilter.map((e) => mountTable(e)));
  }
  return (
    <>
      <form>
        <input
          data-testid="name-filter"
          onChange={ ({ target }) => addFilterStatement({ name: target.value }) }
          type="text"
        />
        <select
          onChange={ ({ target }) => {
            setFilters({ ...filters, column: target.value });
          } }
          data-testid="column-filter"
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => {
            setFilters({ ...filters, comparison: target.value });
          } }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ filters.value }
          onChange={ ({ target }) => {
            setFilters({ ...filters, value: target.value });
          } }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => { setFilterStatus(true); } }
        >
          Filtro

        </button>
      </form>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
          {!filterStatus ? planets
            .filter((planet) => planet.name.includes(filterStatement.name))
            .map((element) => mountTable(element))
            : filterPlanets(filters.comparison)}
        </tbody>

      </table>

    </>
  );
}

export default Table;
