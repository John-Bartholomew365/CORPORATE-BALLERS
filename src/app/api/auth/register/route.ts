// import axios from "axios";
// import { NextResponse } from "next/server";

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

// interface BackendResponse {
//     statusCode: string;
//     message?: string;
//     [key: string]: unknown;
// }

// interface ErrorWithResponse extends Error {
//     response?: {
//         data?: {
//             message?: string;
//         };
//         status?: number;
//     };
// }

// export async function POST(req: Request): Promise<Response> {
//     try {
//         const body: RegisterRequestBody = await req.json();
//         console.log(body);

//         const payload = {
//             firstName: body.firstName,
//             lastName: body.lastName,
//             email: body.email,
//             phoneNumber: body.phoneNumber,
//             dateOfBirth: body.dateOfBirth,
//             gender: body.gender,
//             address: body.address,
//             category: body.category,
//             preferredPosition: body.preferredPosition,
//             preferredFoot: body.preferredFoot,
//             footballExperience: body.footballExperience,
//             emergencyContact: {
//                 contactName: body.emergencyContact.contactName,
//                 contactPhone: body.emergencyContact.contactPhone,
//                 relationship: body.emergencyContact.relationship,
//             },
//             terms: body.terms,
//             password: body.password,
//             confirmPassword: body.confirmPassword,
//         };

//         const base_url = `${process.env.BASE_URL}/api/auth/register`;
//         console.log("Sending request to:", base_url);

//         const response = await axios.post<BackendResponse>(base_url, payload, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         const result = response.data;
//         console.log("Backend response:", result);

//         if (result.statusCode === "00") {
//             return NextResponse.json(result);
//         } else {
//             return NextResponse.json(
//                 { message: result.message || "Error processing request" },
//                 { status: 400 }
//             );
//         }
//     } catch (error) {
//         const err = error as ErrorWithResponse;
//         console.error("Error in route.ts:", err.message);
//         return NextResponse.json(
//             {
//                 message: err.response?.data?.message || "Internal Server Error",
//                 error: err.message,
//             },
//             { status: err.response?.status || 500 }
//         );
//     }
// }





// import axios from "axios";
// import { NextResponse } from "next/server";

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
        
//         // Basic validation
//         if (!body.email || !body.password || !body.confirmPassword) {
//             return NextResponse.json(
//                 { message: "Email, password, and confirm password are required" },
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

//         const payload = {
//             firstName: body.firstName,
//             lastName: body.lastName,
//             email: body.email,
//             phoneNumber: body.phoneNumber,
//             dateOfBirth: body.dateOfBirth,
//             gender: body.gender,
//             address: body.address,
//             category: body.category,
//             preferredPosition: body.preferredPosition,
//             preferredFoot: body.preferredFoot,
//             footballExperience: body.footballExperience,
//             emergencyContact: {
//                 contactName: body.emergencyContact.contactName,
//                 contactPhone: body.emergencyContact.contactPhone,
//                 relationship: body.emergencyContact.relationship,
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

//         const result = response.data;

//         if (result.statusCode === "00") {
//             return NextResponse.json(result);
//         } else {
//             return NextResponse.json(
//                 { message: result.message || "Registration failed" },
//                 { status: 400 }
//             );
//         }
//     } catch (error) {
//         console.error("Registration error:", error);
        
//         if (axios.isAxiosError(error) && error.response) {
//             // The request was made and the server responded with a status code
//             return NextResponse.json(
//                 {
//                     message: error.response.data?.message || "Registration failed",
//                     error: error.response.data?.error || error.message,
//                 },
//                 { status: error.response.status || 500 }
//             );
//         } else if (axios.isAxiosError(error) && error.request) {
//             // The request was made but no response was received
//             return NextResponse.json(
//                 { message: "No response received from server" },
//                 { status: 500 }
//             );
//         } else if (error instanceof Error) {
//             // Something happened in setting up the request that triggered an Error
//             return NextResponse.json(
//                 { message: error.message || "Internal server error" },
//                 { status: 500 }
//             );
//         } else {
//             return NextResponse.json(
//                 { message: "Internal server error" },
//                 { status: 500 }
//             );
//         }
//     }
// }




// import axios, { AxiosError } from "axios"
// import { NextResponse } from "next/server"

// interface EmergencyContact {
//   contactName: string
//   contactPhone: string
//   relationship: string
// }

// interface RegisterRequestBody {
//   firstName: string
//   lastName: string
//   email: string
//   phoneNumber: string
//   dateOfBirth: string
//   gender: string
//   address: string
//   category: string
//   preferredPosition: string
//   preferredFoot: string
//   footballExperience: string
//   emergencyContact: EmergencyContact
//   terms: boolean
//   password: string
//   confirmPassword: string
// }

// interface BackendSuccessResponse {
//   statusCode: string
//   message?: string
//   data?: unknown
// }

// interface BackendErrorResponse {
//   statusCode?: string
//   message?: string
//   error?: string
//   details?: unknown
// }

// export async function POST(req: Request): Promise<NextResponse<BackendSuccessResponse | BackendErrorResponse>> {
//   try {
//     const body: RegisterRequestBody = await req.json()
    
//     // Validate required fields
//     const requiredFields = ['email', 'password', 'confirmPassword', 'firstName', 'lastName']
//     const missingFields = requiredFields.filter(field => !body[field as keyof typeof body])
    
//     if (missingFields.length > 0) {
//       return NextResponse.json(
//         { message: `Missing required fields: ${missingFields.join(', ')}` },
//         { status: 400 }
//       )
//     }

//     if (body.password !== body.confirmPassword) {
//       return NextResponse.json(
//         { message: "Passwords do not match" },
//         { status: 400 }
//       )
//     }

//     if (!body.terms) {
//       return NextResponse.json(
//         { message: "You must accept the terms and conditions" },
//         { status: 400 }
//       )
//     }

//     const payload = {
//       firstName: body.firstName,
//       lastName: body.lastName,
//       email: body.email.toLowerCase().trim(),
//       phoneNumber: body.phoneNumber,
//       dateOfBirth: body.dateOfBirth,
//       gender: body.gender,
//       address: body.address,
//       category: body.category,
//       preferredPosition: body.preferredPosition,
//       preferredFoot: body.preferredFoot,
//       footballExperience: body.footballExperience,
//       emergencyContact: {
//         contactName: body.emergencyContact.contactName,
//         contactPhone: body.emergencyContact.contactPhone,
//         relationship: body.emergencyContact.relationship,
//       },
//       password: body.password,
//       acceptTerms: body.terms,
//     }

//     const base_url = process.env.BASE_URL
//     if (!base_url) {
//       throw new Error("BASE_URL environment variable is not set")
//     }

//     const response = await axios.post<BackendSuccessResponse>(
//       `${base_url}/api/auth/register`,
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//         },
//         // timeout: 10000,
//       }
//     )

//     return NextResponse.json(response.data)

//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError<BackendErrorResponse>
//       console.error("Backend error response:", axiosError.response?.data)
      
//       return NextResponse.json(
//         {
//           message: axiosError.response?.data?.message || "Registration failed",
//           error: axiosError.response?.data?.error || axiosError.message,
//         },
//         { status: axiosError.response?.status || 500 }
//       )
//     } else if (error instanceof Error) {
//       return NextResponse.json(
//         { message: error.message || "Internal server error" },
//         { status: 500 }
//       )
//     }

//     return NextResponse.json(
//       { message: "Unknown error occurred" },
//       { status: 500 }
//     )
//   }
// }





// import axios from "axios";
// import { NextResponse } from "next/server";

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
        
//         // Enhanced validation
//         if (!body.email || !body.password || !body.confirmPassword) {
//             return NextResponse.json(
//                 { message: "Email, password, and confirm password are required" },
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

//         const payload = {
//             firstName: body.firstName,
//             lastName: body.lastName,
//             email: body.email,
//             phoneNumber: body.phoneNumber,
//             dateOfBirth: body.dateOfBirth,
//             gender: body.gender,
//             address: body.address,
//             category: body.category,
//             preferredPosition: body.preferredPosition,
//             preferredFoot: body.preferredFoot,
//             footballExperience: body.footballExperience,
//             emergencyContact: {
//                 contactName: body.emergencyContact?.contactName || '',
//                 contactPhone: body.emergencyContact?.contactPhone || '',
//                 relationship: body.emergencyContact?.relationship || '',
//             },
//             terms: body.terms,
//             password: body.password,
//             confirmPassword: body.confirmPassword,
//         };

//         console.log("Payload being sent:", payload); // Debug log

//         const base_url = process.env.BASE_URL;
//         if (!base_url) {
//             console.error("BASE_URL environment variable is not set");
//             throw new Error("BASE_URL environment variable is not set");
//         }

//         const response = await axios.post(`${base_url}/api/signup`, payload, {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             // timeout: 30000, // 30 seconds timeout
//         });

//         console.log("API Response:", response.data); // Debug log

//         const result = response.data;

//         return NextResponse.json(result);
        
//     } catch (error) {
//         console.error("Full registration error:", error);
        
//         if (axios.isAxiosError(error)) {
//             // Axios error handling
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 console.error("Server responded with error:", error.response.data);
//                 return NextResponse.json(
//                     {
//                         message: error.response.data?.message || "Registration failed",
//                         error: error.response.data,
//                     },
//                     { status: error.response.status }
//                 );
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 console.error("No response received:", error.request);
//                 return NextResponse.json(
//                     { message: "No response received from server" },
//                     { status: 500 }
//                 );
//             }
//         }

//         // Other errors
//         return NextResponse.json(
//             { message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
//             { status: 500 }
//         );
//     }
// }



import axios from "axios";
import { NextResponse } from "next/server";

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
    gender: 'Male' | 'Female';
    address: string;
    category: 'Junior' | 'Senior';
    preferredPosition: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward' | 'Winger';
    preferredFoot: 'Right' | 'Left' | 'Ambidextrous';
    footballExperience: 'Beginner' | 'Amateur' | 'Semi-Pro' | 'Professional';
    emergencyContact: EmergencyContact;
    terms: boolean;
    password: string;
    confirmPassword: string;
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const body: RegisterRequestBody = await req.json();
        
        if (!body.email || !body.password || !body.confirmPassword) {
            return NextResponse.json(
                { message: "Email, password, and confirm password are required" },
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

        const transformValue = (value: string, field: string): string => {
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

            return mappings[field]?.[value.toLowerCase()] || value;
        };

        const payload = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phoneNumber: body.phoneNumber,
            dateOfBirth: body.dateOfBirth,
            gender: transformValue(body.gender, 'gender'),
            address: body.address,
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
            throw new Error("BASE_URL environment variable is not set");
        }

        const response = await axios.post(`${base_url}/api/auth/register`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
            // timeout: 30000,
        });

        return NextResponse.json(response.data);
        
    } catch (error) {

        if (axios.isAxiosError(error)) {
            if (error.response) {
                return NextResponse.json(
                    error.response.data,
                    { status: error.response.status }
                );
            }
        }

        return NextResponse.json(
            { message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}