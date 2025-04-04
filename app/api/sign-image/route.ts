import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
    
    try {
        const body = (await request.json()) as {
          paramsToSign: Record<string, string>;
        };
        
    
        if (!body.paramsToSign || typeof body.paramsToSign !== "object") {
          return new Response(
            JSON.stringify({ error: "Invalid or missing paramsToSign" }),
            { status: 400 }
          );
        }
    
        const { paramsToSign } = body;
        const signature = cloudinary.v2.utils.api_sign_request(
          paramsToSign,
          process.env.CLOUDINARY_API_SECRET as string
        );
    
        return Response.json({ signature });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Failed to process request", details: error }),
          { status: 500 }
        );
      }
}
