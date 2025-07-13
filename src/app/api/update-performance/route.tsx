import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function PATCH(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("Authorization");
    const body = await request.json();

    if (!token) {
      return NextResponse.json({ message: "Unauthorized - No token provided" }, { status: 401 });
    }

    // Required top-level fields
    const requiredTopLevelFields = ["userId", "playerName", "skills", "statistics"];
    const missingTopFields = requiredTopLevelFields.filter(
      (field) => !body[field] && body[field] !== 0
    );

    if (missingTopFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingTopFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Required subfields in 'skills'
    const requiredSkills = [
      "ballControl",
      "passingAccuracy",
      "shooting",
      "defending",
      "physical_fitness",
      "team_work",
    ];
    const missingSkills = requiredSkills.filter(
      (key) => !body.skills?.hasOwnProperty(key) && body.skills[key] !== 0
    );

    // Required subfields in 'statistics'
    const requiredStats = ["rating", "attendance", "goals", "assists"];
    const missingStats = requiredStats.filter(
      (key) => !body.statistics?.hasOwnProperty(key) && body.statistics[key] !== 0
    );

    if (missingSkills.length > 0 || missingStats.length > 0) {
      return NextResponse.json(
        {
          message: `Missing skill/stat fields: ${[...missingSkills, ...missingStats].join(", ")}`,
        },
        { status: 400 }
      );
    }

    const base_url = `${process.env.BASE_URL}/api/admin/update-performance`;

    const response = await axios.patch(base_url, body, {
      headers: {
        Authorization: token,
      },
    });

    const result = response.data;
    console.log("Profile-Update Route: Backend response:", result);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("Profile-Update Route: Error:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Failed to update profile",
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
