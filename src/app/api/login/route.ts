import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";
import jwt from "jsonwebtoken";
import { access } from "fs";

export async function POST(req: NextRequest) {
  //TODO: Add time deley to confude attackers
  try {
    const reqBody = await req.json();
    const { username, password } = reqBody;
    //create error validation
    console.log(reqBody);
    const user = await db.query.users.findFirst({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      where: eq(users.username, username),
    });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 400 },
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 400 },
      );
    }
    const tokenData = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "20mins",
    });
    const response = NextResponse.json({
      accessToken: token,
      user:{
        id: user.id,
        email: user.email,
        username: user.username,
      },

      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
