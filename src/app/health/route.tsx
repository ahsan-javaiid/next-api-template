
import { NextResponse } from "next/server";
import cors from '../lib/cors';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const GET = async (req: any, context: any) => { 
  return NextResponse.json({
    data: {
      status: 'success'
    }
  }, { status: 200, headers: corsHeaders });
}

export async function OPTIONS(request: Request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  );
}