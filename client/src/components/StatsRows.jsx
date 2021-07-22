import React from 'react';

const StatsRows = (props) => {
  const { name, game } = props;

  let type;

  if (name === 'Over/Under') {
    type = 'over_under';
  } else if (name === 'Spread') {
    type = 'spread';
  } else {
    type = 'money_line';
  }

  return (
    <tr>
      <td>{name}</td>
      <td className="text-center">
        {game.awayStats[type] ? game.awayStats[type].avg : 'N/A'}
      </td>
      <td className="text-center">
        {game.awayStats[type] ? game.awayStats[type].median : 'N/A'}
      </td>
      <td className="text-center">
        {game.awayStats[type] ? game.awayStats[type].min : 'N/A'}
      </td>
      <td className="text-center">
        {game.awayStats[type] ? game.awayStats[type].max : 'N/A'}
      </td>
      <td className="text-center">
        {game.homeStats[type] ? game.homeStats[type].avg : 'N/A'}
      </td>
      <td className="text-center">
        {game.homeStats[type] ? game.homeStats[type].median : 'N/A'}
      </td>
      <td className="text-center">
        {game.homeStats[type] ? game.homeStats[type].min : 'N/A'}
      </td>
      <td className="text-center">
        {game.homeStats[type] ? game.homeStats[type].max : 'N/A'}
      </td>
    </tr>
  );
};

export default StatsRows;
