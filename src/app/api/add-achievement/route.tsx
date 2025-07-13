import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");
    const body = await request.json();

    if (!token) {
      return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
    }

    const requiredFields = ["userId", "title", "description", "accolade", "date"];
    const missingFields = requiredFields.filter(
      (field) => !body[field] && body[field] !== 0
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const base_url = `${process.env.BASE_URL}/api/admin/add-achievement`;

    const response = await axios.post(base_url, body, {
      headers: {
        Authorization: token,
      },
    });

    const result = response.data;
    console.log("Accolade POST: Backend response:", result);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Accolade POST: Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to create accolade",
          error: error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { message: "Achievement ID is required" },
        { status: 400 }
      );
    }

    const base_url = `${process.env.BASE_URL}/api/admin/achievement/${id}`;

    const response = await axios.delete(base_url, {
      headers: {
        Authorization: token,
      },
    });

    const result = response.data;
    console.log("Delete Achievement: Backend response:", result);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Delete Achievement Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to delete achievement",
          error: error.message,
        },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: String(error),
      },
      { status: 500 }
    );
  }
}