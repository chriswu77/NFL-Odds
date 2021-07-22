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

  const handleNulls = (obj, statType) => {
    if (!obj) {
      return 'N/A';
    }
    return obj[statType];
  };

  const cellStyle = (obj, statType) => {
    if (!obj || obj[statType] > 0) {
      return '';
    }
    return ' cell';
  };

  return (
    <tr>
      <td>{name}</td>
      <td className={`text-center${cellStyle(game.awayStats[type], 'avg')}`}>
        {handleNulls(game.awayStats[type], 'avg')}
      </td>
      <td className={`text-center${cellStyle(game.awayStats[type], 'median')}`}>
        {handleNulls(game.awayStats[type], 'median')}
      </td>
      <td className={`text-center${cellStyle(game.awayStats[type], 'min')}`}>
        {handleNulls(game.awayStats[type], 'min')}
      </td>
      <td className={`text-center${cellStyle(game.awayStats[type], 'max')}`}>
        {handleNulls(game.awayStats[type], 'max')}
      </td>
      <td className={`text-center${cellStyle(game.homeStats[type], 'avg')}`}>
        {handleNulls(game.homeStats[type], 'avg')}
      </td>
      <td className={`text-center${cellStyle(game.homeStats[type], 'median')}`}>
        {handleNulls(game.homeStats[type], 'median')}
      </td>
      <td className={`text-center${cellStyle(game.homeStats[type], 'min')}`}>
        {handleNulls(game.homeStats[type], 'min')}
      </td>
      <td className={`text-center${cellStyle(game.homeStats[type], 'max')}`}>
        {handleNulls(game.homeStats[type], 'max')}
      </td>
    </tr>
  );
};

export default StatsRows;
