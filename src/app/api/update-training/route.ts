import { NextResponse } from "next/server";
import { headers } from "next/headers";
import axios from "axios";

export async function PATCH(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ message: "Training session ID is required" }, { status: 400 });
    }

    const requiredFields = ["day", "time", "duration", "category", "coach", "trainingType", "location"];
    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const base_url = `${process.env.BASE_URL}/api/admin/update-session/${id}`;

    const response = await axios.patch(base_url, body, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("Training Update Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to update training session",
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
                { message: "Training session ID is required" },
                { status: 400 }
            );
        }

        const base_url = `${process.env.BASE_URL}/api/admin/delete-session/${id}`;

        const response = await axios.delete(base_url, {
            headers: {
                Authorization: token,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        console.error("Delete Session Error:", error);
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    message: error.response?.data?.data?.message || "Failed to delete training session",
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