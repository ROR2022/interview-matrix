import Interviews from "../../../models/Interview.ts";
import dbConnect from "../../../db/dbConn.ts";

export async function GET() {
  try {
    await dbConnect();
    const interviews = await Interviews.find({});
    //eslint-disable-next-line
    console.log("interviews:..", interviews.length);

    return new Response(JSON.stringify({ interviews }), { status: 200 });
  } catch (error) {
    console.log("error:..", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const interview = new Interviews(body);

    await interview.save();

    return new Response(JSON.stringify({ interview }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
