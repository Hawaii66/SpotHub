import { connect } from "@planetscale/database";

export const planetScaleQuery = async (query: string, args?: any[]) => {
  const config = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  };
  const conn = connect(config);
  const results = await conn.execute(query, args);
  return results;
};

type DatabaseConfig = {
  host: string;
  username: string;
  password: string;
};

interface Database {
  config: DatabaseConfig;
  query(query: string, args: any[]): Promise<any>;
}

class PlanetScaleDB implements Database {
  config: DatabaseConfig;
  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async query(query: string, args: any[]) {
    return await connect(this.config).execute(query, args);
  }
}

export class DatabaseFactory {
  constructor() {}

  GetDB(): Database {
    return new PlanetScaleDB({
      host: process.env.DATABASE_HOST || "",
      username: process.env.DATABASE_USERNAME || "",
      password: process.env.DATABASE_PASSWORD || "",
    });
  }
}

export const queryDeep = async (query: string, args?: any[]) => {
  const db = new PlanetScaleDB({
    host: process.env.DATABASE_HOST || "",
    username: process.env.DATABASE_USERNAME || "",
    password: process.env.DATABASE_PASSWORD || "",
  });
  return await db.query(query, args || []);
};

export const query = async (query: string, args?: any[]) => {
  const db = new PlanetScaleDB({
    host: process.env.DATABASE_HOST || "",
    username: process.env.DATABASE_USERNAME || "",
    password: process.env.DATABASE_PASSWORD || "",
  });
  return (await db.query(query, args || [])).rows;
};
