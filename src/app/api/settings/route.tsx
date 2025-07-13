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

    // Validate top-level required fields
    const requiredFields = [
      "academyName",
      "rcNumber",
      "address",
      "email",
      "primaryPhone",
      "missionStatement",
      "trainingSettings",
      "notifications",
      "securitySettings"
    ];

    const missingFields = requiredFields.filter(
      (field) => body[field] === undefined || body[field] === null
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Optional: Validate nested fields (trainingSettings, notifications, securitySettings)
    const nestedValidationErrors: string[] = [];

    if (
      typeof body.trainingSettings?.maxPlayersPerSession !== "number" ||
      typeof body.trainingSettings?.sessionDurationHours !== "number" ||
      typeof body.trainingSettings?.minimumAttendance !== "number"
    ) {
      nestedValidationErrors.push("trainingSettings fields must be numbers");
    }

    if (
      typeof body.notifications?.email !== "boolean" ||
      typeof body.notifications?.sms !== "boolean" ||
      typeof body.notifications?.tournamentUpdates !== "boolean" ||
      typeof body.notifications?.attendanceAlerts !== "boolean"
    ) {
      nestedValidationErrors.push("notifications fields must be booleans");
    }

    if (
      typeof body.securitySettings?.twoFactorAuth !== "boolean" ||
      typeof body.securitySettings?.sessionTimeout !== "number"
    ) {
      nestedValidationErrors.push("securitySettings fields must be valid");
    }

    if (nestedValidationErrors.length > 0) {
      return NextResponse.json(
        { message: `Validation error: ${nestedValidationErrors.join(", ")}` },
        { status: 400 }
      );
    }

    const base_url = `${process.env.BASE_URL}/api/admin/settings-update`;

    const response = await axios.post(base_url, body, {
      headers: {
        Authorization: token,
      },
    });

    const result = response.data;
    console.log("Academy Setup POST: Backend response:", result);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Academy Setup POST: Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to setup academy profile",
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



export async function GET() {
    try {
        const headersList = await headers();
        const token = headersList.get("Authorization");


        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized - No token provided" },
                { status: 401 }
            );
        }

        const base_url = `${process.env.BASE_URL}/api/admin/get-settings`;

        const response = await axios.get(base_url, {
            headers: {
                Authorization: token,
            },
        });

        const result = response.data;

        return NextResponse.json(result);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    message: error.response?.data?.message || "Failed to fetch training sessions",
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