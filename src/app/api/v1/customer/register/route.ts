import { errHandler } from "@/types/errHandler";
import { customerSchema } from "@/validations/customer.validation";
import { NextRequest, NextResponse } from "next/server";
import dbClient from "@/config/db.config"
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const { success, error, data } = customerSchema.safeParse(await req.json());
    if (!success) {
        return NextResponse.json({ errors: error.issues.map(issue => issue.message) }, { status: 400 });
    }

    try {

        const customerExists = await dbClient.customer.findFirst({ where: { email: data.email } });
        if (customerExists) {
            throw new errHandler("Customer with this email already exists!", 409);
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);

        await dbClient.customer.create({
            data: {
                fullName: data.fullname,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                dob: new Date(data.dob),
                lat: +data.lat,
                lng: +data.lng,
                browserInfo: data.browserInfo
            }
        });
        return NextResponse.json({ message: "Your account has been created successfully." }, { status: 201 });
    } catch (err) {
        const { message, status = 500 } = err as errHandler;
        return NextResponse.json({ error: message }, { status });
    }
}