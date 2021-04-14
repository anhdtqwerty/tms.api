"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
module.exports = {
  async statisticByUnit(ctx) {
    let query = "";
    if (ctx.query) {
      if (ctx.query && ctx.query.from && ctx.query.to && ctx.query.ministry) {
        query = `WHERE
        t.created_at BETWEEN '${ctx.query.from}' AND '${ctx.query.to}'
        AND t.${ctx.query.joinUnitBy || "executedUnit"} = ${
          ctx.query.ministry
        }`;
      } else if (ctx.query && ctx.query.ministry) {
        query = `WHERE
        t.${ctx.query.joinUnitBy || "executedUnit"} = ${ctx.query.ministry}`;
      } else if (ctx.query && ctx.query.from && ctx.query.to) {
        query = `WHERE
        t.created_at BETWEEN '${ctx.query.from}' AND '${ctx.query.to}'`;
      }
    }
    return await strapi.connections.default.raw(
      `SELECT
      u.id,
      u.title,
      COUNT (t.id) total,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waiting,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todo,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doing,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recovered,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'returned' ) then 1 else 0 end) returned,
      SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving' ) then 1 else 0 end) approving,
      SUM(CASE WHEN (t.expiredDate > t.doneDate AND t.state = 'done' AND t.status = 'approved' ) then 1 else 0 end) done,
  
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waitingOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todoOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doingOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recoveredOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'returned' ) then 1 else 0 end) returnedOutDate,
      SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving') then 1 else 0 end) approvingOutDate,
      SUM(CASE WHEN (t.expiredDate < t.doneDate AND t.state = 'done' AND t.status = 'approved') then 1 else 0 end) doneOutDate
  FROM
      dbo.tasks t
      INNER JOIN dbo.units u
      ON u.id = t.${ctx.query.joinBy || "executedUnit"} 
  ${query}
  GROUP BY
      u.id,
      u.title`
    );
  },
  async statisticByDepartment(ctx) {
    let query = "";
    if (ctx.query) {
      if (ctx.query && ctx.query.from && ctx.query.to && ctx.query.unit) {
        query = `WHERE  
        t.createdDepartment IS NULL
        AND t.created_at BETWEEN '${ctx.query.from}' AND '${ctx.query.to}'
        AND t.${ctx.query.joinUnitBy || "executedUnit"} = ${ctx.query.unit}`;
      } else if (ctx.query.unit) {
        query = ` WHERE
        t.createdDepartment IS NULL
         AND t.${ctx.query.joinUnitBy || "executedUnit"} = ${ctx.query.unit}`;
      } else if (ctx.query && ctx.query.from && ctx.query.to) {
        query = ` WHERE
        t.createdDepartment IS NULL
         AND t.created_at BETWEEN '${ctx.query.from}' AND '${ctx.query.to}'`;
      }
    }
    return await strapi.connections.default.raw(`
    SELECT
    d.id,
    d.title,
    COUNT (t.id) total,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waiting,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todo,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doing,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recovered,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'returned' ) then 1 else 0 end) returned,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving' ) then 1 else 0 end) approving,
    SUM(CASE WHEN (t.expiredDate > t.doneDate AND t.state = 'done' AND t.status = 'approved' ) then 1 else 0 end) done,

    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waitingOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todoOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doingOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recoveredOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'returned' ) then 1 else 0 end) returnedOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving') then 1 else 0 end) approvingOutDate,
    SUM(CASE WHEN (t.expiredDate < t.doneDate AND t.state = 'done' AND t.status = 'approved') then 1 else 0 end) doneOutDate
    FROM
        dbo.tasks t
        INNER JOIN dbo.departments d
        ON d.id = t.${ctx.query.joinBy || "executedDepartment"}
    ${query}
    GROUP BY
        d.id,
        d.title`);
  },
  async statisticByComrade(ctx) {
    let query = "";
    if (ctx.query) {
      if (ctx.query.comrade) {
        ` WHERE
         t.${ctx.query.joinBy || "executedComrade"} = ${ctx.query.comrade}`;
      } else if (ctx.query.department) {
        ` WHERE
         t.${ctx.query.joinDepartmentBy || "executedDepartment"} = ${
          ctx.query.department
        }`;
      }

      if (ctx.query && ctx.query.from && ctx.query.to) {
        query += ` AND t.created_at BETWEEN '${ctx.query.from}' AND '${ctx.query.to}'`;
      }
    }
    return await strapi.connections.default.raw(`
    SELECT
    c.id,
    c.name,
    COUNT (t.id) total,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waiting,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todo,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doing,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recovered,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'returned' ) then 1 else 0 end) returned,
    SUM(CASE WHEN (t.expiredDate > CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving' ) then 1 else 0 end) approving,
    SUM(CASE WHEN (t.expiredDate > t.doneDate AND t.state = 'done' AND t.status = 'approved' ) then 1 else 0 end) done,

    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'waiting') then 1 else 0 end) waitingOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'todo' ) then 1 else 0 end) todoOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'doing' ) then 1 else 0 end) doingOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'recovered' ) then 1 else 0 end) recoveredOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'returned' ) then 1 else 0 end) returnedOutDate,
    SUM(CASE WHEN (t.expiredDate < CONVERT(date, GETDATE()) AND t.state = 'done' AND t.status = 'approving') then 1 else 0 end) approvingOutDate,
    SUM(CASE WHEN (t.expiredDate < t.doneDate AND t.state = 'done' AND t.status = 'approved') then 1 else 0 end) doneOutDate
    FROM
        dbo.tasks t
        INNER JOIN dbo.comrades c
        ON c.id = t.${ctx.query.joinBy || "executedComrade"}
    ${query}
    GROUP BY
        c.id,
        c.name`);
  },
};
