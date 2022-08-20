import React, { useContext, useState } from 'react';
import AppContext from '../context/context';

function Table() {
  const { planets, addFilterStatement, filterStatement } = useContext(AppContext);
  const [allFilters, setAllFilters] = useState([]);
  const [options, setOptions] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
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
          {options
            .map((option) => <option key={ option }>{option}</option>)}
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
            setOptions([...options.filter((e) => e !== numericFilters.column)]);
            setNumericFilters({ ...numericFilters, column: options[0] });
          } }
        >
          Filtro

        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => {
            setAllFilters([]);
            setOptions(['population',
              'orbital_period',
              'diameter',
              'rotation_period',
              'surface_water']);
          } }
        >
          Remover todas filtragens

        </button>
      </form>
      <div className="filters">
        {allFilters.map((filter) => (
          <p data-testid="filter" key={ `${filter.comparison}  ${filter.value}` }>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
            <button
              type="button"
              onClick={ () => {
                setOptions([...options, filter.column]);
                setAllFilters([...allFilters.filter((filtr) => filtr !== filter)]);
              } }
            >
              Apagar

            </button>
          </p>))}
      </div>
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
