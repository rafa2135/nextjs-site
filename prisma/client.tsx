import { PrismaClient } from "@prisma/client";
declare global {
  namespace NodeJS {
    interface Global {}
  }
}
//add prisma to the NodeJS global type
interface CustonNodeJSGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}
//prevent multiple instances of prisma client in development
declare const global: CustonNodeJSGlobal;
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma;

export default prisma;
