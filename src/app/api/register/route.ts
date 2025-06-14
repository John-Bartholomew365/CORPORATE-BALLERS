// import { NextResponse } from "next/server";
// import axios from "axios";

// interface EmergencyContact {
//     contactName: string;
//     contactPhone: string;
//     relationship: string;
// }

// interface RegisterRequestBody {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phoneNumber: string;
//     dateOfBirth: string;
//     gender: string;
//     address: string;
//     category: string;
//     preferredPosition: string;
//     preferredFoot: string;
//     footballExperience: string;
//     emergencyContact: EmergencyContact;
//     terms: boolean;
//     password: string;
//     confirmPassword: string;
// }

// export async function POST(req: Request): Promise<NextResponse> {
//     try {
//         const body: RegisterRequestBody = await req.json();
        
//         // Validate required fields
//         const requiredFields = ['email', 'password', 'confirmPassword', 'firstName', 'lastName'];
//         const missingFields = requiredFields.filter(field => !body[field as keyof RegisterRequestBody]);
        
//         if (missingFields.length > 0) {
//             return NextResponse.json(
//                 { message: `Missing required fields: ${missingFields.join(', ')}` },
//                 { status: 400 }
//             );
//         }

//         if (body.password !== body.confirmPassword) {
//             return NextResponse.json(
//                 { message: "Passwords do not match" },
//                 { status: 400 }
//             );
//         }

//         if (!body.terms) {
//             return NextResponse.json(
//                 { message: "You must accept the terms and conditions" },
//                 { status: 400 }
//             );
//         }

//         // Transform values with fallbacks
//         const transformValue = (value: string = '', field: string): string => {
//             const mappings: Record<string, Record<string, string>> = {
//                 gender: { male: 'Male', female: 'Female' },
//                 category: { junior: 'Junior', senior: 'Senior' },
//                 preferredPosition: { 
//                     goalkeeper: 'Goalkeeper', 
//                     defender: 'Defender', 
//                     midfielder: 'Midfielder', 
//                     forward: 'Forward', 
//                     winger: 'Winger' 
//                 },
//                 preferredFoot: { 
//                     right: 'Right', 
//                     left: 'Left', 
//                     both: 'Ambidextrous' 
//                 },
//                 footballExperience: { 
//                     beginner: 'Beginner', 
//                     amateur: 'Amateur', 
//                     'semi-professional': 'Semi-Pro', 
//                     professional: 'Professional' 
//                 }
//             };

//             const normalizedValue = value.toLowerCase();
//             return mappings[field]?.[normalizedValue] || value;
//         };

//         const payload = {
//             firstName: body.firstName,
//             lastName: body.lastName,
//             email: body.email,
//             phoneNumber: body.phoneNumber || '',
//             dateOfBirth: body.dateOfBirth || '',
//             gender: transformValue(body.gender, 'gender'),
//             address: body.address || '',
//             category: transformValue(body.category, 'category'),
//             preferredPosition: transformValue(body.preferredPosition, 'preferredPosition'),
//             preferredFoot: transformValue(body.preferredFoot, 'preferredFoot'),
//             footballExperience: transformValue(body.footballExperience, 'footballExperience'),
//             emergencyContact: {
//                 contactName: body.emergencyContact?.contactName || '',
//                 contactPhone: body.emergencyContact?.contactPhone || '',
//                 relationship: body.emergencyContact?.relationship || '',
//             },
//             terms: body.terms,
//             password: body.password,
//             confirmPassword: body.confirmPassword,
//         };

//         const base_url = process.env.BASE_URL;
//         if (!base_url) {
//             throw new Error("BASE_URL environment variable is not set");
//         }

//         const response = await axios.post(`${base_url}/api/auth/register`, payload, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         if (response.data.error) {
//             return NextResponse.json(
//                 { message: response.data.error },
//                 { status: 400 }
//             );
//         }

//         return NextResponse.json(response.data);
        
//     } catch (error: unknown) {
//         console.error("Registration error:", error);
        
//         if (axios.isAxiosError(error)) {
//             if (error.response) {
//                 return NextResponse.json(
//                     { 
//                         message: error.response.data?.message || 'Registration failed',
//                         details: error.response.data 
//                     },
//                     { status: error.response.status || 500 }
//                 );
//             }
//             return NextResponse.json(
//                 { message: "No response from server", error: error.message },
//                 { status: 503 }
//             );
//         }

//         return NextResponse.json(
//             { 
//                 message: "Internal server error",
//                 error: typeof error === "object" && error !== null && "message" in error ? (error as { message?: string }).message : String(error)
//             },
//             { status: 500 }
//         );
//     }
// }







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
        
        // Validate required fields
        const requiredFields = ['email', 'password', 'confirmPassword', 'firstName', 'lastName'];
        const missingFields = requiredFields.filter(field => !body[field as keyof RegisterRequestBody]);
        
        if (missingFields.length > 0) {
            return NextResponse.json(
                { message: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        if (body.password !== body.confirmPassword) {
            return NextResponse.json(
                { message: "Passwords do not match" },
                { status: 400 }
            );
        }

        if (!body.terms) {
            return NextResponse.json(
                { message: "You must accept the terms and conditions" },
                { status: 400 }
            );
        }

        // Transform values with fallbacks
        const transformValue = (value: string = '', field: string): string => {
            const mappings: Record<string, Record<string, string>> = {
                gender: { male: 'Male', female: 'Female' },
                category: { junior: 'Junior', senior: 'Senior' },
                preferredPosition: { 
                    goalkeeper: 'Goalkeeper', 
                    defender: 'Defender', 
                    midfielder: 'Midfielder', 
                    forward: 'Forward', 
                    winger: 'Winger' 
                },
                preferredFoot: { 
                    right: 'Right', 
                    left: 'Left', 
                    both: 'Ambidextrous' 
                },
                footballExperience: { 
                    beginner: 'Beginner', 
                    amateur: 'Amateur', 
                    'semi-professional': 'Semi-Pro', 
                    professional: 'Professional' 
                }
            };

            const normalizedValue = value.toLowerCase();
            return mappings[field]?.[normalizedValue] || value;
        };

        const payload = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber || '',
            dateOfBirth: body.dateOfBirth || '',
            gender: transformValue(body.gender, 'gender'),
            address: body.address || '',
            category: transformValue(body.category, 'category'),
            preferredPosition: transformValue(body.preferredPosition, 'preferredPosition'),
            preferredFoot: transformValue(body.preferredFoot, 'preferredFoot'),
            footballExperience: transformValue(body.footballExperience, 'footballExperience'),
            emergencyContact: {
                contactName: body.emergencyContact?.contactName || '',
                contactPhone: body.emergencyContact?.contactPhone || '',
                relationship: body.emergencyContact?.relationship || '',
            },
            terms: body.terms,
            password: body.password,
            confirmPassword: body.confirmPassword,
        };

        const base_url = process.env.BASE_URL;
        if (!base_url) {
            console.error("BASE_URL environment variable is not set");
            return NextResponse.json(
                { message: "Server configuration error" },
                { status: 500 }
            );
        }

        // Add timeout and retry to the backend API call
        const response = await axios.post(`${base_url}/api/auth/register`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 8000, // 8 second timeout
        });

        if (!response.data) {
            return NextResponse.json(
                { message: "No data received from backend API" },
                { status: 502 }
            );
        }

        return NextResponse.json(response.data);
        
    } catch (error: unknown) {
        console.error("Registration error:", error);
        
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                return NextResponse.json(
                    { message: "Backend API request timeout" },
                    { status: 504 }
                );
            }
            if (error.response) {
                return NextResponse.json(
                    { 
                        message: error.response.data?.message || 'Backend API error',
                        details: error.response.data 
                    },
                    { status: error.response.status || 502 }
                );
            }
            return NextResponse.json(
                { message: "Cannot connect to backend API", error: error.message },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { 
                message: "Internal server error",
                error: typeof error === "object" && error !== null && "message" in error ? (error as { message?: string }).message : String(error)
            },
            { status: 500 }
        );
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
}