"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#bootstrap
 */

const createPositions = async () => {
  const positions = await strapi.services.position.count({});
  console.log(positions);
  if (positions === 0) {
    await strapi.services.position.create({
      id: 1,
      title: "Lãnh đạo",
      description: "Nhóm Lãnh đạo nhìn thấy tất cả nhiệm vụ thuộc đơn vị mình.",
      config: {
        task: {
          main: {
            add: false,
            revoke: false,
            update: false,
            edit: false,
            delete: false,
            approve: false,
            assign: false,
            full: false,
            return: false,
            read: true,
            extend: false,
            reopen: false,
          },
          sub: {
            add: false,
            revoke: false,
            update: false,
            edit: false,
            delete: false,
            approve: false,
            assign: false,
            full: false,
            return: false,
            read: true,
            extend: false,
            reopen: false,
          },
        },
        system: {
          unit: {
            full: false,
            read: true,
            add: false,
            edit: false,
            delete: false,
          },
          role: {
            full: false,
            read: false,
            add: false,
            edit: false,
            delete: false,
          },
          user: {
            full: false,
            read: false,
            add: false,
            edit: false,
            delete: false,
          },
          log: {
            full: false,
            read: false,
          },
        },
        report: {
          detail: {
            full: false,
            read: false,
          },
          general: {
            full: false,
            read: false,
          },
        },
      },
      metadata: null,
      data: {
        group_type: "leader",
      },
      type: "group",
    });
    await strapi.services.position.create({
      id: 2,
      title: "Chuyên viên",
      description:
        "Nhóm Chuyên viên chỉ nhìn thấy các nhiệm vụ do mình tạo ra hoặc nhiệm vụ được giao.",
      config: {
        task: {
          main: {
            add: false,
            revoke: false,
            update: false,
            edit: false,
            delete: false,
            approve: false,
            assign: false,
            full: false,
            return: false,
            read: false,
            extend: false,
            reopen: false,
          },
          sub: {
            add: false,
            revoke: false,
            update: false,
            edit: false,
            delete: false,
            approve: false,
            assign: false,
            full: false,
            return: false,
            read: false,
            extend: false,
            reopen: false,
          },
        },
        system: {
          unit: {
            full: false,
            read: false,
            add: false,
            edit: false,
            delete: false,
          },
          role: {
            full: false,
            read: false,
            add: false,
            edit: false,
            delete: false,
          },
          user: {
            full: false,
            read: false,
            add: false,
            edit: false,
            delete: false,
          },
          log: {
            full: false,
            read: false,
          },
        },
        report: {
          detail: {
            full: false,
            read: false,
          },
          general: {
            full: false,
            read: false,
          },
        },
      },
      data: {
        group_type: "member",
      },
      created_at: "2020-12-08T14:56:05.763Z",
      updated_at: "2021-01-15T05:25:13.390Z",
      type: "group",
    });
    await strapi.services.position.create({
      id: 3,
      title: "admin",
      description: "full quyền",
      config: {
        task: {
          main: {
            full: true,
            read: false,
            add: false,
            edit: false,
            delete: false,
            revoke: false,
            assign: false,
            extend: false,
            return: false,
            update: false,
            approve: false,
            reopen: false,
          },
          sub: {
            full: true,
            read: false,
            add: false,
            edit: false,
            delete: false,
            revoke: false,
            assign: false,
            extend: false,
            return: false,
            update: false,
            approve: false,
            reopen: false,
          },
        },
        system: {
          unit: {
            full: true,
            read: false,
            add: false,
            edit: false,
            delete: false,
          },
          role: {
            full: true,
            read: false,
            add: false,
            edit: false,
            delete: false,
          },
          user: {
            full: true,
            read: false,
            add: false,
            edit: false,
            delete: false,
          },
          log: {
            full: true,
            read: false,
          },
        },
        report: {
          detail: {
            full: true,
            read: false,
          },
          general: {
            full: true,
            read: false,
          },
        },
      },
      type: "unit",
    });
  }
};
const createUnit = async () => {
  const unit = await strapi.services.unit.count({});
  if (unit === 0) {
    await strapi.services.unit.create({
      id: 1,
      title: "BỘ GIAO THÔNG VẬN TẢI",
      type: "ministry",
      code: "GTVT",
      departments: [],
    });
  }
};
const createComrade = async () => {
  const comrade = await strapi.services.comrade.count({});
  if (comrade === 0) {
    await strapi.services.comrade.create({
      id: 1,
      name: "admin",
      code: "admin",
      position: 3,
    });
    const data = await strapi.plugins["users-permissions"].services.user.add({
      id: 1,
      username: "admin",
      password: "123123",
      email: "admin@gmail.com",
      provider: "local",
      confirmed: false,
      blocked: false,
      role: 1,
      comrade: 1,
    });
  }
};
module.exports = async () => {
  await createUnit();
  await createPositions();
  await createComrade();
};
