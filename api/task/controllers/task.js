"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
module.exports = {
  async statisticByUnit(ctx) {
    return await strapi.connections.default.raw(
      `SELECT
      u.id,
      u.title,
      COUNT (t.id) total,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waiting,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todo,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doing,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recovered,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving' ) then 1 else 0 end) approving,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approved' ) then 1 else 0 end) done,
  
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waitingOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todoOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doingOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recoveredOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving') then 1 else 0 end) approvingOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approved') then 1 else 0 end) doneOutDate
  FROM
      dbo.tasks t
      INNER JOIN dbo.units u
      ON u.id = t.executedUnit
  WHERE
      t.created_at BETWEEN '${ctx.query.from}' AND '${ctx.query.to}'
  GROUP BY
      u.id,
      u.title`
    );
  },
  async statisticByDepartment(ctx) {
    const unit = ctx.query.unit
      ? ` AND t.executedUnit = ${ctx.query.unit}`
      : "";
    return await strapi.connections.default.raw(`
    SELECT
    d.id,
    d.title,
    COUNT (t.id) total,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waiting,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todo,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doing,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recovered,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving' ) then 1 else 0 end) approving,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approved' ) then 1 else 0 end) done,

    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waitingOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todoOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doingOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recoveredOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving') then 1 else 0 end) approvingOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approved') then 1 else 0 end) doneOutDate
FROM
    dbo.tasks t
    INNER JOIN dbo.departments d
    ON d.id = t.executedDepartment
WHERE
    t.created_at BETWEEN '${ctx.query.from}' AND '${ctx.query.to}'
    ${unit}
GROUP BY
    d.id,
    d.title`);
  },
};
