    import axios from "axios";
    import { NextResponse } from "next/server";
    import { headers } from "next/headers";

    export async function POST(request: Request) {
    try {
        const headersList = await headers();
        const token = headersList.get("Authorization");
        const body = await request.json();

        if (!token) {
        return NextResponse.json(
            { message: "Unauthorized - No token provided" },
            { status: 401 }
        );
        }

        // Validate required fields for tournament creation
        const requiredFields = [
        "name",
        "location",
        "startDate",
        "endDate",
        "registrationDeadline",
        "category",
        "maxTeams",
        "description"
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

        const base_url = `${process.env.BASE_URL}/api/admin/create-tournament`;

        const response = await axios.post(base_url, body, {
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
        });

        const result = response.data;

        return NextResponse.json(result);
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
        return NextResponse.json(
            {
            message: error.response?.data?.message || "Failed to create tournament",
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
