import axiosInstance from "@/lib/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let reqBody = await request.json();

    let result = await axiosInstance.post("/users", reqBody);
    if (result.data) {
      return NextResponse.json({ status: "success", data: result.data });
    }
  } catch (error: any) {
    return NextResponse.json({ status: "fail", data: error.toString() });
  }
}
