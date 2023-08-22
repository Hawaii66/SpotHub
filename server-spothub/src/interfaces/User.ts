import { Folder } from "./Folder";

export type User = {
  id: string;
  name: string;
  href: string;
  email: string;
  folders: Folder[];
};
