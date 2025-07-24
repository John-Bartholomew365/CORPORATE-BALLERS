import { NextResponse } from "next/server";
import axios from "axios";

interface EmergencyContact {
  contactName: string;
  contactPhone: string;
  relationship: string;
}

interface RegisterRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  category: string;
  preferredPosition: string;
  preferredFoot: string;
  footballExperience: string;
  emergencyContact: EmergencyContact;
  terms: boolean;
  password: string;
  confirmPassword: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: RegisterRequestBody = await req.json();
    console.log("Received payload:", JSON.stringify(body, null, 2)); // Log incoming payload for debugging

    // Validate required fields
    const requiredFields = ["email", "password", "confirmPassword", "firstName", "lastName", "dateOfBirth", "gender"];
    const missingFields = requiredFields.filter((field) => !body[field as keyof RegisterRequestBody]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    if (!body.terms) {
      return NextResponse.json({ message: "You must accept the terms and conditions" }, { status: 400 });
    }

    // Transform values with fallbacks
    const transformValue = (value: string = "", field: string): string => {
      const mappings: Record<string, Record<string, string>> = {
        gender: { male: "Male", female: "Female" },
        category: { junior: "Junior", senior: "Senior" },
        preferredPosition: {
          goalkeeper: "Goalkeeper",
          defender: "Defender",
          midfielder: "Midfielder",
          forward: "Forward",
          winger: "Winger",
        },
        preferredFoot: {
          right: "Right",
          left: "Left",
          both: "Ambidextrous",
        },
        footballExperience: {
          beginner: "Beginner",
          "semi-professional": "Semi-Pro",
          professional: "Professional",
        },
      };

      const normalizedValue = value.toLowerCase();
      return mappings[field]?.[normalizedValue] || value;
    };

    // Sanitize payload to ensure no undefined values
    const payload = {
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      email: body.email || "",
      phoneNumber: body.phoneNumber || "",
      dateOfBirth: body.dateOfBirth || "",
      gender: transformValue(body.gender, "gender"),
      address: body.address || "",
      category: transformValue(body.category, "category"),
      preferredPosition: transformValue(body.preferredPosition, "preferredPosition"),
      preferredFoot: transformValue(body.preferredFoot, "preferredFoot"),
      footballExperience: transformValue(body.footballExperience, "footballExperience"),
      emergencyContact: {
        contactName: body.emergencyContact?.contactName || "",
        contactPhone: body.emergencyContact?.contactPhone || "",
        relationship: body.emergencyContact?.relationship || "",
      },
      terms: body.terms || false,
      password: body.password || "",
      confirmPassword: body.confirmPassword || "",
    };

    const base_url = process.env.BASE_URL;
    if (!base_url) {
      console.error("BASE_URL is not set");
      return NextResponse.json({ message: "Server configuration error: BASE_URL is not set" }, { status: 500 });
    }

    console.log("Sending payload to external API:", JSON.stringify(payload, null, 2)); // Log outgoing payload
    console.log("External API URL:", `${base_url}/api/auth/register`);

    try {
      const response = await axios.post(`${base_url}/api/auth/register`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("External API response:", JSON.stringify(response.data, null, 2)); // Log response from external API

      if (response.data.error) {
        return NextResponse.json({ message: response.data.error }, { status: 400 });
      }

      return NextResponse.json(response.data, { status: 200 });
    } catch (apiError: unknown) {
      if (axios.isAxiosError(apiError) && apiError.response) {
        const errorDetails = apiError.response.data;
        console.error("External API error details:", JSON.stringify(errorDetails, null, 2));
        if (errorDetails?.error?.includes("E11000 duplicate key")) {
          return NextResponse.json(
            {
              message: "This player ID or email is already registered",
              details: errorDetails,
            },
            { status: 400 }
          );
        }
        return NextResponse.json(
          {
            message: errorDetails?.message || "Registration failed",
            details: errorDetails,
          },
          { status: apiError.response.status || 500 }
        );
      }
      throw apiError; // Rethrow non-Axios errors to the outer catch block
    }
  } catch (error: unknown) {
    console.error("Registration error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        response: error.response?.data,
        status: error.response?.status,
        message: error.message,
      });
      if (error.response) {
        return NextResponse.json(
          {
            message: error.response.data?.message || "Registration failed",
            details: error.response.data,
          },
          { status: error.response.status || 500 }
        );
      }
      return NextResponse.json(
        { message: "No response from server", error: error.message },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}