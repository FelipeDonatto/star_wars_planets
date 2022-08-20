import React, { useContext, useState } from 'react';
import AppContext from '../context/context';

function Table() {
  const { planets, addFilterStatement, filterStatement } = useContext(AppContext);
  const [allFilters, setAllFilters] = useState([]);
  const [activeFilter, setActiveFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

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

  const filterTable = () => {
    let byName = planets.filter((e) => e.name.includes(filterStatement.name));
    if (filterStatement.name !== '') {
      return byName;
    }
    if (allFilters.length !== 0) {
      allFilters.forEach((fltr) => {
        const { column, value, comparison } = fltr;
        byName = byName.filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return parseInt(planet[column], 10) > parseInt(value, 10);

          case 'menor que':
            return parseInt(planet[column], 10) < parseInt(value, 10);

          case 'igual a':
            return parseInt(planet[column], 10) === parseInt(value, 10);

          default: return true;
          }
        });
      });
      return byName;
    }
    return planets;
  };
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
            setNumericFilters({ ...numericFilters, column: target.value });
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
            setNumericFilters({ ...numericFilters, comparison: target.value });
          } }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ numericFilters.value }
          onChange={ ({ target }) => {
            setNumericFilters({ ...numericFilters, value: target.value });
          } }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => {
            setAllFilters([...allFilters, numericFilters]);
          } }
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
          {planets && filterTable().map((e) => mountTable(e))}
        </tbody>

      </table>

    </>
  );
}

export default Table;
