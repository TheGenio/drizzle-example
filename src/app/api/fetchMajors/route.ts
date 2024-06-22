import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { majors } from "~/server/db/schema";

const GET = async (req: NextRequest) => {
  if (req.nextUrl.searchParams.get("update") === "true") {
    const url = `https://banner9-registration.kfupm.edu.sa/StudentRegistrationSsb/ssb/classSearch/get_subject?searchTerm=SWE&term=${req.nextUrl.searchParams.get("term")}&offset=3&max=10`;
    try {
      const res = await fetch(
        url,
        //get
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      const data = await res.json();

      const majorsData = data.map((major: any) => ({
        code: major.code,
        name: major.description,
      }));
      if(majorsData.length === 0){
        return NextResponse.json("No Data", { status: 200 });
      }
      await db.insert(majors).values(majorsData).onConflictDoNothing();

      return NextResponse.json("Database Updated", { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json(
        { message: "Error", error: error.getMessage() },

        { status: 500 },
      );
    }
  }

  return NextResponse.json({ message: "Hit" }, { status: 200 });
};

export { GET };

// export async function GET(req:NextRequest){
//     console.log("hit")
//     console.log(req)
// }
