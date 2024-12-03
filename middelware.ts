import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

//import dbConnect from "./db/dbConn.js";

export async function middelware(req: NextRequest) {
  //eslint-disable-next-line
  console.log("ejecutando middleware:..",req.url);

  

  return NextResponse.next();
}
