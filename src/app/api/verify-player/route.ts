// app/api/verify-player/route.ts
import axios from "axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function PATCH(request: Request) {
    try {
        const headersList = await headers();
        const token = headersList.get("Authorization");
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        console.log("Verify Route: Received Authorization header:", token); // Debug: Log token
        console.log("Verify Route: Player ID:", id); // Debug: Log player ID

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized - No token provided" },
                { status: 401 }
            );
        }

        if (!id) {
            return NextResponse.json(
                { message: "Player ID is required" },
                { status: 400 }
            );
        }

        const base_url = `${process.env.BASE_URL}/api/admin/players/${id}/verify`;

        const response = await axios.patch(base_url, {}, {
            headers: {
                Authorization: token,
            },
        });

        const result = response.data;
        console.log("Verify Route: Backend response:", result); // Debug: Log backend response

        return NextResponse.json(result);
    } catch (error: unknown) {
        console.error("Verify Route: Error:", error);
        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    message: error.response?.data?.message || "Failed to verify player",
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