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
        return NextResponse.json(result);
    } catch (error: unknown) {
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