import React, { useContext, useState } from 'react';
import AppContext from '../context/context';

function Table() {
  const [filterStatement, setFilter] = useState('');
  const { planets } = useContext(AppContext);
  return (
    <>
      <form>
        <input
          data-testid="name-filter"
          onChange={ ({ target }) => setFilter(target.value) }
          type="text"
        />
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
          {filterStatement === '' ? planets.map((element) => (
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
          )) : planets
            .filter((element) => element.name.includes(filterStatement))
            .map((element) => (
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
            ))}
        </tbody>

      </table>

    </>
  );
}

export default Table;
