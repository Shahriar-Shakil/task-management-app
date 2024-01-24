import axiosInstance from "@/lib/axios";
import { CreateToken } from "@/utils/JWTTokenHelper";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let reqBody = await request.json();
    const userResponse = await axiosInstance.get(
      `/users?email=${reqBody?.email}&password=${reqBody?.password}`
    );
    if (!userResponse?.data.length) {
      return NextResponse.json({
        status: "fail",
        data: "No user found in this mail",
      });
    } else {
      const user = userResponse?.data[0];
      let token = await CreateToken(user["email"], user["id"], user["name"]);
      const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const cookieString = `token=${token}; expires=${expirationDate}; path=/`;
      return NextResponse.json(
        { status: "success", data: token },
        { status: 200, headers: { "set-cookie": cookieString } }
      );
    }
  } catch (error) {
    return NextResponse.json({
      status: "fail",
      data: "500 server error from login page",
    });
  }
}
