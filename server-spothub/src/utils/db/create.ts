import { DBFolder, DBUser } from "@/interfaces/Database";
import { User } from "@/interfaces/User";
import { DatabaseFactory } from "../database";
import { GetFolder, GetUser } from "./get";
import { Folder } from "@/interfaces/Folder";

export const CreateUser = async (user: DBUser): Promise<User | undefined> => {
  const db = new DatabaseFactory().GetDB();
  const result = await db.query<DBUser>(
    `INSERT INTO users (id,name,href,email) VALUES (?,?,?,?)`,
    [user.id, user.name, user.href, user.email]
  );
  console.log(result);

  return await GetUser(user.id);
};

export const CreateFolder = async (
  folder: DBFolder
): Promise<Folder | undefined> => {
  const db = new DatabaseFactory().GetDB();
  const result = await db.query(
    "INSERT INTO folders (name,description,user_id) VALUES (?,?,?)",
    [folder.name, folder.description, folder.user_id]
  );

  return await GetFolder(parseInt(result.insertId));
};
