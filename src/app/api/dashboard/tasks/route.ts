import axiosInstance from "@/lib/axios";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("working");
    // const headerList = headers();
    // const authorId = parseInt(headerList.get("id") || "");

    // const tasks = await axiosInstance.get(`/users/${authorId}/tasks`);

    // console.log(tasks, "tasks");
    return NextResponse.json({ status: "success", data: {} });
  } catch (error: any) {
    return NextResponse.json({ status: "fail", data: error.toString() });
  }
}

export async function POST(request: Request) {
  try {
    let reqBody = await request.json();

    const headerList = headers();
    const authorId = parseInt(headerList.get("id") || "");

    let result = await axiosInstance.post(`/users/${authorId}/tasks`, reqBody);
    if (result.data) {
      return NextResponse.json({ status: "success", data: result.data });
    }
    return NextResponse.json({ status: "success", data: {} });
  } catch (error: any) {
    return NextResponse.json({ status: "fail", data: error.toString() });
  }
}
export async function PUT(request: Request) {
  try {
    let reqBody = await request.json();

    const headerList = headers();
    const authorId = parseInt(headerList.get("id") || "");

    let result = await axiosInstance.put(
      `/users/${authorId}/tasks/${reqBody.id}`,
      reqBody
    );
    if (result.data) {
      return NextResponse.json({ status: "success", data: result.data });
    }
    return NextResponse.json({ status: "success", data: {} });
  } catch (error: any) {
    return NextResponse.json({ status: "fail", data: error.toString() });
  }
}
