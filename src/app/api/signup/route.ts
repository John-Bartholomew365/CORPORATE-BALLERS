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