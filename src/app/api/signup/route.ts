import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";

export async function POST(req: NextRequest) {
  
  try {
    const reqBody = await req.json();
    const { email, username, password } = reqBody;
    //TODO create error validation

    const user = await db.query.users.findFirst({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      where: eq(users.email, email), //TODO, CHECK FOR USERNAMES
    });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    await db.insert(users).values({
        username:username,
        email:email,
        password:hashedPassword

    })
    return NextResponse.json({ message: "User created" }, { status: 201 });



  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
