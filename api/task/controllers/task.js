"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
module.exports = {
  async statistic(ctx) {
    return await strapi.connections.default.raw(
      `SELECT
      u.id,
      u.title,
      COUNT (t.id) total,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waiting,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todo,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doing,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'aprroving' ) then 1 else 0 end) aprroving,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recovered,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'done' ) then 1 else 0 end) done,
  
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waitingOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todoOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doingOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'aprroving' ) then 1 else 0 end) aprrovingOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recoveredOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'done' ) then 1 else 0 end) doneOutDate
  FROM
      dbo.tasks t
      INNER JOIN dbo.units u
      ON u.id = t.executedUnit
  GROUP BY
      u.id,
      u.title`
    );
  },
};
