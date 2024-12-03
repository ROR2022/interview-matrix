import dbConnect from "../../../../db/dbConn.ts";
import Interviews from "../../../../models/Interview.ts";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    console.log("params:..", params);
    console.log("id to find:..", params.id);
    const interview = await Interviews.findById(params.id);
    //eslint-disable-next-line
    console.log("interviews:..", interview);

    return new Response(JSON.stringify({ interview }), { status: 200 });
  } catch (error) {
    console.log("error:..", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

export async function PUT(request, { id }) {
  try {
    await dbConnect();
    const body = await request.json();
    const interview = await Interviews.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return new Response(JSON.stringify({ interview }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

export async function DELETE(request, { id }) {
  try {
    await dbConnect();
    const interview = await Interviews.findByIdAndDelete(id);

    return new Response(JSON.stringify({ interview }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
