import { getElasticClient } from "@/data/elastic/elastic";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { ZodError, z } from "zod";
import { first } from "lodash";
import { sign } from 'jsonwebtoken';
// import { zfd } from "zod-form-data";

import { ServerApiConstants } from "../../api.contants";
import { ApiConstants } from "@/data/api/api.constants";
import { ModelAuthLogin } from "@/types/auth/auth";
import { ElasticConstants } from "@/data/elastic/elastic.constants";
import { ModelElasticUser, ModelElasticUsersResult } from "@/types/elastic/users/users";

export async function POST(
    req: Request,
) {
    const Schema = z.object({
        user: z.string(),
        email: z.string(
            {
                required_error: "Reqire email",
                invalid_type_error: "Invalid email type"
            }
        ),
        password: z.string(),
    });

    var requestData = await req.json()

    var requestBody: ModelAuthLogin;
    try {
        requestBody = Schema.parse(requestData)

    } catch (err) {
        if (err instanceof ZodError) {

            let error = first(err.errors);

            return NextResponse.json({ message: error?.message }, {
                status: ApiConstants.httpError.badRequest
            });

        } else {
            return NextResponse.json({ message: err ?? 'invalid data unknown' }, {
                status: ApiConstants.httpError.badRequest
            });
        }

    }

    const elastic = await getElasticClient();
    elastic.index({index: ElasticConstants.indexes.users._, document: requestBody});
    try {
        const cookieStore = cookies()

        const secretKey = ServerApiConstants.secret.token;
        const token = sign({ email: requestBody.email }, secretKey, {
            algorithm: "HS256",
        });

        console.log("result: ", token)

        return NextResponse.json({ isLoggedIn: true, token: token }, {
            status: 200,
            headers: {
                'Set-Cookie': `token=${token}`,
                
            },

        })

    } catch (err) {

        return NextResponse.json({ message: err ?? 'failed to load data' }, {
            status: ApiConstants.httpError.internalServer
        });
    }
}